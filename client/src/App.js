import { useAuth } from "./hooks/useAuth";
import Login from "./components/Login.js";
import {Outlet} from "react-router-dom";
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { ProvideAuth } from "./hooks/useAuth";
import Home from './components/Home';
import Calendar from './components/Calendar';

function App() {
  const { user } = useAuth(); 
  return (
      <div>
      {user ? <Calendar /> : <Login />}
      </div>
  );
}

export default App;
