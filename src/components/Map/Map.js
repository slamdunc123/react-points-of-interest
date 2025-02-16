import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { drawMarker } from '../../features/point/pointSlice';

import {
	GoogleMap,
	Marker,
	InfoWindow,
	DrawingManager,
	Circle,
	Polygon,
} from '@react-google-maps/api';

import Navbar from '../Navbar/Navbar';
import AlertDialog from '../AlertDialog/AlertDialog';

import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Image from 'mui-image';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';

import './style.css';
import PointsDataGrid from '../PointsDataGrid/PointsDataGrid';

const containerStyles = {
	width: '100%',
	height: 'calc(100vh - 64px)',
};

const Map = ({
	points,
	activePoint,
	isSidebarOpen,
	handlePointOnClick,
	handleSidebarOnClick,
	handleGridRowOnClick,
	isLoaded,
	checkPointIsInCircle,
	isUserAuthenticatedForCurrentMap,
	isMapView,
	currentMap,
}) => {
	const [formErrorMessage, setFormErrorMessage] = useState('');
	const [alertDialogOpen, setAlertDialogOpen] = useState(false);
	const [isDrawing, setIsDrawing] = useState(false);
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

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

	const polygonOptions = {
		paths: [
			{ lat: 53.19548324574248, lng: -1.703326734860213 },
			{ lat: 53.196183280091034, lng: -1.700554889120726 },
			{ lat: 53.19655352383373, lng: -1.6985634708146748 },
			{ lat: 53.196561751436136, lng: -1.697746302613226 },
			{ lat: 53.19796042092766, lng: -1.6942166852826885 },
			{ lat: 53.19798098925566, lng: -1.6926098167184955 },
			{ lat: 53.19669133600033, lng: -1.6889222593724624 },
			{ lat: 53.19637868694384, lng: -1.6872879229695652 },
			{ lat: 53.19570820778826, lng: -1.6872334808891056 },
			{ lat: 53.19398617075371, lng: -1.6895448701560243 },
			{ lat: 53.19395801993666, lng: -1.6915496870941886 },
			{ lat: 53.19322609217482, lng: -1.6951442612371943 },
			{ lat: 53.191846655945845, lng: -1.6970629336975467 },
			{ lat: 53.19183031434909, lng: -1.6990761354261117 },
			{ lat: 53.19317448141444, lng: -1.6991617264296872 },
			{ lat: 53.19480060243176, lng: -1.7032961470115195 },
			{ lat: 53.19548324574248, lng: -1.703326734860213 },
		],
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.35,
	};

	const checkPointIsInPolygon = (e) => {
		const bermudaTriangle = new window.google.maps.Polygon({
			paths: polygonOptions.paths,
		});

		const isInPolyon = window.google.maps.geometry.poly.containsLocation(
			e.latLng,
			bermudaTriangle
		);
		isInPolyon ? console.log('yes') : console.log('no');
	};

	return isLoaded ? (
		<Box
			style={{
				overflow: 'hidden',
				width: isSidebarOpen ? 'calc(100vw - 300px)' : '100vw',
			}}
		>
			<Snackbar
				open={isSnackbarOpen}
				autoHideDuration={2000}
				onClose={() => setIsSnackbarOpen(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert severity='success'>
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
				isUserAuthenticatedForCurrentMap={
					isUserAuthenticatedForCurrentMap
				}
				isMapView={isMapView}
			/>
			{isMapView ? (
				<GoogleMap
					mapContainerStyle={containerStyles}
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
					<Polygon
						center={{
							lat: 53.195191701761956,
							lng: -1.6946127139894789,
						}}
						options={polygonOptions}
						onClick={(e) =>
							checkPointIsInPolygon(e)
						}
					/>
				</GoogleMap>
			) : (
				<PointsDataGrid
					containerStyle={containerStyles}
					points={points}
					handleGridRowOnClick={handleGridRowOnClick}
				/>
			)}
		</Box>
	) : (
		<></>
	);
};

export default Map;
