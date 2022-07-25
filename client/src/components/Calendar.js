import React from "react";
import ReactDOM from "react-dom";
import ResponsiveAppBar from "./ResponsiveAppBar"
import { useAuth } from "../hooks/useAuth";
import Login from "./Login.js";
import Calendar1 from "react-calendar";
import App from "./calendar/calendarApp";
import ContextWrapper from "./calendar/context/ContextWrapper"
import "../index.css";
import EmailVerification from "./EmailVerification";

function Calendar() {
    const { user } = useAuth(); 

    if (user) {
      // getToken();
      if (user.emailVerified) {
        return (
          <div>
              <ResponsiveAppBar />
              
              <ContextWrapper>
                <App />
              </ContextWrapper>
          
          </div>
      )
      } else {
        return <EmailVerification />
      }
      
  } else {
      return <Login />;
  }
}

export default Calendar;