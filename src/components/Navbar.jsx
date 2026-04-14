import React, { useState, useEffect } from 'react';
import { Home, Film, Coffee, Navigation } from 'lucide-react';

const Navbar = () => {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'food', label: 'Food Court', icon: Coffee },
    { id: 'map', label: 'Venue Map', icon: Navigation },
  ];

  return (
    <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        <div className="logo-section">
          <div className="logo-dot"></div>
          <span className="logo-text">CinemaSync</span>
        </div>
        
        <div className="nav-links">
          {navItems.map((item) => (
            <button 
              key={item.id}
              className={`nav-item ${active === item.id ? 'active' : ''}`}
              onClick={() => setActive(item.id)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {active === item.id && <div className="active-indicator"></div>}
            </button>
          ))}
        </div>

        <div className="profile-section">
          <div className="profile-avatar">
            <img src="https://ui-avatars.com/api/?name=Alex+M&background=8a2be2&color=fff" alt="Profile" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
