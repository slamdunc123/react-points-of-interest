import { useState } from 'react';

import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';

import points from '../../points';
import { ALL_POINTS } from '../../constants/PointTypes';

import styles from './points.module.css';

const Points = () => {
	const [filteredSetOfPoints, setFilteredSetOfPoints] = useState(points);
	const [isCheckedFilter, setIsCheckedFilter] = useState(ALL_POINTS);
	const [activePoint, setActivePoint] = useState(''); // initalise with an empty string to avoid object and uncontrolled component warnings
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handlePointOnClick = (point) => {
		setActivePoint(point);
	};

	const handlePointOnChange = (e) => {
    console.log(e.target.value)
		const activePointObj = points.find((point) => point.id === e.target.value);
		// const activePointObj = e.target.value;
		activePointObj && setActivePoint(activePointObj);
	};

	const handleFilterOnChange = (e) => {
		const value = e.target.value;
		setIsCheckedFilter(value);
		setActivePoint('');
		if (value === ALL_POINTS) {
			setFilteredSetOfPoints(points);
		} else {
			const filteredPoints = points.filter(
				(point) => point.type === value
			);
			setFilteredSetOfPoints(filteredPoints);
		}
	};

	const handleSidebarOnClick = (isOpen) => {
		setIsSidebarOpen(isOpen);
	};

	return (
		<div className={styles.container}>
			<Sidebar
				handleFilterOnChange={handleFilterOnChange}
				points={filteredSetOfPoints}
				activePoint={activePoint}
				handlePointOnChange={handlePointOnChange}
				isCheckedFilter={isCheckedFilter}
				isSidebarOpen={isSidebarOpen}
			/>

			<Map
				points={filteredSetOfPoints}
				activePoint={activePoint}
				handlePointOnClick={handlePointOnClick}
        handleSidebarOnClick={handleSidebarOnClick}
				isSidebarOpen={isSidebarOpen}

			/>
		</div>
	);
};

export default Points;
