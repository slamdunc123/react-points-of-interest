// @ts-nocheck

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MapContainer from './components/MapContainer/MapContainer';
import { Route, Routes, useMatch, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Point from './components/Point/Point';
import AddPoint from './components/AddPoint/AddPoint';
import EditPoint from './components/EditPoint/EditPoint';
import { fetchPoints, allPoints } from './features/point/pointSlice';
import { allMaps, fetchMaps } from './features/map/mapSlice';
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { Login } from './components/Login/Login';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['geometry'];
const MAP_API = process.env.REACT_APP_MAP_API;

function App() {
	const dispatch = useDispatch();
	const points = useSelector(allPoints);
	const maps = useSelector(allMaps);
	const pointStatus = useSelector((state) => state.points.status);
	const mapStatus = useSelector((state) => state.maps.status);

	const [mapId, setMapId] = useState('');
	const [currentMap, setCurrentMap] = useState();

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

	const handleMapOnChange = (e: SelectChangeEvent) => {
		setMapId(e.target.value);
	};

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
					element={<MapContainer isLoaded={isLoaded} mapId={mapId} />}
				/>
				<Route
					path='/point/:id'
					element={<Point point={point} mapId={mapId} />}
				/>
				<Route
					path='/add-point'
					element={
						<RequireAuth>
							<AddPoint
								checkPointIsInCircle={checkPointIsInCircle}
								mapId={mapId}
							/>
						</RequireAuth>
					}
				/>
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
				<Route path='/login' element={<Login />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</Authenticator.Provider>
	);
}

export default App;
