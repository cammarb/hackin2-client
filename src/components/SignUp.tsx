import React from 'react';
import './Test.css';

const SignUp: React.FC = () => {
  console.log('Rendering SignUp');
    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default SignUp;