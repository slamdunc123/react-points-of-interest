import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
const PointsFilters = ({ handleFilterOnChange, isCheckedFilter }) => {
	return (
		<FormControl>
			<FormLabel id='demo-controlled-radio-buttons-group'>
				Category
			</FormLabel>
			<RadioGroup
				aria-labelledby='demo-controlled-radio-buttons-group'
				name='controlled-radio-buttons-group'
				value={isCheckedFilter}
				onChange={handleFilterOnChange}
			>
				<FormControlLabel value='all' control={<Radio />} label='All' />
				<FormControlLabel
					value='religious'
					control={<Radio />}
					label='Religious'
				/>
				<FormControlLabel
					value='hospitality'
					control={<Radio />}
					label='Hospitality'
				/>
				<FormControlLabel
					value='community'
					control={<Radio />}
					label='Community'
				/>
			</RadioGroup>
		</FormControl>
	);
};
export default PointsFilters;
