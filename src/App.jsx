import React from 'react';
import { Coffee, User, LayoutDashboard, Settings } from 'lucide-react';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import WaitTimeWidget from './components/WaitTimeWidget';
import LiveNotification from './components/LiveNotification';
import FoodOrderPanel from './components/FoodOrderPanel';
import './index.css';function App() {
  return (
    <div className="app-container" style={{ paddingTop: '80px' }}>
      <Navbar />
      <header className="header-area">
        <div>
          <h1 className="header-title text-gradient">CinemaSync</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '8px' }}>
            Live Event & Venue Coordination
          </p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="glass-panel" style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Settings size={20} color="var(--text-primary)" />
          </button>
          <button className="glass-panel" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'rgba(255,255,255,0.1)' }}>
            <User size={20} />
            <span style={{ fontWeight: '600' }}>Admin Portal</span>
          </button>
        </div>
      </header>

      <div className="dashboard-grid">
        {/* Left Column - Real-time Status */}
        <div className="main-content">
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '-8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LayoutDashboard size={24} color="var(--accent-primary)" />
            Live Venue Status
          </h2>
          <div className="widgets-grid">
            <WaitTimeWidget 
              title="Food Court Queue" 
              icon={Coffee} 
              baseTime={12} 
              variance={10} 
            />
            <WaitTimeWidget 
              title="Restroom Availability" 
              icon={User} 
              baseTime={3} 
              variance={5} 
            />
          </div>
          
          <div className="glass-panel" style={{ marginTop: 'auto' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '600' }}>System Status</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-green)', boxShadow: '0 0 10px var(--color-green)' }}></div>
              All venue sensors online and synchronizing dynamically.
            </div>
          </div>
        </div>

        {/* Right Column - Event Context */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <MovieCard />
          <FoodOrderPanel />
        </div>
      </div>

      <LiveNotification />
    </div>
  );
}

export default App;
