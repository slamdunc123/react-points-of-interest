import React from 'react';
import styles from './sidebar.module.css';
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';

const Sidebar = ({ points, activePoint, handlePointOnChange }) => {
	return (
		<div className={styles.container}>
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-label'>Points Of Interest</InputLabel>
				{
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={activePoint}
						label='Points Of Interest'
						onChange={handlePointOnChange}
                        sx={{textAlign: 'left'}}
					>
						{points.map((point) => (
							<MenuItem key={point.id} value={point}>
								{point.name}
							</MenuItem>
						))}
					</Select>
				}
			</FormControl>
		</div>
	);
};

export default Sidebar;
