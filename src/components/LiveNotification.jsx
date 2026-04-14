import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';

const LiveNotification = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Hall 3 is now open for entry", type: "info", active: false },
    { id: 2, text: "No queue at Washroom 2 right now!", type: "success", active: false }
  ]);

  useEffect(() => {
    // Simulate real-time notifications arriving
    const timer1 = setTimeout(() => {
      setNotifications(prev => prev.map(n => n.id === 1 ? { ...n, active: true } : n));
    }, 2000);

    const timer2 = setTimeout(() => {
      setNotifications(prev => prev.map(n => n.id === 2 ? { ...n, active: true } : n));
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const dismiss = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, active: false } : n));
  };

  return (
    <div className="notification-container">
      {notifications.map((notif) => (
        notif.active && (
          <div key={notif.id} className={`notification-toast ${notif.type}`}>
            <div className="notification-icon">
              <Bell size={16} />
            </div>
            <div className="notification-text">{notif.text}</div>
            <button onClick={() => dismiss(notif.id)} className="notification-close">
              <X size={14} />
            </button>
          </div>
        )
      ))}
    </div>
  );
};

export default LiveNotification;
