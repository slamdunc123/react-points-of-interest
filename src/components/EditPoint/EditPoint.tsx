//@ts-nocheck

import React, { useState, useEffect, ChangeEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { Storage } from 'aws-amplify';
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

	const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
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
		updatedData.image = image.name ? image.name : editPoint.imageName; // needed to not overwrite existing image with nothing if no new image is selected
		updatedData.lat = Number(updatedData.lat);
		updatedData.lng = Number(updatedData.lng);
		updatedData.categoryId = category.id;

		try {
			if (!!dataForStorage.image) {
				await Storage.remove(updatedData.imageName); // remove existing image from storage TODO this isn't working
				await Storage.put(dataForStorage.image, image); // add replaced image into storage
			}

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
