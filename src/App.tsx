// @ts-nocheck

import { useEffect, useState } from 'react';
import './App.css';
import Points from './components/Points/Points';
import { listPoints } from './graphql/queries';
import { API } from 'aws-amplify';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Point from './components/Point/Point';
import AddPoint from './components/AddPoint/AddPoint';
import EditPoint from './components/EditPoint/EditPoint';
import { ALL_POINTS } from './constants/PointTypes';
import {
	createPoint as createPointMutation,
	deletePoint as deletePointMutation,
} from './graphql/mutations';

function App() {
	const [points, setPoints] = useState([]);
	const [filteredPoints, setFilteredPoints] = useState([]);
	const [checkedFilter, setCheckedFilter] = useState(ALL_POINTS);
	const [isFilteringActive, setIsFilteringActive] = useState(false);
	const [activePoint, setActivePoint] = useState<any>({});

	const navigate = useNavigate();

	useEffect(() => {
		fetchPoints();
	}, []);
	const getActivePoint = (id) => {
		const point = points.find((point: any) => point.id === id);
		if (!point) {
			navigate('/');
		} else setActivePoint(point);
	};

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
		if (value === ALL_POINTS) {
			setFilteredPoints(points);
			setCheckedFilter(ALL_POINTS);
		} else {
			const filteredPoints = points.filter(
				(point) => point.type === value
			);
			setFilteredPoints(filteredPoints);
			setCheckedFilter(value);
		}
	};

	const handleAddPoint = async (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const data = {
			name: form.get('name'),
			lat: form.get('lat'),
			lng: form.get('lng'),
			type: form.get('type'),
			yearBuilt: form.get('yearBuilt'),
			url: form.get('url'),
		};
		try {
			await API.graphql({
				query: createPointMutation,
				variables: { input: data },
			});
			navigate('/');
			fetchPoints();
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
			navigate('/');
			fetchPoints();
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
						setIsFilteringActive={setIsFilteringActive}
					/>
				}
			/>
			{/* <Route path='/map-test' element={<ProtectedRoute component={MapTest} />} /> */}
			<Route
				path='/:id'
				element={
					<Point
						point={activePoint}
						handleDeletePoint={handleDeletePoint}
						getActivePoint={getActivePoint}
					/>
				}
			/>
			<Route
				path='/add-point'
				element={<AddPoint handleAddPoint={handleAddPoint} />}
			/>
			<Route path='/edit-point/:id' element={<EditPoint />} />
		</Routes>
	);
}

export default App;
