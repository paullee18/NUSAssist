import ResponsiveAppBar from "./ResponsiveAppBar"
import { useAuth } from "../hooks/useAuth";
import Login from "./Login.js";
import React from 'react';
import ReactDOM from 'react-dom';
import Todo from "./task_manager/TaskMan";
import Box from '@mui/material/Box';


function TaskManager() {
    const { user } = useAuth(); 

    if (user) {
        const uid = user.uid;
        
        return (
            <div>
                <ResponsiveAppBar />
                <Box pt={2}>
                <h2 className="font-link">
                    TO DO LIST
                </h2>
                </Box>
                <Todo uid={uid}/>
            
            </div>
        )
    } else {
        return <Login />;
    }

}

export default TaskManager;