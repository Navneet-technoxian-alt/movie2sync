import React, { useState } from 'react';
import { Coffee, Plus, Minus, ShoppingCart } from 'lucide-react';

const FoodOrderPanel = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Large Popcorn', price: 8.50, qty: 0, img: '🍿' },
    { id: 2, name: 'Coca Cola', price: 4.00, qty: 0, img: '🥤' },
    { id: 3, name: 'Hot Nachos', price: 6.50, qty: 0, img: '🧀' },
    { id: 4, name: 'Candy Box', price: 3.50, qty: 0, img: '🍫' }
  ]);

  const updateQty = (id, delta) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="glass-panel food-panel">
      <div className="widget-header">
        <h3 className="widget-title">
          <div className="widget-icon">
            <Coffee size={20} />
          </div>
          Express Food Order
        </h3>
        <span className="status-badge fast" style={{ padding: '4px 8px', fontSize: '0.7rem' }}>Skip Queue</span>
      </div>

      <div className="food-items-list">
        {items.map(item => (
          <div key={item.id} className="food-item">
            <div className="food-emoji">{item.img}</div>
            <div className="food-details">
              <h4>{item.name}</h4>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <div className="qty-controls">
              <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>
                <Minus size={14} />
              </button>
              <span className="qty-display">{item.qty}</span>
              <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>
                <Plus size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-section">
        <div className="total-display">
          <span>Total:</span>
          <span className="total-price">${total.toFixed(2)}</span>
        </div>
        <button className={`checkout-btn ${total === 0 ? 'disabled' : ''}`}>
          <ShoppingCart size={18} />
          Pay & Pickup
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
      </div>
    </div>
  );
};

export default FoodOrderPanel;
