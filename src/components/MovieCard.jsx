import React, { useState, useEffect } from 'react';
import { PlayCircle, Clock, Calendar, ChevronRight } from 'lucide-react';

const MovieCard = () => {
  const [openingTime] = useState('09:00 AM');
  const [closingTime] = useState('11:30 PM');
  
  // Movie Start Time is dynamically set to 15 minutes from now for dramatic effect
  const [movieTime, setMovieTime] = useState('');
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const now = new Date();
    const startTime = new Date(now.getTime() + 15 * 60000); // 15 mins from now
    setMovieTime(startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    const timer = setInterval(() => {
      const current = new Date();
      const diff = startTime - current;
      
      if (diff <= 0) {
        setCountdown('Now Showing');
        clearInterval(timer);
      } else {
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown(`${m}m ${s}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
      <div 
        className="movie-poster"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop)',
          margin: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          height: '250px'
        }}
      >
        <div style={{ position: 'absolute', bottom: '20px', left: '24px', zIndex: 10 }}>
          <span className="status-badge" style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', marginBottom: '12px' }}>
            Next Premiere
          </span>
          <h2 className="movie-title text-gradient">Interstellar Re-Release</h2>
          <div className="movie-meta">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> IMAX Hall 1</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> 169 min</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
          <div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Starts In</div>
            <div style={{ fontSize: '1.8rem', fontFamily: 'Outfit', fontWeight: '700', color: 'var(--accent-primary)' }}>
              {countdown}
            </div>
          </div>
          <button style={{ 
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', 
            border: 'none', 
            color: 'white', 
            padding: '12px 24px', 
            borderRadius: '12px', 
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            Get Tickets <ChevronRight size={18} />
          </button>
        </div>

        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '600' }}>Venue Timings</h3>
        <div className="timing-row">
          <span className="timing-label">Venue Opens</span>
          <span className="timing-value">{openingTime}</span>
        </div>
        <div className="timing-row">
          <span className="timing-label">Next Show</span>
          <span className="timing-value">{movieTime}</span>
        </div>
        <div className="timing-row">
          <span className="timing-label">Venue Closes</span>
          <span className="timing-value">{closingTime}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
