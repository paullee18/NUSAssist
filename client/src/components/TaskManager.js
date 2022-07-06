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
                <div className="col-7 text-end">
                    TO DO LIST
                </div>
                <Todo uid={uid}/>
            
            </div>
        )
    } else {
        return <Login />;
    }

}

export default TaskManager;