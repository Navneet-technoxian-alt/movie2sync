import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const WaitTimeWidget = ({ title, icon: Icon, baseTime, variance }) => {
  const [waitTime, setWaitTime] = useState(baseTime);
  const [trend, setTrend] = useState('stable'); // 'up', 'down', 'stable'

  useEffect(() => {
    // Dynamic simulation: update every 3-8 seconds
    const interval = setInterval(() => {
      setWaitTime(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const newTime = Math.max(0, Math.min(prev + change, baseTime + variance));
        
        if (newTime > prev) setTrend('up');
        else if (newTime < prev) setTrend('down');
        else setTrend('stable');
        
        return newTime;
      });
    }, Math.random() * 5000 + 3000);

    return () => clearInterval(interval);
  }, [baseTime, variance]);

  const getStatus = () => {
    if (waitTime < 5) return { class: 'fast', text: 'Fast' };
    if (waitTime < 15) return { class: 'moderate', text: 'Busy' };
    return { class: 'busy', text: 'Crowded' };
  };

  const status = getStatus();

  return (
    <div className="glass-panel">
      <div className="widget-header">
        <h3 className="widget-title">
          <div className="widget-icon">
            <Icon size={20} />
          </div>
          {title}
        </h3>
        <span className={`status-badge ${status.class}`}>
          {status.text}
        </span>
      </div>

      <div className="time-display">
        <span className="time-value" style={{ 
          color: status.class === 'fast' ? 'var(--color-green)' : 
                 status.class === 'moderate' ? 'var(--color-yellow)' : 'var(--color-red)' 
        }}>
          {waitTime}
        </span>
        <span className="time-unit">mins</span>
      </div>

      <div className={`trend-indicator ${trend}`}>
        {trend === 'up' && <><TrendingUp size={16} /> Increasing</>}
        {trend === 'down' && <><TrendingDown size={16} /> Decreasing</>}
        {trend === 'stable' && <><Minus size={16} /> Stable</>}
      </div>
    </div>
  );
};

export default WaitTimeWidget;
