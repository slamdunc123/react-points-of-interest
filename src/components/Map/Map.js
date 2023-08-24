import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { API } from 'aws-amplify';
import { getMap } from '../../graphql/queries';
import { drawMarker } from '../../features/point/pointSlice';

import {
	GoogleMap,
	Marker,
	InfoWindow,
	DrawingManager,
	Circle,
} from '@react-google-maps/api';

import Navbar from '../Navbar/Navbar';
import AlertDialog from '../AlertDialog/AlertDialog';

import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Image from 'mui-image';

import './style.css';
import { Alert, Snackbar } from '@mui/material';

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
	mapId,
	checkPointIsInCircle,
  isUserAuthenticatedForCurrentMap
}) => {
	const [currentMap, setCurrentMap] = useState();
	const [formErrorMessage, setFormErrorMessage] = useState('');
	const [alertDialogOpen, setAlertDialogOpen] = useState(false);
	const [isDrawing, setIsDrawing] = useState(false);
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();


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

	const handleOnMarkerComplete = (e) => {
		const markerPosition = e.getPosition();
		const markerLat = markerPosition.lat();
		const markerLng = markerPosition.lng();

		const drawnMarkerPosition = {
			lat: markerLat,
			lng: markerLng,
		};

		const isPointInCirle = checkPointIsInCircle(markerLat, markerLng);

		if (!isPointInCirle) {
			e.setMap(null);
			setAlertDialogOpen(true);
			setFormErrorMessage('Point needs to be within permitted boundary');
			return;
		}
		dispatch(drawMarker(drawnMarkerPosition));
		navigate('/add-point');
	};

	const handleAlertDialogClose = () => {
		setAlertDialogOpen(false);
	};

	const handleDrawMarkerOnClick = () => {
		if (!isDrawing) {
			document.querySelector('[title="Add a marker"]').click();
			setIsDrawing(true);
			setIsSnackbarOpen(true);
		} else {
			document.querySelector('[title="Stop drawing"]').click();
			setIsDrawing(false);
			setIsSnackbarOpen(true);
		}
	};

	useEffect(() => {
		fetchMap();
	}, [fetchMap]);

	return isLoaded ? (
		<div>
			<Snackbar
				open={isSnackbarOpen}
				autoHideDuration={4000}
				onClose={() => setIsSnackbarOpen(false)}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
			>
				<Alert severity='success' >
					{isDrawing
						? 'Add Marker Turned On'
						: 'Add Marker Turned Off'}
				</Alert>
			</Snackbar>
			<Navbar
				isSidebarOpen={isSidebarOpen}
				handleSidebarOnClick={handleSidebarOnClick}
				mapName={currentMap && currentMap.name}
				handleDrawMarkerOnClick={handleDrawMarkerOnClick}
				isDrawing={isDrawing}
        isUserAuthenticatedForCurrentMap={isUserAuthenticatedForCurrentMap}
        
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
					<AlertDialog
						description={formErrorMessage}
						alertDialogOpen={alertDialogOpen}
						handleAlertDialogClose={handleAlertDialogClose}
					/>
					<>
						{isUserAuthenticatedForCurrentMap && (
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
								onMarkerComplete={handleOnMarkerComplete}
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
