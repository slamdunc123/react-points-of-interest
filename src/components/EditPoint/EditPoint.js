import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import styles from './editPoint.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';

const EditPoint = ({ handleEditPoint, editPoint }) => {
	console.log("slamdunc ~ file: EditPoint.js:12 ~ EditPoint ~ editPoint:", editPoint)
	const [formData, setFormData] = useState(editPoint);

	const handleOnChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<>
			<Link to='/'>Home</Link>
			<div className={styles.container}>
				<Card>
					<CardContent>
						<div>Edit Point Contents</div>
						<form
							onSubmit={(e) => handleEditPoint(e, formData)}
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
								margin='normal'
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
							<Box mt={2}>
								<Button
									variant='contained'
									type='submit'
									value='Submit'
									mt={2}
								>
									Submit
								</Button>
							</Box>
						</form>
					</CardContent>
				</Card>
			</div>
		</>
	);
};
export default EditPoint;
