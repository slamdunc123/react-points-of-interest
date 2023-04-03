import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import styles from './addPoint.module.css';
import { API } from 'aws-amplify';
import { createPoint as createPointMutation } from '../../graphql/mutations';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const AddPoint = () => {
	const initialFormData = {
		lat: '',
		lng: '',
		name: '',
		type: '',
		yearBuilt: '',
		url: '',
	};

	const [formData, setFormData] = useState(initialFormData);

	const handleOnChange = (e) => {
		console.log(e.target.value);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleOnSubmitAddPoint = async (event) => {
		event.preventDefault();
		console.log('formData', formData);
		const form = new FormData(event.target);
		const data = {
			name: form.get('name'),
			lat: form.get('lat'),
			lng: form.get('lng'),
			type: form.get('type'),
			yearBuilt: form.get('yearBuilt'),
			url: form.get('url'),
		};
		await API.graphql({
			query: createPointMutation,
			variables: { input: data },
		});
		setFormData(initialFormData);
	};
	return (
		<>
			<Link to='/'>Home</Link>
			<div className={styles.container}>
				<Card>
					<CardContent>
						<div>Add Point Contents</div>
						<form
							onSubmit={handleOnSubmitAddPoint}
							className={styles.form}
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
							/>
							<Button
								variant='contained'
								type='submit'
								value='Submit'
							>
								Submit
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</>
	);
};
export default AddPoint;
