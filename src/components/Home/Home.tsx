// @ts-nocheck

import React, { useState, useEffect } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';
import { listMaps } from '../../graphql/queries';

type HomePropsType = {
	mapId: string;
	handleMapOnChange: () => void;
}

const Home = ({ mapId, handleMapOnChange }: HomePropsType) => {
	const [maps, setMaps] = useState([]);
	const navigate = useNavigate();

	const fetchMaps = async () => {
		const apiData = await API.graphql({ query: listMaps });
		const mapsFromAPI = apiData.data.listMaps.items;
		setMaps(mapsFromAPI);
	};

	useEffect(() => {
		fetchMaps();
	}, []);

	const handleOnClick = () => {
		navigate(`/maps/${mapId}`);
	};
	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{maps.length ? (
				<>
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<InputLabel id='demo-simple-select-helper-label'>
							Maps
						</InputLabel>
						<Select
							labelId='demo-simple-select-helper-label'
							id='demo-simple-select-helper'
							value={mapId}
							label='Maps'
							onChange={handleMapOnChange}
						>
							{maps.map((item) => (
								<MenuItem key={item.id} value={item.id}>
									{item.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Button onClick={handleOnClick} variant='outlined'>
						Go
					</Button>
				</>
			) : (
				<CircularProgress />
			)}
		</Box>
	);
};

export default Home;
