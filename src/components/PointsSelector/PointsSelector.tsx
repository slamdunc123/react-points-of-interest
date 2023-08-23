import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { PointType } from '../MapContainer/MapContainer';

type PointsSelectorPropsType = {
	points: PointType[];
	activePoint: any;
	handlePointOnChange: (e: SelectChangeEvent) => void;
}

const PointsSelector = ({
	points,
	activePoint,
	handlePointOnChange,
}: PointsSelectorPropsType) => {
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
					<MenuItem value={point} key={point.id}>
						{point.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default PointsSelector;
