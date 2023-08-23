// @ts-nocheck
import React, { ChangeEvent } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useAppSelector } from '../../app/hooks';

type PointsFilterPropsType = {
	checkedFilter: string;
	handleFilterOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  filteredPointsByMapId: PointInt[]
}
const PointsFilters = ({
	checkedFilter,
	handleFilterOnChange,
  filteredPointsByMapId
}: PointsFilterPropsType) => {
  const categories = useAppSelector((state) => state.categories.categoriesData);

  const categoriesById = filteredPointsByMapId.map(item => item.categoryId)
  const categoriesFilteredByCategoryId = categories.filter(item => categoriesById.includes(item.id))
  
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
				{categoriesFilteredByCategoryId.length &&
					categoriesFilteredByCategoryId.map((item) => (
						<FormControlLabel
							key={item.id}
							value={item.id}
							control={<Radio />}
							label={item.name}
						/>
					))}
			</RadioGroup>
		</FormControl>
	);
};
export default PointsFilters;
