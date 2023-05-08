// @ts-nocheck

import { useEffect, useState } from 'react';
import './App.css';
import Points from './components/Points/Points';
import { API } from 'aws-amplify';
import { Route, Routes, useNavigate, useMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Point from './components/Point/Point';
import AddPoint from './components/AddPoint/AddPoint';
import EditPoint from './components/EditPoint/EditPoint';
import { ALL_POINTS } from './constants/PointTypes';
import {
	createPoint as createPointMutation,
	updatePoint as updatePointMutation,
} from './graphql/mutations';
import {
	deletePoint,
	fetchPoints,
	allPoints,
} from './features/point/pointSlice';

function App() {
	const dispatch = useDispatch();
	const points = useSelector(allPoints);
	const pointStatus = useSelector((state) => state.points.status);

	const [filteredPoints, setFilteredPoints] = useState(points); // these can change on changing filters
	const [checkedFilter, setCheckedFilter] = useState(ALL_POINTS);
	const [isFilteringActive, setIsFilteringActive] = useState(false);

	const navigate = useNavigate();
	const matchPoint = useMatch('/:id');
	const matchEditPoint = useMatch('/edit-point/:id');

	const point = matchPoint
		? points.find((point) => point.id === matchPoint.params.id)
		: null;
	const editPoint = matchEditPoint
		? points.find((point) => point.id === matchEditPoint.params.id)
		: null;

	useEffect(() => {
		if (pointStatus === 'idle') {
			dispatch(fetchPoints());
		}
	}, [pointStatus, dispatch]);

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
			setIsFilteringActive(false);
			dispatch(deletePoint(id));
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
						points={isFilteringActive ? filteredPoints : points}
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
