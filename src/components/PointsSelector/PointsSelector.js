import styles from "./pointsSelector.module.css";

const PointsSelector = ({ points, activePoint, handlePointOnChange }) => {
  console.log("🚀 ~ PointsSelector ~ points", points)
  return (
    <div className={styles.container}>
      <select
        id="demo-simple-select-label"
        onChange={handlePointOnChange}
        value={activePoint.id}
      >
        <option>Select</option>
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
