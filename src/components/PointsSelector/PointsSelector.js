import styles from './pointsSelector.module.css'

const PointsSelector = ({ points, activePoint, handlePointOnChange }) => {
  return (
    <div className={styles.container}>

    <select
      id="demo-simple-select-label"
      onChange={handlePointOnChange}
      value={activePoint.id}
      >
      {points.map((point) => (
        <option key={point.id} value={point.id}>
          {point.name}
        </option>
      ))}
    </select>
      </div>
  );
};

export default PointsSelector;
