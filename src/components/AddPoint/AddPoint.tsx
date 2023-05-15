import React, { ChangeEventHandler, FormEvent, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import { PointInt } from '../Points/Points';

interface AddPointPropsInt {
	handleAddPoint: (
		e: FormEvent<HTMLFormElement>,
		formData: Omit<PointInt, 'id'>
	) => void;
}

const AddPoint = ({ handleAddPoint }: AddPointPropsInt) => {
	const initialFormData = {
		lat: '',
		lng: '',
		name: '',
		description: '',
		type: '',
		yearBuilt: '',
		url: '',
	};

	const [formData, setFormData] = useState(initialFormData);

	const navigate = useNavigate();

	const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleCancelButtonOnClick = () => {
		navigate(-1);
	};

	return (
		<Container fixed>
			<Button
				variant='outlined'
				type='button'
				size='small'
				component={Link}
				to='/'
			>
				Home
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
							/>
							<TextField
								id='outlined-basic'
								label='Type'
								variant='outlined'
								type='text'
								name='type'
								value={formData.type}
								onChange={handleOnChange}
								size='small'
								margin='normal'
							/>
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
							/>
							<ButtonGroup size='small' sx={{ marginTop: 2 }}>
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
		</Container>
	);
};
export default AddPoint;
