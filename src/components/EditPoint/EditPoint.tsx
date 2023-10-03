//@ts-nocheck

import React, { useState, useEffect, ChangeEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { API, Storage } from 'aws-amplify';
import { updatePoint } from '../../features/point/pointSlice';
import AlertDialog from '../AlertDialog/AlertDialog';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Image from 'mui-image';
import { PointType } from '../../types';
import {
	createHistory,
	deleteHistory,
	updateHistory,
} from '../../graphql/mutations';

type EditPointPropsType = {
	editPoint: PointType;
	mapId: string;
	checkPointIsInCircle: () => void;
};

const EditPoint = ({
	editPoint,
	mapId,
	checkPointIsInCircle,
}: EditPointPropsType) => {
	const initialFormData = {
		id: '',
		lat: '',
		lng: '',
		name: '',
		description: '',
		type: '',
		yearBuilt: '',
		url: '',
		image: '',
		imageName: '',
	};
	const [formData, setFormData] = useState(initialFormData);
	const [historyFormData, setHistoryFormData] = useState([]);
	const [historyDataToBeDeleted, setHistoryDataToBeDeleted] = useState([]);
	const [image, setImage] = useState('');
	const [category, setCategory] = useState();
	const [formErrorMessage, setFormErrorMessage] = useState('');
	const [alertDialogOpen, setAlertDialogOpen] = useState(false);

	const categories = useAppSelector(
		(state) => state.categories.categoriesData
	);

	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	useEffect(() => {
		const category = categories.find(
			(item) => item.id === editPoint.categoryId
		);
		setCategory(category);
	}, [categories, editPoint]);

	useEffect(() => {
		if (!editPoint) {
			navigate(-1);
		} else {
			setFormData(editPoint);
		}
	}, [editPoint, navigate]);

	useEffect(() => {
		const { history } = editPoint;
    const historyToBeSorted = [...history.items]
    const historySorted = historyToBeSorted.sort((a, b) => a.date - b.date)
		setHistoryFormData(historySorted);
	}, [editPoint]);

	const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleHistoryOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		// check it out: we get the evt.target.name (which will be either "email" or "password")
		// and use it to target the key on our `state` object with the same name, using bracket syntax

		let history = [...historyFormData];

		let historyData = { ...history[e.target.id] };

		historyData[e.target.name] = e.target.value;

		history[e.target.id] = historyData;

		setHistoryFormData(history);
	};

	const handleCategoryOnChange = (e: SelectChangeEvent) => {
		const { value } = e.target;
		setCategory(value);
	};

	const handleOnChangeImage: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.files) {
			setImage(URL.createObjectURL(e.target.files[0]));
		} else setImage(formData.imageName);
	};

	const handleAddHistory = (e) => {
		e.preventDefault();
		setHistoryFormData([
			{ date: '', name: '', description: '' },
			...historyFormData,
		]);
	};

	const handleRemoveHistory = (e, index) => {
		e.preventDefault();
		const historyFormDataWithHistoryRemoved = historyFormData.filter(
			(item, i) => i !== index
		);
		setHistoryFormData(historyFormDataWithHistoryRemoved);

		const historyFormDataItemToDelete = historyFormData.find(
			(item, i) => i === index
		);

		setHistoryDataToBeDeleted([
			...historyDataToBeDeleted,
			historyFormDataItemToDelete,
		]);
	};

	const handleEditPoint = async (e, data) => {
		e.preventDefault();
		const isPointInCirle = checkPointIsInCircle(data.lat, data.lng);

		if (!isPointInCirle) {
			setAlertDialogOpen(true);
			setFormErrorMessage('Point needs to be within permitted boundary');
			return;
		}
		const form = new FormData(e.target);
		const image = form.get('image');

		const dataForStorage = {
			id: data.id,
			name: form.get('name'),
			image: image.name ? image.name : null,
		};

		const updatedData = { ...data };

		delete updatedData.createdAt;
		delete updatedData.updatedAt;
		delete updatedData.history;

		updatedData.image = image.name ? image.name : editPoint.imageName; // needed to not overwrite existing image with nothing if no new image is selected
		updatedData.lat = Number(updatedData.lat);
		updatedData.lng = Number(updatedData.lng);
		updatedData.categoryId = category.id;

		// new history doesn't have an id
		const historyDataToBeAdded = historyFormData.filter((item) => !item.id);

		// existing history has an id
		const historyDataToBeUpdated = historyFormData.filter(
			(item) => item.id
		);

		try {
			if (!!dataForStorage.image) {
				await Storage.remove(updatedData.imageName); // remove existing image from storage TODO this isn't working
				await Storage.put(dataForStorage.image, image); // add replaced image into storage
			}

			historyDataToBeAdded.length &&
				historyDataToBeAdded.map(async (item) => {
					await API.graphql({
						query: createHistory,
						variables: {
							input: {
								pointId: editPoint.id,
								date: item.date,
								name: item.name,
								description: item.description,
							},
						},
					});
				});

			historyDataToBeUpdated.length &&
				historyDataToBeUpdated.map(async (item) => {
					await API.graphql({
						query: updateHistory,
						variables: {
							input: {
								id: item.id,
								date: item.date,
								name: item.name,
								description: item.description,
							},
						},
					});
				});

			historyDataToBeDeleted.length &&
				historyDataToBeDeleted.map(async (item) => {
					if (item.id) {
						await API.graphql({
							query: deleteHistory,
							variables: {
								input: {
									id: item.id,
								},
							},
						});
					}
				});
			dispatch(updatePoint(updatedData));
			navigate(-1);
		} catch (error) {
			console.log(error);
		}
	};

	const handleAlertDialogClose = () => {
		setAlertDialogOpen(false);
	};

	const handleCancelButtonOnClick = () => {
		navigate(-1);
	};

	return (
		<Box
			sx={{
				maxWidth: 768,
				display: 'flex',
				flexDirection: 'column',
				margin: 'auto',
			}}
		>
			<AlertDialog
				description={formErrorMessage}
				alertDialogOpen={alertDialogOpen}
				handleAlertDialogClose={handleAlertDialogClose}
			/>
			<Button
				variant='outlined'
				type='button'
				size='small'
				component={Link}
				to={`/maps/${mapId}`}
				sx={{ mt: 2, alignSelf: 'flex-start' }}
			>
				Map
			</Button>
			<Card sx={{ marginTop: 2 }} variant='outlined'>
				<CardContent>
					<div>Edit Point Contents</div>
					<form onSubmit={(e) => handleEditPoint(e, formData)}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
							}}
						>
							{formData.image ? (
								<Image src={formData.image} duration={0} />
							) : null}

							<TextField
								id='outlined-basic'
								label='Name'
								variant='outlined'
								type='text'
								name='name'
								value={formData.name}
								onChange={handleOnChange}
								size='small'
								margin='normal'
								fullWidth
							/>
							<TextField
								id='outlined-basic'
								label='Description'
								variant='outlined'
								type='text'
								name='description'
								value={formData.description || ''}
								onChange={handleOnChange}
								size='small'
								margin='normal'
								multiline
								fullWidth
							/>
							<TextField
								id='outlined-basic'
								label='Latitute'
								variant='outlined'
								type='text'
								name='lat'
								value={formData.lat}
								onChange={handleOnChange}
								size='small'
								margin='normal'
								fullWidth
								disabled
							/>
							<TextField
								id='outlined-basic'
								label='Longitude'
								variant='outlined'
								type='text'
								name='lng'
								value={formData.lng}
								onChange={handleOnChange}
								size='small'
								margin='normal'
								fullWidth
								disabled
							/>
							<FormControl
								fullWidth
								size='small'
								variant='outlined'
								margin='normal'
							>
								<InputLabel id='demo-simple-select-label'>
									Category
								</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={category || ''}
									label='Category'
									onChange={handleCategoryOnChange}
									name='type'
								>
									{categories.length &&
										categories.map((item: any) => (
											<MenuItem
												value={item}
												key={item.id}
											>
												{item.name}
											</MenuItem>
										))}
								</Select>
							</FormControl>
							<TextField
								id='outlined-basic'
								label='Year Built'
								variant='outlined'
								type='text'
								name='yearBuilt'
								value={formData.yearBuilt}
								onChange={handleOnChange}
								size='small'
								margin='normal'
								fullWidth
							/>
							<TextField
								id='outlined-basic'
								label='Website'
								variant='outlined'
								type='text'
								name='url'
								value={formData.url}
								onChange={handleOnChange}
								size='small'
								margin='normal'
								fullWidth
							/>
							<Button onClick={handleAddHistory}>
								Add History
							</Button>
							{historyFormData.map((item, index) => (
								<Box
									key={index}
									sx={{
										border: 1,
										borderColor: '#c0c0c0',
										boxShadow: 5,
										width: '100%',
										mb: 1,
										p: 1,
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<TextField
										id={index.toString()}
										label='Date'
										variant='outlined'
										type='text'
										name='date'
										value={item.date}
										onChange={handleHistoryOnChange}
										size='small'
										margin='normal'
										fullWidth
										required
									/>
									<TextField
										id={index.toString()}
										label='Name'
										variant='outlined'
										type='text'
										name='name'
										value={item.name}
										onChange={handleHistoryOnChange}
										size='small'
										margin='normal'
										fullWidth
										required
									/>
									<TextField
										id={index.toString()}
										label='Description'
										variant='outlined'
										type='text'
										name='description'
										value={item.description}
										onChange={handleHistoryOnChange}
										size='small'
										margin='normal'
										multiline
										rows={4}
										fullWidth
									/>
									<Box sx={{ alignSelf: 'flex-end' }}>
										<Button
											onClick={(e) =>
												handleRemoveHistory(e, index)
											}
										>
											Remove History
										</Button>
									</Box>
								</Box>
							))}
							<TextField
								name='image'
								type='file'
								margin='normal'
								size='small'
								fullWidth
								onChange={handleOnChangeImage}
							/>
							{image && (
								<Image src={image} duration={0} width={200} />
							)}
							<ButtonGroup
								size='small'
								sx={{ marginTop: 2, alignSelf: 'flex-end' }}
							>
								<Box mr={2}>
									<Button
										variant='contained'
										type='submit'
										value='Submit'
									>
										Save
									</Button>
								</Box>
								<Box>
									<Button
										variant='contained'
										type='button'
										value='Cancel'
										onClick={handleCancelButtonOnClick}
									>
										Cancel
									</Button>
								</Box>
							</ButtonGroup>
						</Box>
					</form>
				</CardContent>
			</Card>
		</Box>
	);
};
export default EditPoint;
