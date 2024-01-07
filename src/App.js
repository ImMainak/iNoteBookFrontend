import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import { Home } from './Components/Home';
import { About } from './Components/About';
import NoteState from './context/Notes/NoteState';
// import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AlertState from './context/Alert/AlertState';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <AlertState>
            {/* <Alert /> */}
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </AlertState>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
