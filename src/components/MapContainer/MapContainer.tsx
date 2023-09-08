//@ts-nocheck

import { ChangeEvent, useEffect, useState } from 'react';

import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';
import { SelectChangeEvent } from '@mui/material/Select';

import styles from './map-container.module.css';
import { ALL_POINTS } from '../../constants/PointTypes';
import { fetchCategories } from '../../features/category/categorySlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useAuthenticator } from '@aws-amplify/ui-react';

type MapContainerPropsType = {
	isLoaded: boolean;
	mapId: string;
};

export type PointType = {
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
	categoryId: string;
};

const MapContainer = ({
	isLoaded,
	mapId,
	maps,
	checkUserIsAuthenticatedForMap,
}: MapContainerPropsType) => {
	const [activePoint, setActivePoint] = useState(''); // initalise with an empty string to avoid object and uncontrolled component warnings
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [filteredPointsByMapId, setFilteredPointsByMapId] = useState();
	const [checkedFilter, setCheckedFilter] = useState(ALL_POINTS);
	const [isFilteringActive, setIsFilteringActive] = useState(false);
	const [filteredPointsByCategory, setFilteredPointsByCategory] = useState(); // these can change on changing filters
	const [isMapView, setIsMapView] = useState(true);
	const [currentMap, setCurrentMap] = useState();

	const points = useAppSelector((state) => state.points.pointsData);
	const categoryStatus = useAppSelector((state) => state.categories.status);

	const dispatch = useAppDispatch();

	const { user } = useAuthenticator((context) => [context.user]);

	const adminGroupsOfSignedInUser =
		user?.signInUserSession.accessToken.payload['cognito:groups'] || [];

	const currentMapAdminGroup = currentMap?.adminGroup;

	const isUserAuthenticatedForCurrentMap =
		adminGroupsOfSignedInUser.includes(currentMapAdminGroup);

	const filteredPoints = isFilteringActive
		? filteredPointsByCategory
		: filteredPointsByMapId;

	const handlePointOnClick = (point: string) => {
		setActivePoint(point);
	};

	const handlePointOnChange = (e: SelectChangeEvent) => {
		const { value } = e.target;
		setActivePoint(value);
	};

	const handleGridRowOnClick = (e) => {
		const point = points.find((item) => item.id === e.id);
		setActivePoint(point);
    setIsMapView(true);
	};

	const handleFilterOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setActivePoint('');
		filterPoints(value);
	};

	const handleSidebarOnClick = (isOpen: boolean) => {
		setIsSidebarOpen(isOpen);
	};

	const handleViewOnClick = () => {
		setIsMapView((preIsMapView) => !preIsMapView);
	};

	const checkPointIsInCircle = (lat, lng) => {
		const latLngCenter = new window.google.maps.LatLng(
			currentMap.center.lat,
			currentMap.center.lng
		);
		const latLngMarker = new window.google.maps.LatLng(
			Number(lat),
			Number(lng)
		);
		const computeDistance =
			window.google.maps.geometry.spherical.computeDistanceBetween(
				latLngCenter,
				latLngMarker
			);

		if (currentMap.circleOptions.radius > computeDistance) return true;
	};

	const filterPoints = (value) => {
		setIsFilteringActive(true);
		if (value === ALL_POINTS) {
			setFilteredPointsByCategory(filteredPointsByMapId);
			setCheckedFilter(ALL_POINTS);
		} else {
			const pointsFilteredByValue = filteredPointsByMapId.filter(
				(point) => point.categoryId === value
			);
			setFilteredPointsByCategory(pointsFilteredByValue);
			setCheckedFilter(value);
		}
	};

	useEffect(() => {
		checkUserIsAuthenticatedForMap(isUserAuthenticatedForCurrentMap);
	}, [checkUserIsAuthenticatedForMap, isUserAuthenticatedForCurrentMap]);

	useEffect(() => {
		const mapFound = maps.find((map) => map.id === mapId);
		if (mapFound) setCurrentMap(mapFound);
	}, [maps, mapId]);

	useEffect(() => {
		if (categoryStatus === 'idle') {
			dispatch(fetchCategories());
		}
	}, [categoryStatus, dispatch]);

	useEffect(() => {
		const pointsByMapId = points.filter((point) => point.mapId === mapId);
		setFilteredPointsByMapId(pointsByMapId);
	}, [points, mapId]);

	useEffect(() => {
		isFilteringActive && setIsSidebarOpen(true);
	}, [isFilteringActive]);

	return (
		<div className={styles.container}>
			<Sidebar
				handleFilterOnChange={handleFilterOnChange}
				points={filteredPoints}
				activePoint={activePoint}
				handlePointOnChange={handlePointOnChange}
				checkedFilter={checkedFilter}
				isSidebarOpen={isSidebarOpen}
				filteredPointsByMapId={filteredPointsByMapId}
				handleSidebarOnClick={handleSidebarOnClick}
				handleViewOnClick={handleViewOnClick}
				isMapView={isMapView}
			/>

			<Map
				points={filteredPoints}
				activePoint={activePoint}
				handlePointOnClick={handlePointOnClick}
				handleGridRowOnClick={handleGridRowOnClick}
				handleSidebarOnClick={handleSidebarOnClick}
				isSidebarOpen={isSidebarOpen}
				isLoaded={isLoaded}
				mapId={mapId}
				checkPointIsInCircle={checkPointIsInCircle}
				isUserAuthenticatedForCurrentMap={
					isUserAuthenticatedForCurrentMap
				}
				isMapView={isMapView}
			/>
		</div>
	);
};

export default MapContainer;
