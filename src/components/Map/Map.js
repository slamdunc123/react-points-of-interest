import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

import {
	GoogleMap,
	Marker,
	InfoWindow,
	DrawingManager,
} from '@react-google-maps/api';
import { Circle } from '@react-google-maps/api';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Image from 'mui-image';
import { API } from 'aws-amplify';
import { getMap } from '../../graphql/queries';
import { drawMarker } from '../../features/point/pointSlice';
import { useDispatch } from 'react-redux';
import { useAuthenticator } from '@aws-amplify/ui-react';

const containerStyleSidebarOpen = {
	width: 'calc(100vw - 270px)',
	height: 'calc(100vh - 64px)',
};

const containerStyleSidebarClosed = {
	width: '100vw',
	height: 'calc(100vh - 64px)',
};

const Map = ({
	drawingManagerOptions,
	points,
	activePoint,
	isSidebarOpen,
	handlePointOnClick,
	handleSidebarOnClick,
	isLoaded,
	mapId,
}) => {
	const [currentMap, setCurrentMap] = useState();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useAuthenticator((context) => [context.user]);

	const fetchMap = useCallback(async () => {
		try {
			const apiData = await API.graphql({
				query: getMap,
				variables: { id: mapId },
			});
			const mapData = apiData.data.getMap;
			setCurrentMap(mapData);
		} catch (error) {
			navigate('/');
		}
	}, [mapId, navigate]);

	const handleDrawNewMarker = (marker) => {
		const markerPosition = marker.getPosition();
		const markerLat = markerPosition.lat();
		const markerLng = markerPosition.lng();

		const drawnMarkerPosition = {
			lat: markerLat,
			lng: markerLng,
		};
		dispatch(drawMarker(drawnMarkerPosition));
		navigate('/add-point');
	};

	useEffect(() => {
		fetchMap();
	}, [fetchMap]);

	return isLoaded ? (
		<div>
			<Navbar
				isSidebarOpen={isSidebarOpen}
				handleSidebarOnClick={handleSidebarOnClick}
				mapName={currentMap && currentMap.name}
			/>
			{currentMap && (
				<GoogleMap
					mapContainerStyle={
						isSidebarOpen
							? containerStyleSidebarOpen
							: containerStyleSidebarClosed
					}
					center={currentMap.center}
					zoom={currentMap.zoom}
					mapTypeId='satellite'
					onClick={() => handlePointOnClick('')} // set to an empty string to avoid object and uncontrolled component warnings
				>
					<>
						{user && (
							<DrawingManager
								options={{
									drawingControl: true,
									drawingControlOptions: {
										position:
											window.google.maps.ControlPosition
												.RIGHT_BOTTOM,
										drawingModes: [
											window.google.maps.drawing
												.OverlayType.MARKER,
										],
									},
								}}
								onMarkerComplete={handleDrawNewMarker}
							/>
						)}
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
									{activePoint.image && (
										<Image
											src={activePoint.image}
											alt={`visual aid for ${activePoint.name}`}
											style={{ width: 100 }}
											duration={0}
										/>
									)}
									<IconButton
										component={Link}
										to={`/point/${activePoint.id}`}
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
					<Circle
						center={currentMap.center}
						options={currentMap.circleOptions}
					/>
				</GoogleMap>
			)}
		</div>
	) : (
		<></>
	);
};

export default Map;
