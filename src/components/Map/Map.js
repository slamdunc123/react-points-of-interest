import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

import {
	GoogleMap,
	LoadScript,
	Marker,
	InfoWindow,
} from '@react-google-maps/api';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

const MAP_API = process.env.REACT_APP_MAP_API;

const containerStyleSidebarOpen = {
	width: 'calc(100vw - 270px)',
	height: 'calc(100vh - 64px)',
};

const containerStyleSidebarClosed = {
	width: '100vw',
	height: 'calc(100vh - 64px)',
};

const center = {
	lat: 53.19455626366442,
	lng: -1.695365906570867,
};

const zoom = 17;

const Map = ({
	points,
	activePoint,
	isSidebarOpen,
	handlePointOnClick,
	handleSidebarOnClick,
}) => {
	return (
		<div>
			<Navbar
				isSidebarOpen={isSidebarOpen}
				handleSidebarOnClick={handleSidebarOnClick}
			/>
			<LoadScript googleMapsApiKey={MAP_API}>
				<GoogleMap
					mapContainerStyle={
						isSidebarOpen
							? containerStyleSidebarOpen
							: containerStyleSidebarClosed
					}
					center={center}
					zoom={zoom}
					mapTypeId='satellite'
					onClick={() => handlePointOnClick('')} // set to an empty string to avoid object and uncontrolled component warnings
				>
					<>
						{points
							? points.map((point) => (
									<Marker
										position={{
											lat: point.lat,
											lng: point.lng,
										}}
										onClick={() =>
											handlePointOnClick(point)
										}
										key={point.id}
									/>
							  ))
							: 'Loading...'}
						{activePoint ? (
							<InfoWindow
								position={{
									lat: activePoint.lat,
									lng: activePoint.lng,
								}}
								onCloseClick={() => handlePointOnClick('')}
							>
								<div className='info-container'>
									<h4>{activePoint.name}</h4>
									<p>{`Built: ${activePoint.yearBuilt}`}</p>

									<IconButton
										component={Link}
										to={`/${activePoint.id}`}
										color='primary'
										size='small'
									>
										<InfoIcon />
									</IconButton>
								</div>
							</InfoWindow>
						) : (
							<></>
						)}
					</>
				</GoogleMap>
			</LoadScript>
		</div>
	);
};

export default Map;
