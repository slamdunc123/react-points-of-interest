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

function App() {
	const [points, setPoints] = useState([]);

	useEffect(() => {
		fetchPoints();
	}, []);

	async function fetchPoints() {
		const apiData = await API.graphql({ query: listPoints });
		const pointsFromAPI = apiData.data.listPoints.items;
		setPoints(pointsFromAPI);
	}
	return (
    <Routes>
      <Route path="/" element={<Points points={points} setPoints={setPoints}/>} />
      {/* <Route path='/map-test' element={<ProtectedRoute component={MapTest} />} /> */}
      <Route path="/:id" element={<Point points={points}/>} />
      <Route path="/add-point" element={<AddPoint />} />
      <Route path="/edit-point/:id" element={<EditPoint />} />
    </Routes>
	);
}

export default App;
