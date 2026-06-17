import React from 'react';
import { X, Check } from 'lucide-react';

export default function Toast({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast" role="alert">
          <Check size={16} className="text-gold" />
          <span>{toast.message}</span>
          <button 
            onClick={() => removeToast(toast.id)} 
            className="btn-icon" 
            aria-label="Dismiss notification"
            style={{ padding: 2, marginLeft: 8, color: '#9E9D99' }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
