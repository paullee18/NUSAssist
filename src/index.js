import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,
         Routes,
         Route, } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import Calendar from './components/Calendar'
import TaskManager from './components/TaskManager'
import ResponsiveAppBar from './components/ResponsiveAppBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <CssBaseline />
  <BrowserRouter>
  <ResponsiveAppBar />
    <Routes>
          <Route path="/" element={<App />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="task-manager" element={<TaskManager />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
