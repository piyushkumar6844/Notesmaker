
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './About';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import NoteState from './context/NoteState';
import User from './components/User';

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
         < Route exact path="/user" element={<User />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
