// @ts-nocheck
import React, { useEffect, ChangeEvent } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {
	fetchCategories,
} from '../../features/category/categorySlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type PointsFilterPropsType = {
	checkedFilter: string;
	handleFilterOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const PointsFilters = ({
	checkedFilter,
	handleFilterOnChange,
}: PointsFilterPropsType) => {

  const categories = useAppSelector((state) => state.categories.categoriesData);
	const categoryStatus = useAppSelector((state) => state.categories.status);

	const dispatch = useAppDispatch();

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
