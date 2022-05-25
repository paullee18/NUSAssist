import './App.css';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navigation from "./components/Navigation"
import Calendar from "./components/Calendar"
import Footer  from "./components/Footer"
import TaskManager from "./components/TaskManager"
import Home from "./components/Home"


function App() {
  return (
    <div>
    ReactDOM.render(
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/task-manager" element={<TaskManager />} />
        </Routes>
        <Footer />
      </Router>


    );
    </div>
  );
}

export default App;
