import { useState } from 'react';

import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';

import { ALL_POINTS } from '../../constants/PointTypes';

import styles from './points.module.css';

const Points = ({ points, updatePoints, activePoint, setActivePoint }) => {
	const [isCheckedFilter, setIsCheckedFilter] = useState(ALL_POINTS);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
		setIsCheckedFilter(value);
		setActivePoint('');
		updatePoints(value);
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
				isCheckedFilter={isCheckedFilter}
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
