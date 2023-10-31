import React from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  console.log('Rendering Login');
    return (
        <div className="auth-container">
            <h2>Login</h2>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    );
};

export default Login;
