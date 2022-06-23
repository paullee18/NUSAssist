import ResponsiveAppBar from "./ResponsiveAppBar"
import { useAuth } from "../hooks/useAuth";
import Login from "./Login.js";
import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from "./task_manager/TaskApp";

function TaskManager() {
    const { user } = useAuth(); 

    return user ?
    (
        <div>
            <ResponsiveAppBar />
            <p>
                <TodoApp />
            </p>
        </div>
        // ReactDOM.render(<TodoApp />, document.getElementById('root'))
        
        // <TodoApp/>
    ) : <Login />;
}

export default TaskManager;