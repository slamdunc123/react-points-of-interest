import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Circle } from '@react-google-maps/api';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { mapConfig } from '../../config/MapConfig';

const { center, circleOptions, zoom } = mapConfig;

const containerStyleSidebarOpen = {
	width: 'calc(100vw - 270px)',
	height: 'calc(100vh - 64px)',
};

const containerStyleSidebarClosed = {
	width: '100vw',
	height: 'calc(100vh - 64px)',
};

const Map = ({
	points,
	activePoint,
	isSidebarOpen,
	handlePointOnClick,
	handleSidebarOnClick,
	isLoaded,
}) => {
	return isLoaded ? (
		<div>
			<Navbar
				isSidebarOpen={isSidebarOpen}
				handleSidebarOnClick={handleSidebarOnClick}
			/>
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
						? points.map((point) => {
								return (
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
								);
						  })
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
									to={`/points/${activePoint.id}`}
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
				<Circle center={center} options={circleOptions} />
			</GoogleMap>
		</div>
	) : (
		<></>
	);
};

export default Map;
