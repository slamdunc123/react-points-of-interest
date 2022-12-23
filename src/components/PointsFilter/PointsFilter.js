
import React from 'react'
import styles from './pointsFilter.module.css'
const PointsFilters = ({ handleFilterOnChange, isCheckedFilter }) => {
  return (
    <div className={styles.container} >
      <div>
        <input type="radio" value="all" name="type" onChange={handleFilterOnChange} checked={isCheckedFilter === 'all'}/> all
      </div>
      <div>
        <input type="radio" value="religious" name="type" onChange={handleFilterOnChange} checked={isCheckedFilter === 'religious'}/> religious
      </div>
      <div>
        <input type="radio" value="hospitality" name="type" onChange={handleFilterOnChange} checked={isCheckedFilter === 'hospitality'}/> hospitality
      </div>
      <div>
        <input type="radio" value="community" name="type" onChange={handleFilterOnChange} checked={isCheckedFilter === 'community'}/> community
      </div>
    </div>
  );
};
export default PointsFilters;
