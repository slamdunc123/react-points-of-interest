// @ts-nocheck

import { useEffect, useState } from 'react';
import './App.css';
import Points from './components/Points/Points';
import { listPoints } from './graphql/queries';
import { API } from 'aws-amplify';
import { Route, Routes, useNavigate, useMatch } from 'react-router-dom';
import Point from './components/Point/Point';
import AddPoint from './components/AddPoint/AddPoint';
import EditPoint from './components/EditPoint/EditPoint';
import { ALL_POINTS } from './constants/PointTypes';
import {
	createPoint as createPointMutation,
	deletePoint as deletePointMutation,
	updatePoint as updatePointMutation,
} from './graphql/mutations';

function App() {
	// TODO: check if both points and filteredPoints are needed
	const [points, setPoints] = useState([]); // these can change on add, edit, delete point
	const [filteredPoints, setFilteredPoints] = useState([]); // these can change on changing filters

	const [checkedFilter, setCheckedFilter] = useState(ALL_POINTS);
	const [isFilteringActive, setIsFilteringActive] = useState(false);

	const navigate = useNavigate();
	const matchPoint = useMatch('/:id');
	const matchEditPoint = useMatch('/edit-point/:id');

	const point = matchPoint
		? filteredPoints.find((point) => point.id === matchPoint.params.id)
		: null;
	const editPoint = matchEditPoint
		? filteredPoints.find((point) => point.id === matchEditPoint.params.id)
		: null;

	useEffect(() => {
		fetchPoints();
	}, []);

	const fetchPoints = async () => {
		try {
			const apiData = await API.graphql({ query: listPoints });
			const pointsFromAPI = apiData.data.listPoints.items;
			setPoints(pointsFromAPI);
			setFilteredPoints(pointsFromAPI);
		} catch (error) {
			console.log(error);
		}
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
		try {
			const res = await API.graphql({
				query: createPointMutation,
				variables: { input: data },
			});
			setFilteredPoints([...filteredPoints, res.data.createPoint]);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};
	const handleEditPoint = async (e, data) => {
		e.preventDefault();

		delete data.createdAt;
		delete data.updatedAt;
		try {
			await API.graphql({
				query: updatePointMutation,
				variables: { input: data },
			});

			const pointsIncludingPointUpdate = points.map((point) =>
				point.id === data.id ? { ...point, ...data } : point
			);

			setPoints(pointsIncludingPointUpdate);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeletePoint = async (id) => {
		try {
			await API.graphql({
				query: deletePointMutation,
				variables: { input: { id } },
			});
			const pointsWithPointDeleted = filteredPoints.filter(
				(point) => point.id !== id
			);
			setFilteredPoints(pointsWithPointDeleted);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Routes>
			<Route
				path='/'
				element={
					<Points
						points={filteredPoints}
						filterPoints={filterPoints}
						checkedFilter={checkedFilter}
						isFilteringActive={isFilteringActive}
					/>
				}
			/>
			<Route
				path='/:id'
				element={
					<Point
						point={point}
						handleDeletePoint={handleDeletePoint}
					/>
				}
			/>
			<Route
				path='/add-point'
				element={<AddPoint handleAddPoint={handleAddPoint} />}
			/>
			<Route
				path='/edit-point/:id'
				element={
					<EditPoint
						editPoint={editPoint}
						handleEditPoint={handleEditPoint}
					/>
				}
			/>
		</Routes>
	);
}

export default App;
