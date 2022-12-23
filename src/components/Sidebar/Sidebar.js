import { useState } from "react";
import PointsFilters from "../PointsFilter/PointsFilter";
import PointsSelector from "../PointsSelector/PointsSelector";
import styles from "./sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar = ({
  points,
  activePoint,
  handlePointOnChange,
  handleFilterOnChange,
  isCheckedFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles[isOpen ? "container-open" : "container-closed"]}>
      <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "<" : ">"}</button>
      {isOpen && (
        <>
          <Link to="/add-point">Add Point</Link>
          <PointsFilters
            handleFilterOnChange={handleFilterOnChange}
            isCheckedFilter={isCheckedFilter}
          />
          <PointsSelector
            points={points}
            activePoint={activePoint}
            handlePointOnChange={handlePointOnChange}
          />
        </>
      )}
    </div>
  );
};

export default Sidebar;
