import ResponsiveAppBar from "./ResponsiveAppBar"
import { useAuth } from "../hooks/useAuth";
import Login from "./Login.js";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './task-manager/components/wrappers/App';

// Add bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// Add our style
import './task-manager/assets/style/index.css';



function TaskManager() {
    const { user } = useAuth(); 

    return user ?
    (
        ReactDOM.render(
            <App/>,
            document.getElementById('root')
        )
    ) : <Login />;
}

export default TaskManager;