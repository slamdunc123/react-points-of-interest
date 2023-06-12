// @ts-nocheck

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Points from './components/Points/Points';
import {
	Route,
	Routes,
	useNavigate,
	useMatch,
	Navigate,
} from 'react-router-dom';
import Point from './components/Point/Point';
import AddPoint from './components/AddPoint/AddPoint';
import EditPoint from './components/EditPoint/EditPoint';
import { ALL_POINTS } from './constants/PointTypes';
import {
	deletePoint,
	fetchPoints,
	allPoints,
	addPoint,
	updatePoint,
} from './features/point/pointSlice';
import './App.css';
import { Storage } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { Login } from './components/Login/Login';
import { useJsApiLoader } from '@react-google-maps/api';
import { mapConfig } from './config/MapConfig';

const { radius } = mapConfig.circleOptions;

const libraries = ['geometry'];
const MAP_API = process.env.REACT_APP_MAP_API;

function App() {
	const dispatch = useDispatch();
	const points = useSelector(allPoints);
	const pointStatus = useSelector((state) => state.points.status);

	const [filteredPoints, setFilteredPoints] = useState(points); // these can change on changing filters
	const [checkedFilter, setCheckedFilter] = useState(ALL_POINTS);
	const [isFilteringActive, setIsFilteringActive] = useState(false);

	const [formErrorMessage, setFormErrorMessage] = useState('');
	const [alertDialogOpen, setAlertDialogOpen] = useState(false);

	const navigate = useNavigate();
	const matchPoint = useMatch('/points/:id');
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
			53.19455626366442,
			-1.695365906570867
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
		if (radius > computeDistance) return true;
	};

	useEffect(() => {
		if (pointStatus === 'idle') {
			dispatch(fetchPoints());
		}
	}, [pointStatus, dispatch]);

	useEffect(() => {
		setAlertDialogOpen(false);
	}, []);

	const handleAlertDialogClose = () => {
		setAlertDialogOpen(false);
	};

	const filterPoints = (value) => {
		setIsFilteringActive(true);
		if (value === ALL_POINTS) {
			setFilteredPoints(points);
			setCheckedFilter(ALL_POINTS);
		} else {
			const pointsFilteredByValue = points.filter(
				(point) => point.type === value
			);
			setFilteredPoints(pointsFilteredByValue);
			setCheckedFilter(value);
		}
	};

	const handleAddPoint = async (e, data) => {
		e.preventDefault();
		const isPointInCirle = checkPointIsInCircle(data.lat, data.lng);

		if (!isPointInCirle) {
			setAlertDialogOpen(true);
			setFormErrorMessage('Point needs to be within permitted boundary');
			return;
		}

		const form = new FormData(e.target);
		const image = form.get('image');
		if (!image.name) {
			setAlertDialogOpen(true);
			setFormErrorMessage('Please select an image');
			return;
		}
		const dataForStorage = {
			name: form.get('name'),
			image: image.name,
		};

		data.image = image.name;
		try {
			if (!!dataForStorage.image)
				await Storage.put(dataForStorage.image, image);
			setCheckedFilter(ALL_POINTS);
			setIsFilteringActive(false);
			dispatch(addPoint(data));
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};
	const handleEditPoint = async (e, data) => {
		e.preventDefault();
		const isPointInCirle = checkPointIsInCircle(data.lat, data.lng);

		if (!isPointInCirle) {
			setAlertDialogOpen(true);
			setFormErrorMessage('Point needs to be within permitted boundary');
			return;
		}
		const form = new FormData(e.target);
		const image = form.get('image');
		// if (!image.name) {
		// 	setAlertDialogOpen(true);
		// 	setFormErrorMessage('Please select an image');
		// 	return;
		// }

		const dataForStorage = {
			id: data.id,
			name: form.get('name'),
			image: image.name ? image.name : null,
		};

		const updatedData = { ...data };

		delete updatedData.createdAt;
		delete updatedData.updatedAt;
		updatedData.image = image.name;
		updatedData.lat = Number(updatedData.lat);
		updatedData.lng = Number(updatedData.lng);
		try {
			if (!!dataForStorage.image) {
				await Storage.remove(updatedData.imageName); // remove existing image from storage
				await Storage.put(dataForStorage.image, image); // add replaced image into storage
			}

			setCheckedFilter(ALL_POINTS);
			setIsFilteringActive(false);
			dispatch(updatePoint(updatedData));
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeletePoint = async (point) => {
		try {
			setCheckedFilter(ALL_POINTS);
			setIsFilteringActive(false);
			dispatch(deletePoint(point));
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Authenticator.Provider>
			<Routes>
				<Route
					path='/'
					element={
						<Points
							points={isFilteringActive ? filteredPoints : points}
							filterPoints={filterPoints}
							checkedFilter={checkedFilter}
							isFilteringActive={isFilteringActive}
							isLoaded={isLoaded}
						/>
					}
				/>
				<Route
					path='/points/:id'
					element={
						<Point
							point={point}
							handleDeletePoint={handleDeletePoint}
						/>
					}
				/>
				<Route
					path='/add-point'
					element={
						<RequireAuth>
							<AddPoint
								handleAddPoint={handleAddPoint}
								alertDialogOpen={alertDialogOpen}
								handleAlertDialogClose={handleAlertDialogClose}
								formErrorMessage={formErrorMessage}
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
								handleEditPoint={handleEditPoint}
								alertDialogOpen={alertDialogOpen}
								handleAlertDialogClose={handleAlertDialogClose}
								formErrorMessage={formErrorMessage}
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
