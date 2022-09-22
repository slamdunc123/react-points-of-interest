import { useState } from 'react';
import {Link} from 'react-router-dom'
import {
	GoogleMap,
	LoadScript,
	Marker,
	InfoWindow,
} from '@react-google-maps/api';

import points from '../points';
import Sidebar from '../Sidebar/Sidebar';
import styles from './points.module.css';

const containerStyle = {
	width: '100vw',
	height: '100vh',
};

const center = {
	lat: 53.19495626366442,
	lng: -1.695365906570867,
};

const Points = () => {
	const [activePoint, setActivePoint] = useState(''); // initalise with an empty string to avoit object and uncontrolled component warnings
	const handlePointOnClick = (point) => {
		setActivePoint(point);
	};

	const handlePointOnChange = (e) => {
		setActivePoint(e.target.value);
	};

	return (
		<div className={styles.container}>
			<Sidebar
				points={points}
				activePoint={activePoint}
				handlePointOnChange={handlePointOnChange}
			/>
			<LoadScript googleMapsApiKey=''>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={18}
					mapTypeId='satellite'
					onClick={() => setActivePoint('')} // set to an empty string to avoit object and uncontrolled component warnings
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
								onCloseClick={() => setActivePoint(null)}
							>
								<div className='info-container'>
									<h4>{activePoint.name}</h4>
									<p>{`Built: ${activePoint.yearBuilt}`}</p>
                                    
                                    <Link to={`/${activePoint.id}`}>read more...</Link>
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

export default Points;
