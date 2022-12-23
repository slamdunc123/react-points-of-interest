import PointsFilters from "../PointsFilter/PointsFilter";
import PointsSelector from "../PointsSelector/PointsSelector";
import styles from "./sidebar.module.css";

const Sidebar = ({
  points,
  activePoint,
  handlePointOnChange,
  handleFilterOnChange,
  isCheckedFilter
}) => {
  return (
    <div className={styles.container}>
      <PointsFilters handleFilterOnChange={handleFilterOnChange} isCheckedFilter={isCheckedFilter}/>
      <PointsSelector
        points={points}
        activePoint={activePoint}
        handlePointOnChange={handlePointOnChange}
      />
    </div>
  );
};

export default Sidebar;
