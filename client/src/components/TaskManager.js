import ResponsiveAppBar from "./ResponsiveAppBar"
import { useAuth } from "../hooks/useAuth";
import Login from "./Login.js";
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Todo from "./task_manager/TaskMan";
import Box from '@mui/material/Box';


function TaskManager() {
    const { user } = useAuth(); 
    // const [token, setToken] = useState();

    // const getToken = async () => {
    //     const tok = user && await user.getIdToken();
    //     setToken(tok);
    // };

    // useEffect(() => {
    //     if (user) {
    //         getToken();
    //     };
    // }, [user]);

    if (user) {
        // getToken();
        const uid = user.uid;
        return (
            <div>
                <ResponsiveAppBar />
                <Box pt={2} display='flex' justifyContent="center" alignItems="center">
                <h4 className="font-link"><b>
                    Task Manager
                </b></h4>
                </Box>
                <Todo uid={uid} tokenPromise={user.getIdToken()}/>
            
            </div>
        )
    } else {
        return <Login />;
    }

}

export default TaskManager;