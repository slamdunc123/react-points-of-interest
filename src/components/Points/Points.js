import { useEffect, useState } from 'react';

import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';

import styles from './points.module.css';

const Points = ({
	points,
	filterPoints,
	checkedFilter,
	isFilteringActive,
	setIsFilteringActive,
}) => {
	const [activePoint, setActivePoint] = useState(''); // initalise with an empty string to avoid object and uncontrolled component warnings
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		isFilteringActive && setIsSidebarOpen(true);
	}, [isFilteringActive]);

	const handlePointOnClick = (point) => {
		setActivePoint(point);
	};

	const handlePointOnChange = (e) => {
		const activePointObj = points.find(
			(point) => point.id === e.target.value.id
		);
		activePointObj && setActivePoint(activePointObj);
	};

	const handleFilterOnChange = (e) => {
		const value = e.target.value;
		setActivePoint('');
		filterPoints(value);
		setIsFilteringActive(true);
	};

	const handleSidebarOnClick = (isOpen) => {
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
			/>
		</div>
	);
};

export default Points;
