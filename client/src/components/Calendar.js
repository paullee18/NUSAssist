import React from "react";
import ReactDOM from "react-dom";
import ResponsiveAppBar from "./ResponsiveAppBar"
import { useAuth } from "../hooks/useAuth";
import Login from "./Login.js";
import Calendar1 from "react-calendar";
import App from "./calendar/calendarApp";
import ContextWrapper from "./calendar/context/ContextWrapper"
import "../index.css";

function Calendar() {
    const { user } = useAuth(); 

    return user ?

    (
        // <div>
        // <ResponsiveAppBar />
        // <p> calendar </p>
        // </div>
        ReactDOM.render(
            <React.StrictMode>
              <ContextWrapper>
                <App />
              </ContextWrapper>
            </React.StrictMode>,
            document.getElementById("root")
          )
    ) : <Login/>;
}

export default Calendar;