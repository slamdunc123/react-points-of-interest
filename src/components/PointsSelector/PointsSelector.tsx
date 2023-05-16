import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PointInt } from '../Points/Points';

interface PointsSelectorProps {
  points: PointInt[];
  activePoint: any;
  handlePointOnChange: any;
}

const PointsSelector = ({ points, activePoint, handlePointOnChange }: PointsSelectorProps) => {
	return (
		<FormControl fullWidth>
			<InputLabel id='demo-simple-select-label'>Points</InputLabel>
			<Select
				labelId='demo-simple-select-label'
				id='demo-simple-select'
				value={activePoint}
				label='Points'
				onChange={handlePointOnChange}
			>
				{points.map((point: any) => (
					<MenuItem value={point} key={point.id}>{point.name}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default PointsSelector;
