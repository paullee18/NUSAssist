import './App.css';
import { useAuth } from "./hooks/useAuth";
import Login from "./components/Login.js";
import {Outlet} from "react-router-dom";
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { ProvideAuth } from "./hooks/useAuth";
import Home from './components/Home';

function App() {
  const { user } = useAuth(); 
  return (
      <div>
      <ResponsiveAppBar />
      <Outlet />
      {user ? <Home /> : <Login />}
      </div>
  );
}

export default App;
