import { ChangeEvent, useEffect, useState } from 'react';

import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';
import { SelectChangeEvent } from '@mui/material/Select';

import styles from './points.module.css';

interface PointsPropsInt {
	points: PointInt[];
	filterPoints: (value: string) => void;
	checkedFilter: string;
	isFilteringActive: boolean;
  isLoaded: boolean;
}

export interface PointInt {
	id: string;
	name: string;
	lat: string;
	lng: string;
	type: string;
	yearBuilt: string;
	url: string;
	description: string;
  image: any;
  imageName: string;
}

const Points = ({
	points,
	filterPoints,
	checkedFilter,
	isFilteringActive,
  isLoaded
}: PointsPropsInt) => {
	const [activePoint, setActivePoint] = useState(''); // initalise with an empty string to avoid object and uncontrolled component warnings
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		isFilteringActive && setIsSidebarOpen(true);
	}, [isFilteringActive]);

	const handlePointOnClick = (point: string) => {
		setActivePoint(point);
	};

	const handlePointOnChange = (e: SelectChangeEvent) => {
		const { value } = e.target;
		setActivePoint(value);
	};

	const handleFilterOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setActivePoint('');
		filterPoints(value);
	};

	const handleSidebarOnClick = (isOpen: boolean) => {
		setIsSidebarOpen(isOpen);
	};

	return (
		<div className={styles.container}>
			<Sidebar
				handleFilterOnChange={handleFilterOnChange}
				points={points}
				activePoint={activePoint}
				handlePointOnChange={handlePointOnChange}
				checkedFilter={checkedFilter}
				isSidebarOpen={isSidebarOpen}
			/>

			<Map
				points={points}
				activePoint={activePoint}
				handlePointOnClick={handlePointOnClick}
				handleSidebarOnClick={handleSidebarOnClick}
				isSidebarOpen={isSidebarOpen}
        isLoaded={isLoaded}
			/>
		</div>
	);
};

export default Points;
