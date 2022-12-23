import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Point from "./components/Point/Point";
import AddPoint from "./components/AddPoint/AddPoint";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditPoint from "./components/EditPoint/EditPoint";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      {/* <Route path='/map-test' element={<ProtectedRoute component={MapTest} />} /> */}
      <Route path="/:id" element={<Point />} />
      <Route path="/add-point" element={<AddPoint />} />
      <Route path="/edit-point" element={<EditPoint />} />
    </Routes>
  </Router>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
