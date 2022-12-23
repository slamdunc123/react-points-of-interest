import { Link } from "react-router-dom";
import styles from "./editPoint.module.css";

const EditPoint = () => {
  return (
    <div className={styles.container}>
      <Link to="/">Home</Link>
      <div>Edit Point Contents</div>
    </div>
  );
};
export default EditPoint;
