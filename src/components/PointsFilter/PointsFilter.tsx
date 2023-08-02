// @ts-nocheck
import React, { useState, useEffect, ChangeEvent } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { listCategories } from '../../graphql/queries';
import { API } from 'aws-amplify';

interface PointsFilterProps {
	checkedFilter: string;
	handleFilterOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const PointsFilters = ({
	checkedFilter,
	handleFilterOnChange,
}: PointsFilterProps) => {
	const [categories, setCategories] = useState();

	const fetchCategories = async () => {
		const apiData = await API.graphql({ query: listCategories });
		const catagoriesFromAPI = apiData.data.listCategories.items;
		setCategories(catagoriesFromAPI);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

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

				{categories &&
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
