import React from "react";
import styles from "./sidebar.module.css";
// import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';

const Sidebar2 = ({ points, activePoint, handlePointOnChange }) => {
  console.log("🚀 ~ Sidebar2 ~ activePoint", activePoint)
  console.log("🚀 ~ Sidebar2 ~ points", points)
  return (
    <div className={styles.container}>
      <label id='demo-simple-select-label'>Points Of Interest</label>

      <select id='demo-simple-select-label' onChange={handlePointOnChange} value={activePoint.id}>
      {points.map((point) => (
							<option key={point.id} value={point.id}>
            
								{point.name}
							</option>
						))}
     
      </select>
    </div>
  );
};

export default Sidebar2;
