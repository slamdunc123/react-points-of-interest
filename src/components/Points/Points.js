import { useState } from 'react';

import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';

import points from '../../points';
import { ALL_POINTS } from '../../constants/PointTypes';

import styles from './points.module.css';

const Points = () => {
  const [filteredSetOfPoints, setFilteredSetOfPoints] = useState(points);
  const [isCheckedFilter, setIsCheckedFilter] = useState('all');
  const [activePoint, setActivePoint] = useState(''); // initalise with an empty string to avoid object and uncontrolled component warnings

  const handlePointOnClick = (point) => {
    setActivePoint(point);
  };

  const handlePointOnChange = (e) => {
    const activePointObj = points.find((point) => point.id === e.target.value);
    setActivePoint(activePointObj);
  };

  const handleFilterOnChange = (e) => {
    const value = e.target.value;
    setIsCheckedFilter(value);
    setActivePoint('');
    if (value === ALL_POINTS) {
      setFilteredSetOfPoints(points);
    } else {
      const filteredPoints = points.filter(
        (point) => point.type === value
      );
      setFilteredSetOfPoints(filteredPoints);
	  filteredPoints.length === 1 && setActivePoint(filteredPoints[0])
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar
        handleFilterOnChange={handleFilterOnChange}
        points={filteredSetOfPoints}
        activePoint={activePoint}
        handlePointOnChange={handlePointOnChange}
        isCheckedFilter={isCheckedFilter}
      />

      <Map
        points={filteredSetOfPoints}
        activePoint={activePoint}
        handlePointOnClick={handlePointOnClick}
      />
    </div>
  );
};

export default Points;
