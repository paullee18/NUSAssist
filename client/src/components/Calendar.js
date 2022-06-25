import ResponsiveAppBar from "./ResponsiveAppBar"
import { useAuth } from "../hooks/useAuth";
import Login from "./Login.js";
import Calendar1 from "react-calendar";

function Calendar() {
    const { user } = useAuth(); 

    return user ?

    (
        <div>
        <ResponsiveAppBar />
        <p> <Calendar1 /> </p>
        </div>
    ) : <Login/>;
}

export default Calendar;