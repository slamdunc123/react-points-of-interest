//@ts-nocheck

import { ChangeEvent, useEffect, useState } from 'react';

import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';
import { SelectChangeEvent } from '@mui/material/Select';

import styles from './map-container.module.css';
import { useSelector } from 'react-redux';
import { ALL_POINTS } from '../../constants/PointTypes';

interface MapContainerPropsInt {
	isLoaded: boolean;
	mapId: string;
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

const MapContainer = ({ isLoaded, mapId }: MapContainerPropsInt) => {
	const [activePoint, setActivePoint] = useState(''); // initalise with an empty string to avoid object and uncontrolled component warnings
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [filteredPointsByMapId, setFilteredPointsByMapId] = useState();
	const [checkedFilter, setCheckedFilter] = useState(ALL_POINTS);
	const [isFilteringActive, setIsFilteringActive] = useState(false);
	const [filteredPointsByCategory, setFilteredPointsByCategory] = useState(); // these can change on changing filters

	const points = useSelector((state) => state.points.pointsData);

	useEffect(() => {
		const pointsByMapId = points.filter((point) => point.mapId === mapId);
		setFilteredPointsByMapId(pointsByMapId);
	}, [points, mapId]);

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

	const filterPoints = (value) => {
		setIsFilteringActive(true);
		if (value === ALL_POINTS) {
			setFilteredPointsByCategory(filteredPointsByMapId);
			setCheckedFilter(ALL_POINTS);
		} else {
			const pointsFilteredByValue = filteredPointsByMapId.filter(
				(point) => point.type === value
			);
			setFilteredPointsByCategory(pointsFilteredByValue);
			setCheckedFilter(value);
		}
	};

	const filteredPoints = isFilteringActive
		? filteredPointsByCategory
		: filteredPointsByMapId;

	return (
		<div className={styles.container}>
			<Sidebar
				handleFilterOnChange={handleFilterOnChange}
				points={filteredPoints}
				activePoint={activePoint}
				handlePointOnChange={handlePointOnChange}
				checkedFilter={checkedFilter}
				isSidebarOpen={isSidebarOpen}
			/>

			<Map
				points={filteredPoints}
				activePoint={activePoint}
				handlePointOnClick={handlePointOnClick}
				handleSidebarOnClick={handleSidebarOnClick}
				isSidebarOpen={isSidebarOpen}
				isLoaded={isLoaded}
				mapId={mapId}
			/>
		</div>
	);
};

export default MapContainer;
