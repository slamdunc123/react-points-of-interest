import { Link } from 'react-router-dom';

import {
	GoogleMap,
	LoadScript,
	Marker,
	InfoWindow,
} from '@react-google-maps/api';

const MAP_API = process.env.REACT_APP_MAP_API;

const containerStyle = {
	width: '100vw',
	height: '100vh',
};

const center = {
	lat: 53.19495626366442,
	lng: -1.695365906570867,
};

const Map = ({ points, activePoint, handlePointOnClick }) => {
	return (
		<LoadScript googleMapsApiKey={MAP_API}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={18}
				mapTypeId='satellite'
				onClick={() => handlePointOnClick('')} // set to an empty string to avoid object and uncontrolled component warnings
			>
				<>
					{points.map((point) => (
						<Marker
							position={{
								lat: point.lat,
								lng: point.lng,
							}}
							onClick={() => handlePointOnClick(point)}
							key={point.id}
						/>
					))}
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

								<Link to={`/${activePoint.id}`}>
									read more...
								</Link>
							</div>
						</InfoWindow>
					) : (
						<></>
					)}
				</>
			</GoogleMap>
		</LoadScript>
	);
};

export default Map;
