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

    if (user) {
      // getToken();
      return (
          <div>
              <ResponsiveAppBar />
              
              <ContextWrapper>
                <App />
              </ContextWrapper>
          
          </div>
      )
  } else {
      return <Login />;
  }
}

export default Calendar;