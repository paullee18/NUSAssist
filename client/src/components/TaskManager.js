import ResponsiveAppBar from "./ResponsiveAppBar"
import { useAuth } from "../hooks/useAuth";
import Login from "./Login.js";
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Todo from "./task_manager/TaskMan";
import Box from '@mui/material/Box';
import EmailVerification from "./EmailVerification";


function TaskManager() {
    const { user } = useAuth(); 

    if (user) {
        // getToken();
        const uid = user.uid;
        if (user.emailVerified) {
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
            return <EmailVerification />
        }
            
    } else {
        return <Login />;
    }

}

export default TaskManager;