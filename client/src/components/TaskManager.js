import ResponsiveAppBar from "./ResponsiveAppBar"
import { useAuth } from "../hooks/useAuth";
import Login from "./Login.js";
import React from 'react';
import ReactDOM from 'react-dom';
import Todo from "./task_manager/TaskMan";

function TaskManager() {
    const { user } = useAuth(); 

    return user ?
    (
        <div>
            <ResponsiveAppBar />
            <h2>
                TO DO LIST
            </h2>
                <Todo />
            
        </div>

    ) : <Login />;
}

export default TaskManager;