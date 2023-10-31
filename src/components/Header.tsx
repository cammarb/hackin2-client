import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Test.css';  

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    return (
        <header>
            <div className="container">
                <div className="logo">
                    <Link to="/">Hackin2</Link>
                </div>
                <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </ul>
                </nav>
                <div className="menu-icon" onClick={handleMenuToggle}>
                    {/* Menu icon for mobile view, could use an SVG or font icon */}
                    <span>☰</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
