//@ts-nocheck
import React, { ChangeEventHandler, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { API, Storage } from 'aws-amplify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Image from 'mui-image';
import { addPoint } from '../../features/point/pointSlice';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { PointType } from '../MapContainer/MapContainer';
import { createHistory } from '../../graphql/mutations';

type AddPointPropsType = {
	handleAddPoint: (
		e: FormEvent<HTMLFormElement>,
		formData: Omit<PointType, 'id'>
	) => void;
	mapId: string;
};

const AddPoint = ({ mapId }: AddPointPropsType) => {
	const initialFormData = {
		lat: '',
		lng: '',
		name: '',
		description: '',
		categoryId: '',
		yearBuilt: '',
		url: '',
		image: '',
		imageName: '',
	};

	const initialHistoryFormData = [
		{
			date: '',
			name: '',
		},
	];

	const [formData, setFormData] = useState(initialFormData);
	const [historyFormData, setHistoryFormData] = useState(
		initialHistoryFormData
	);
	const [image, setImage] = useState('');
	const [category, setCategory] = useState('');

	const drawnMarker = useAppSelector((state) => state.points.drawnMarker);
	const categories = useAppSelector(
		(state) => state.categories.categoriesData
	);

	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		// check it out: we get the evt.target.name (which will be either "email" or "password")
		// and use it to target the key on our `state` object with the same name, using bracket syntax

		const updatedData = {
			...formData,
			[e.target.name]: e.target.value,
		};
		updatedData.lat = drawnMarker.lat;
		updatedData.lng = drawnMarker.lng;
		setFormData(updatedData);
	};
	const handleHistoryOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		// check it out: we get the evt.target.name (which will be either "email" or "password")
		// and use it to target the key on our `state` object with the same name, using bracket syntax

		let history = [...historyFormData];
		history[e.target.id][e.target.name] = e.target.value;

		setHistoryFormData(history);
	};

	const handleCategoryOnChange = (e: SelectChangeEvent) => {
		const { value } = e.target;
		setCategory(value);
	};

	const handleOnChangeImage: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.files) {
			setImage(URL.createObjectURL(e.target.files[0]));
		}
	};

	const handleAddHistory = (e) => {
		e.preventDefault();
		setHistoryFormData([...historyFormData, { date: '', name: '' }]);
	};

	const handleRemoveHistory = (index) => {
		historyFormData.splice(index, 1);
		setHistoryFormData(historyFormData);
	};

	const handleAddPoint = async (e, data) => {
		e.preventDefault();

		const form = new FormData(e.target);
		const image = form.get('image');

		const dataForStorage = {
			name: form.get('name'),
			image: image.name,
		};
		data.image = image.name;
		data.categoryId = category.id;
		data.mapId = mapId;
		try {
			if (!!dataForStorage.image)
				await Storage.put(dataForStorage.image, image);
			const pointData = await dispatch(addPoint(data));
			const pointId = pointData.payload.createPoint.id;
			historyFormData.map(async (item) => {
				await API.graphql({
					query: createHistory,
					variables: {
						input: {
							pointId: pointId,
							date: item.date,
							name: item.name,
						},
					},
				});
			});

			navigate(`/maps/${mapId}`);
		} catch (error) {
			console.log(error);
		}
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
					<div>Add Point Contents</div>
					<form onSubmit={(e) => handleAddPoint(e, formData)}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
							}}
						>
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
								required
							/>
							<TextField
								id='outlined-basic'
								label='Description'
								variant='outlined'
								type='text'
								name='description'
								value={formData.description}
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
								value={drawnMarker.lat}
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
								value={drawnMarker.lng}
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
									value={category}
									label='Category'
									onChange={handleCategoryOnChange}
									name='type'
									required
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
							<button onClick={handleAddHistory}>
								Add History
							</button>
							{historyFormData.map((item, index) => (
								<div key={index}>
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
									/>
									<button
										onClick={(index) =>
											handleRemoveHistory(index)
										}
									>
										Remove History
									</button>
								</div>
							))}
							<TextField
								name='image'
								type='file'
								margin='normal'
								size='small'
								onChange={handleOnChangeImage}
								fullWidth
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
										Submit
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
export default AddPoint;
