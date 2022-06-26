import ResponsiveAppBar from "./ResponsiveAppBar"
import { useAuth } from "../hooks/useAuth";
import Login from "./Login.js";
import React from 'react';
import ReactDOM from 'react-dom';
import Todo from "./task_manager/TaskMan";

function TaskManager() {
    const { user } = useAuth(); 

    if (user) {
        const uid = user.uid;
        
        return (
            <div>
                <ResponsiveAppBar />
                <h2>
                    TO DO LIST
                </h2>
                <Todo uid={uid}/>
            
            </div>
        )
    } else {
        return <Login />;
    }

}

export default TaskManager;