// @ts-nocheck

import { useEffect, useState } from 'react';
import { Route, Routes, useMatch, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useJsApiLoader } from '@react-google-maps/api';

import { MapType, PointType } from './types';
import { Authenticator } from '@aws-amplify/ui-react';

import { fetchPoints } from './features/point/pointSlice';
import { fetchMaps } from './features/map/mapSlice';

import MapContainer from './components/MapContainer/MapContainer';
import Home from './components/Home/Home';
import Point from './components/Point/Point';
import AddPoint from './components/AddPoint/AddPoint';
import EditPoint from './components/EditPoint/EditPoint';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { Login } from './components/Login/Login';

import './App.css';

const libraries = ['geometry', 'drawing'];
const MAP_API = process.env.REACT_APP_MAP_API;

function App() {
	const [isUserAuthenticated, setIsUserAuthenticated] = useState();
	const dispatch = useAppDispatch();
	const points = useAppSelector<PointType[]>((state) => state.points.pointsData);
	const pointStatus = useAppSelector((state) => state.points.status);
	const maps = useAppSelector<MapType[]>((state) => state.maps.mapsData);
	const mapStatus = useAppSelector((state) => state.maps.status);

	const [mapId, setMapId] = useState('');
	const [currentMap, setCurrentMap] = useState();
	console.log('slamdunc ~ App ~ currentMap:', currentMap)

	const matchPoint = useMatch('/point/:id');
	const matchEditPoint = useMatch('/edit-point/:id');

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: MAP_API,
		libraries: libraries,
	});

	const point = matchPoint
		? points.find((point) => point.id === matchPoint.params.id)
		: null;
	const editPoint = matchEditPoint
		? points.find((point) => point.id === matchEditPoint.params.id)
		: null;

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

	const handleMapOnChange = (e: SelectChangeEvent) => {
		setMapId(e.target.value);
	};

	const checkUserIsAuthenticatedForMap = (isUserAuth) => {
		setIsUserAuthenticated(isUserAuth);
	};

	useEffect(() => {
		if (mapStatus === 'idle') {
			dispatch(fetchMaps());
		}
	}, [mapStatus, dispatch]);

	useEffect(() => {
		const mapFound = maps.find((map) => map.id === mapId);
		if (mapFound) setCurrentMap(mapFound);
	}, [maps, mapId]);

	useEffect(() => {
		if (pointStatus === 'idle') {
			dispatch(fetchPoints());
		}
	}, [pointStatus, dispatch]);

	return (
		<Authenticator.Provider>
			<Routes>
				<Route
					path='/'
					element={
						<Home
							mapId={mapId}
							handleMapOnChange={handleMapOnChange}
						/>
					}
				/>
				<Route
					path='/maps/:Id'
					element={
						<MapContainer
							isLoaded={isLoaded}
							checkPointIsInCircle={checkPointIsInCircle}
							checkUserIsAuthenticatedForMap={
								checkUserIsAuthenticatedForMap
							}
              currentMap={currentMap}
						/>
					}
				/>
				<Route
					path='/point/:id'
					element={
						<Point
							point={point}
							mapId={mapId}
							isUserAuthenticated={isUserAuthenticated}
						/>
					}
				/>
				{isUserAuthenticated && (
					<Route
						path='/add-point'
						element={
							<RequireAuth>
								<AddPoint mapId={mapId} />
							</RequireAuth>
						}
					/>
				)}
				{isUserAuthenticated && (
					<Route
						path='/edit-point/:id'
						element={
							<RequireAuth>
								<EditPoint
									editPoint={editPoint}
									checkPointIsInCircle={checkPointIsInCircle}
									mapId={mapId}
								/>
							</RequireAuth>
						}
					/>
				)}

				<Route path='/login' element={<Login />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</Authenticator.Provider>
	);
}

export default App;
