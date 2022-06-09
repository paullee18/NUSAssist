import ResponsiveAppBar from "./ResponsiveAppBar"
import { useAuth } from "../hooks/useAuth";
import Login from "./Login.js";

function TaskManager() {
    const { user } = useAuth(); 

    return user ?
    (
        <div>
        <ResponsiveAppBar />
        <p> Task Manager </p>
        </div>
    ) : <Login />;
}

export default TaskManager;