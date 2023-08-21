// @ts-nocheck
import React, { useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {
	fetchCategories,
} from '../../features/category/categorySlice';

interface PointsFilterProps {
	checkedFilter: string;
	handleFilterOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const PointsFilters = ({
	checkedFilter,
	handleFilterOnChange,
}: PointsFilterProps) => {

  const categories = useSelector((state) => state.categories.categoriesData);
	const categoryStatus = useSelector((state) => state.categories.status);

	const dispatch = useDispatch();

	useEffect(() => {
		if (categoryStatus === 'idle') {
			dispatch(fetchCategories());
		}
	}, [categoryStatus, dispatch]);

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
