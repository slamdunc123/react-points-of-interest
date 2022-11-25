import { useState } from 'react';

import points from '../points';
import Sidebar from '../Sidebar/Sidebar';
import Sidebar2 from '../Sidebar/Sidebar2';
import Map from '../Map/Map';
import styles from './points.module.css';

const Points = () => {
	const [activePoint, setActivePoint] = useState(''); // initalise with an empty string to avoid object and uncontrolled component warnings

	const handlePointOnClick = (point) => {
		console.log("🚀 ~ handlePointOnClick ~ point", point)
		setActivePoint(point);
	};

	const handlePointOnChange = (e) => {
		console.log(e.target.value)
		const activePointObj = points.find(point => point.id === e.target.value)
		
		setActivePoint(activePointObj);
	};

	return (
		<div className={styles.container}>
			<Sidebar
				points={points}
				activePoint={activePoint}
				handlePointOnChange={handlePointOnChange}
			/>
			<Sidebar2
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
