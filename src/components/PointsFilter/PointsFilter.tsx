// @ts-nocheck
import React, { ChangeEvent } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useAppSelector } from '../../app/hooks';

interface PointsFilterProps {
	checkedFilter: string;
	handleFilterOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const PointsFilters = ({
	checkedFilter,
	handleFilterOnChange,
}: PointsFilterProps) => {
	const categories = useAppSelector((state) => state.categories.categoriesData);
	return (
		<FormControl>
			<FormLabel id='demo-controlled-radio-buttons-group'>
				Categories
			</FormLabel>
			<RadioGroup
				aria-labelledby='demo-controlled-radio-buttons-group'
				name='controlled-radio-buttons-group'
				value={checkedFilter}
				onChange={handleFilterOnChange}
			>
				<FormControlLabel value='all' control={<Radio />} label='All' />
				{categories.length &&
					categories.map((item) => (
						<FormControlLabel
							key={item.id}
							value={item.name}
							control={<Radio />}
							label={item.name}
						/>
					))}
			</RadioGroup>
		</FormControl>
	);
};
export default PointsFilters;
