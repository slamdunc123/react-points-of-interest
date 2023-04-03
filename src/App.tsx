// @ts-nocheck

import { useEffect, useState } from 'react';
import './App.css';
import Points from './components/Points/Points';
import { listPoints } from './graphql/queries';
import { API } from 'aws-amplify';
import { Route, Routes } from 'react-router-dom';
import Point from './components/Point/Point';
import AddPoint from './components/AddPoint/AddPoint';
import EditPoint from './components/EditPoint/EditPoint';
import { ALL_POINTS } from './constants/PointTypes';

function App() {
	const [points, setPoints] = useState([]);
  const [filteredPoints, setFilteredPoints] = useState([])

	useEffect(() => {
		fetchPoints();
	}, []);

	async function fetchPoints() {
		const apiData = await API.graphql({ query: listPoints });
		const pointsFromAPI = apiData.data.listPoints.items;
		setPoints(pointsFromAPI);
		setFilteredPoints(pointsFromAPI);
	}

  const updatePoints = (value) => {
    if (value === ALL_POINTS) {
			setFilteredPoints(points);
		} else {
			const filteredPoints = points.filter(
				(point) => point.type === value
			);
			setFilteredPoints(filteredPoints);
		}
  }
	return (
    <Routes>
      <Route path="/" element={<Points points={filteredPoints} updatePoints={updatePoints}/>} />
      {/* <Route path='/map-test' element={<ProtectedRoute component={MapTest} />} /> */}
      <Route path="/:id" element={<Point points={points}/>} />
      <Route path="/add-point" element={<AddPoint />} />
      <Route path="/edit-point/:id" element={<EditPoint />} />
    </Routes>
	);
}

export default App;
