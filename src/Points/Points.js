import { useState } from 'react';

import points from '../points';
import Sidebar from '../Sidebar/Sidebar';
import Map from '../Map/Map';
import styles from './points.module.css';

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
			<Map
				points={points}
				activePoint={activePoint}
				handlePointOnClick={handlePointOnClick}
			/>
		</div>
	);
};

export default Points;
