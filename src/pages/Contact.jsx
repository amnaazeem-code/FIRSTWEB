import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', orderNumber: '', subject: 'Customer Support', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', orderNumber: '', subject: 'Customer Support', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
      alert("Your inquiry has been successfully dispatched to the AURA concierge. Expect a reply within 24 hours.");
    }
  };

  const stores = [
    {
      city: 'Antwerp Flagship',
      address: 'Kloosterstraat 12, 2000 Antwerpen, Belgium',
      phone: '+32 3 123 4567',
      hours: 'Mon–Sat: 11:00 – 19:00 | Sun: Closed'
    },
    {
      city: 'Soho Studio',
      address: '42 Greene St, New York, NY 10013, United States',
      phone: '+1 212 987 6543',
      hours: 'Mon–Sat: 10:00 – 20:00 | Sun: 12:00 – 18:00'
    },
    {
      city: 'Paris Marais',
      address: '23 Rue des Francs Bourgeois, 75004 Paris, France',
      phone: '+33 1 987 6543',
      hours: 'Mon–Sat: 11:00 – 19:30 | Sun: 12:00 – 18:30'
    }
  ];

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '40px' }}>
      
      {/* Page Title */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span className="caption-text">Concierge Desk</span>
        <h1 className="h1" style={{ fontFamily: 'var(--font-serif)', marginTop: '4px', fontWeight: 400 }}>Contact AURA</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>
          We are here to assist with size guides, private boutique appointments, or delivery tracking.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '64px', alignItems: 'flex-start', marginBottom: '80px' }} className="contact-layout">
        
        {/* Left: Contact Form */}
        <div style={{ flex: 1.2, border: '1px solid var(--border-color)', padding: '40px', backgroundColor: 'var(--bg-white)' }} className="contact-card">
          <h2 className="h3" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px', fontWeight: 600 }}>Send Message</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  className="form-input" 
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email} 
                  onChange={e => setFormData({ ...formData, email: e.target.value })} 
                  className="form-input" 
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Order Number (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. AURA-9840" 
                  value={formData.orderNumber} 
                  onChange={e => setFormData({ ...formData, orderNumber: e.target.value })} 
                  className="form-input" 
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Subject</label>
                <select 
                  value={formData.subject} 
                  onChange={e => setFormData({ ...formData, subject: e.target.value })} 
                  className="form-input"
                  style={{ appearance: 'auto' }}
                  aria-label="Inquiry subject category"
                >
                  <option value="Customer Support">Customer Support</option>
                  <option value="Sizing Advice">Sizing Consultation</option>
                  <option value="Press Inquiries">Press & Wholesale</option>
                  <option value="Private Booking">Boutique Appointment</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Your Message</label>
              <textarea 
                required 
                rows={6} 
                value={formData.message} 
                onChange={e => setFormData({ ...formData, message: e.target.value })} 
                className="form-input"
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 32px' }}>
              Dispatch Message
            </button>
          </form>
        </div>

        {/* Right: Boutiques details & map placeholder */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Map Embed Placeholder */}
          <div 
            style={{
              height: '220px',
              backgroundColor: '#FAF8F5',
              border: '1px solid var(--border-color)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)'
            }}
          >
            {/* Elegant grid overlay representing abstract map coordinates */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            <div style={{ textAlign: 'center', zIndex: 1 }}>
              <MapPin size={24} style={{ color: 'var(--accent-gold)', marginBottom: '8px' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Boutique Coordinate Map
              </span>
              <p style={{ fontSize: '11px', marginTop: '4px' }}>Antwerp | Soho New York | Paris Marais</p>
            </div>
          </div>

          {/* Boutique Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {stores.map((store) => (
              <div 
                key={store.city} 
                style={{
                  border: '1px solid var(--border-color)',
                  padding: '24px',
                  backgroundColor: 'var(--bg-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} style={{ color: 'var(--accent-gold)' }} />
                  {store.city}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{store.address}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={12} />
                    {store.phone}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    {store.hours}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-layout { flex-direction: column !important; gap: 40px !important; }
          .contact-card { width: 100% !important; }
        }
        @media (max-width: 480px) {
          .form-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </div>
  );
}
