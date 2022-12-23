import PointsFilters from "../PointsFilter/PointsFilter";
import PointsSelector from "../PointsSelector/PointsSelector";
import styles from "./sidebar.module.css";
import {Link} from 'react-router-dom'

const Sidebar = ({
  points,
  activePoint,
  handlePointOnChange,
  handleFilterOnChange,
  isCheckedFilter
}) => {
  return (
    <div className={styles.container}>
		<Link to='/add-point'>Add Point</Link>
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
