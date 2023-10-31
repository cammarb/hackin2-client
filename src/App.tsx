import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';  
import Header from './components/Header';  

function App() {
    return (
        <Router>
            <div>
                <Header />  
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/*" element={<ErrorPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
