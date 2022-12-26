import { useState } from "react";

import { Link } from "react-router-dom";
import styles from "./addPoint.module.css";

const AddPoint = () => {
  const initialFormData = {
    lat: "",
    lng: "",
    name: "",
    type: "",
    yearBuilt: "",
    url: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleOnChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmitAddPoint = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    setFormData(initialFormData);
  };
  return (
    <div className={styles.container}>
      <Link to="/">Home</Link>
      <div>Add Point Contents</div>
      <form onSubmit={handleOnSubmitAddPoint} className={styles.form}>
        <label>
          Lat
          <input
            type="text"
            name="lat"
            value={formData.lat}
            onChange={handleOnChange}
          />
        </label>
        <label>
          Long
          <input
            type="text"
            name="lng"
            value={formData.lng}
            onChange={handleOnChange}
          />
        </label>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleOnChange}
          />
        </label>
        <label>
          Type
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleOnChange}
          />
        </label>
        <label>
          Year Built
          <input
            type="text"
            name="yearBuilt"
            value={formData.yearBuilt}
            onChange={handleOnChange}
          />
        </label>
        <label>
          URL
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleOnChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
export default AddPoint;
