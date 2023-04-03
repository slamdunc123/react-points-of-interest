import ReactDOM from 'react-dom/client';
import "./index.css";
import App from "./App";
import Point from "./components/Point/Point";
import AddPoint from "./components/AddPoint/AddPoint";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditPoint from "./components/EditPoint/EditPoint";
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      {/* <Route path='/map-test' element={<ProtectedRoute component={MapTest} />} /> */}
      <Route path="/:id" element={<Point />} />
      <Route path="/add-point" element={<AddPoint />} />
      <Route path="/edit-point/:id" element={<EditPoint />} />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
