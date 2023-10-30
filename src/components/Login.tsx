
import React from 'react';
import './Auth.css';

const Login: React.FC = () => {
    return (
        <div className="auth-container">
            <h2>Login</h2>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    );
};

export default Login;
  