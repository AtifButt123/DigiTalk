import './App.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfilePage from './components/ProfilePage/ProfilePage';
import Navbar from './components/Navbar/Navbar';
import Notification from './components/Notification/Notification';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const id = "6471e1cb8661253a93967d0d";
  return (
    <Router>
      <Navbar />
      <Routes>      
       <Route path = "/profile" element = {<ProfilePage userId={id}/>} />
        <Route path="/notifications" element={<Notification userId={id}/>} />
      </Routes>

    </Router>
  );
}

export default App;
