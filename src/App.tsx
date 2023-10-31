import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Changed from Switch to Routes
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';  

function App() {
  return (
      <Router>
          <div>
              <Routes>  {/* Changed from Switch to Routes */}
                  <Route path="/" element={<Home />} />  {/* Changed component to element */}
                  <Route path="/login" element={<Login />} />  {/* Changed component to element */}
                  <Route path="/signup" element={<SignUp />} />  {/* Changed component to element */}
                  <Route path="/*" element={<ErrorPage />} />  {/* Changed component to element and path to "/*" */}
              </Routes>
          </div>
      </Router>
  );
}

export default App;
