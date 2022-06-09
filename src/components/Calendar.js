import ResponsiveAppBar from "./ResponsiveAppBar"
import { useAuth } from "../hooks/useAuth";
import Login from "./Login.js";

function Calendar() {
    const { user } = useAuth(); 

    return user ?

    (
        <div>
        <ResponsiveAppBar />
        <p> Calendar </p>
        </div>
    ) : <Login/>;
}

export default Calendar;