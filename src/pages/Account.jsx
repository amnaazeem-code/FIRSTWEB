import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, MapPin, User, LogOut, ChevronRight, Check } from 'lucide-react';

export default function Account({ wishlistCount, cart }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, orders, profile, addresses, payments
  const [selectedOrderId, setSelectedOrderId] = useState(null); // null means list view, otherwise detail view

  // User Profile State
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@aurastudio.com',
    phone: '+1 (555) 123-4567',
    birthday: '1995-10-15'
  });

  // Addresses State
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Jane Doe',
      street: '123 Editorial Lane, Apt 4B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
      isDefault: true
    }
  ]);
  const [newAddressForm, setNewAddressForm] = useState({ name: '', street: '', city: '', state: '', zip: '', country: 'United States' });
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Payments State
  const [payments, setPayments] = useState([
    {
      id: 1,
      cardholder: 'Jane Doe',
      number: '•••• •••• •••• 4242',
      expiry: '12/28',
      brand: 'Visa'
    }
  ]);
  const [newCardForm, setNewCardForm] = useState({ cardholder: '', number: '', expiry: '', cvv: '' });
  const [showCardForm, setShowCardForm] = useState(false);

  // Mock Orders
  const orders = [
    {
      id: 'AURA-9840',
      date: '2026-06-10',
      total: 206.88,
      status: 'In Transit',
      items: [
        { name: 'Silk Slip Midi Dress', color: 'Champagne', size: 'S', quantity: 1, price: 190, img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=200&auto=format&fit=crop' }
      ],
      trackingStep: 2, // 0: Placed, 1: Processing, 2: In Transit, 3: Delivered
      address: 'Jane Doe, 123 Editorial Lane, Apt 4B, New York, NY 10001'
    },
    {
      id: 'AURA-9821',
      date: '2026-05-15',
      total: 191.66,
      status: 'Delivered',
      items: [
        { name: 'Linen Oversized Blazer', color: 'Sand', size: 'S', quantity: 1, price: 176, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=200&auto=format&fit=crop' }
      ],
      trackingStep: 3,
      address: 'Jane Doe, 123 Editorial Lane, Apt 4B, New York, NY 10001'
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert("Profile settings successfully updated.");
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (newAddressForm.name && newAddressForm.street) {
      setAddresses([...addresses, { ...newAddressForm, id: addresses.length + 1, isDefault: false }]);
      setNewAddressForm({ name: '', street: '', city: '', state: '', zip: '', country: 'United States' });
      setShowAddressForm(false);
      alert("New shipping address saved.");
    }
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (newCardForm.number && newCardForm.cardholder) {
      const maskedNum = `•••• •••• •••• ${newCardForm.number.slice(-4)}`;
      setPayments([...payments, { id: payments.length + 1, cardholder: newCardForm.cardholder, number: maskedNum, expiry: newCardForm.expiry, brand: 'Card' }]);
      setNewCardForm({ cardholder: '', number: '', expiry: '', cvv: '' });
      setShowCardForm(false);
      alert("New payment method successfully linked.");
    }
  };

  const handleDeleteCard = (id) => {
    setPayments(payments.filter(pay => pay.id !== id));
  };

  if (!isLoggedIn) {
    return (
      <div className="container animate-fade-in" style={{ paddingTop: '64px' }}>
        <div 
          style={{
            display: 'flex',
            gap: '80px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
          className="auth-split-layout"
        >
          {/* Left: Login */}
          <div style={{ flex: 1, borderRight: '1px solid var(--border-color)', paddingRight: '64px' }} className="auth-column">
            <h2 className="h2" style={{ fontFamily: 'var(--font-serif)', marginBottom: '32px' }}>Sign In</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" required defaultValue="customer@aurastudio.com" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" required defaultValue="••••••••" className="form-input" />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '13px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--text-primary)' }} />
                  Remember Me
                </label>
                <a href="#account" onClick={() => alert("Simulated forgot password link. Email dispatched.")} style={{ textDecoration: 'underline' }}>Forgot Password?</a>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px' }}>
                Access Account
              </button>
            </form>

            {/* Social Logins */}
            <div style={{ marginTop: '32px', textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '16px' }}>Or Connect With</span>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setIsLoggedIn(true)} className="btn-secondary" style={{ flex: 1, fontSize: '12px', padding: '10px' }}>
                  Google
                </button>
                <button onClick={() => setIsLoggedIn(true)} className="btn-secondary" style={{ flex: 1, fontSize: '12px', padding: '10px' }}>
                  Apple ID
                </button>
              </div>
            </div>
          </div>

          {/* Right: Register */}
          <div style={{ flex: 1 }} className="auth-column-right">
            <h2 className="h2" style={{ fontFamily: 'var(--font-serif)', marginBottom: '32px' }}>Create Registry</h2>
            <p className="body-text" style={{ fontSize: '14px', marginBottom: '24px' }}>
              Registering lets you track orders easily, store billing details, and collect AURA Loyalty Points towards seasonal garments.
            </p>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" required placeholder="e.g. Jane Doe" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" required placeholder="name@domain.com" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" required placeholder="Minimum 8 characters" className="form-input" />
              </div>
              <button type="submit" className="btn-primary btn-gold" style={{ width: '100%', padding: '14px', color: '#FFF' }}>
                Register Account
              </button>
            </form>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .auth-split-layout { flex-direction: column !important; gap: 48px !important; }
            .auth-column { border-right: none !important; padding-right: 0 !important; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '40px' }}>
      
      {/* Greeting Header */}
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '24px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="h1" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, margin: 0 }}>
            Hello, {profile.name.split(' ')[0]}
          </h1>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Studio Member since 2026</span>
        </div>
        <button 
          onClick={() => setIsLoggedIn(false)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>

      {/* Main Account Area */}
      <div style={{ display: 'flex', gap: '48px' }} className="account-main-layout">
        
        {/* Navigation Sidebar */}
        <nav style={{ width: '220px', flexShrink: 0 }} className="account-sidebar">
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { id: 'overview', label: 'Dashboard Overview' },
              { id: 'orders', label: 'Order History' },
              { id: 'profile', label: 'Profile Settings' },
              { id: 'addresses', label: 'Saved Addresses' },
              { id: 'payments', label: 'Payment Methods' }
            ].map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => { setActiveTab(tab.id); setSelectedOrderId(null); }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 16px',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    backgroundColor: activeTab === tab.id ? 'var(--text-primary)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--bg-primary)' : 'var(--text-primary)',
                    border: '1px solid transparent',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Dynamic Panel Content */}
        <div style={{ flex: 1 }} className="account-panel">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="animate-fade-in">
              <h2 className="h3" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px', fontWeight: 600 }}>Dashboard Overview</h2>
              
              {/* Quick Stats Grid */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '24px',
                  marginBottom: '40px'
                }}
                className="stats-grid"
              >
                <div style={{ border: '1px solid var(--border-color)', padding: '24px', backgroundColor: 'var(--bg-white)', textAlign: 'center' }}>
                  <span className="caption-text">Loyalty Tier</span>
                  <span style={{ display: 'block', fontSize: '28px', fontWeight: 'bold', fontFamily: 'var(--font-serif)', margin: '8px 0' }}>Gold Member</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>450 points to next tier</span>
                </div>
                <div style={{ border: '1px solid var(--border-color)', padding: '24px', backgroundColor: 'var(--bg-white)', textAlign: 'center' }}>
                  <span className="caption-text">Saved Items</span>
                  <span style={{ display: 'block', fontSize: '28px', fontWeight: 'bold', fontFamily: 'var(--font-serif)', margin: '8px 0' }}>{wishlistCount} Pieces</span>
                  <a href="#wishlist" style={{ fontSize: '12px', textDecoration: 'underline' }}>View Wishlist</a>
                </div>
                <div style={{ border: '1px solid var(--border-color)', padding: '24px', backgroundColor: 'var(--bg-white)', textAlign: 'center' }}>
                  <span className="caption-text">Active Orders</span>
                  <span style={{ display: 'block', fontSize: '28px', fontWeight: 'bold', fontFamily: 'var(--font-serif)', margin: '8px 0' }}>1 Order</span>
                  <button onClick={() => setActiveTab('orders')} style={{ fontSize: '12px', textDecoration: 'underline' }}>Track Order</button>
                </div>
              </div>

              {/* Recent Order Summary */}
              <div style={{ border: '1px solid var(--border-color)', padding: '32px', backgroundColor: 'var(--bg-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 className="h3" style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Recent Order</h3>
                  <button onClick={() => setActiveTab('orders')} style={{ fontSize: '13px', textDecoration: 'underline' }}>See All Orders</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>Order #9840</span>
                    <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)' }}>Placed June 10, 2026</span>
                  </div>
                  <span 
                    style={{
                      padding: '4px 10px',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      backgroundColor: '#E6F0FA',
                      color: '#2B6CB0'
                    }}
                  >
                    In Transit
                  </span>
                  <button 
                    onClick={() => { setSelectedOrderId('AURA-9840'); setActiveTab('orders'); }}
                    className="btn-secondary"
                    style={{ padding: '8px 16px', fontSize: '11px' }}
                  >
                    Manage & Track
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS */}
          {activeTab === 'orders' && (
            <div className="animate-fade-in">
              {!selectedOrderId ? (
                // Order list view
                <div>
                  <h2 className="h3" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px', fontWeight: 600 }}>Order History</h2>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {orders.map((order) => (
                      <div key={order.id} style={{ border: '1px solid var(--border-color)', padding: '24px', backgroundColor: 'var(--bg-white)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                        <div>
                          <span style={{ fontWeight: 600, fontSize: '14px' }}>Order #{order.id}</span>
                          <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)' }}>Placed on {order.date}</span>
                          <span style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginTop: '4px' }}>Total: ${order.total}</span>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {order.items.map((item, idx) => (
                            <img key={idx} src={item.img} alt={item.name} style={{ width: '40px', height: '52px', objectFit: 'cover', background: '#f5f5f5' }} />
                          ))}
                        </div>

                        <span 
                          style={{
                            padding: '4px 10px',
                            fontSize: '11px',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            backgroundColor: order.status === 'Delivered' ? '#EBF8F2' : '#E6F0FA',
                            color: order.status === 'Delivered' ? '#276749' : '#2B6CB0'
                          }}
                        >
                          {order.status}
                        </span>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => setSelectedOrderId(order.id)}
                            className="btn-secondary"
                            style={{ padding: '8px 16px', fontSize: '11px' }}
                          >
                            Track & Details
                          </button>
                          <button 
                            onClick={() => alert("Items loaded back into shopping bag.")}
                            className="btn-primary"
                            style={{ padding: '8px 16px', fontSize: '11px' }}
                          >
                            Reorder
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Order detail view with tracking stepper
                <div>
                  <button 
                    onClick={() => setSelectedOrderId(null)}
                    style={{ fontSize: '13px', textDecoration: 'underline', marginBottom: '24px', display: 'block' }}
                  >
                    ← Back to Orders list
                  </button>
                  
                  {(() => {
                    const order = orders.find(o => o.id === selectedOrderId);
                    if (!order) return null;
                    return (
                      <div className="animate-fade-in" style={{ border: '1px solid var(--border-color)', padding: '32px', backgroundColor: 'var(--bg-white)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '24px' }}>
                          <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Order Details #{order.id}</h3>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ordered on {order.date}</span>
                          </div>
                          <span style={{ fontSize: '16px', fontWeight: 600 }}>Total: ${order.total}</span>
                        </div>

                        {/* 4-Step Tracker */}
                        <div style={{ marginBottom: '48px' }}>
                          <span className="caption-text" style={{ fontSize: '10px', display: 'block', marginBottom: '24px', textAlign: 'center' }}>Delivery Progress</span>
                          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
                            {/* Connect line */}
                            <div style={{ position: 'absolute', top: '15px', left: '0', right: '0', height: '2px', backgroundColor: '#e5e5e5', zIndex: 1 }} />
                            <div style={{ position: 'absolute', top: '15px', left: '0', width: `${(order.trackingStep / 3) * 100}%`, height: '2px', backgroundColor: 'var(--accent-gold)', zIndex: 1 }} />

                            {['Placed', 'Processing', 'In Transit', 'Delivered'].map((step, idx) => {
                              const active = idx <= order.trackingStep;
                              return (
                                <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, position: 'relative' }}>
                                  <div 
                                    style={{
                                      width: '32px',
                                      height: '32px',
                                      borderRadius: '50%',
                                      backgroundColor: active ? 'var(--text-primary)' : 'var(--bg-white)',
                                      border: '2px solid var(--text-primary)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      color: active ? '#fff' : 'var(--text-primary)'
                                    }}
                                  >
                                    {idx < order.trackingStep || order.trackingStep === 3 ? (
                                      <Check size={14} style={{ color: '#fff' }} />
                                    ) : (
                                      <span style={{ fontSize: '11px', fontWeight: 'bold' }}>{idx + 1}</span>
                                    )}
                                  </div>
                                  <span style={{ fontSize: '11px', fontWeight: 600, marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {step}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Items detailed */}
                        <h4 className="caption-text" style={{ fontSize: '10px', marginBottom: '16px', color: 'var(--text-primary)', fontWeight: 600 }}>Items Breakdown</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                          {order.items.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
                              <img src={item.img} alt={item.name} style={{ width: '60px', height: '80px', objectFit: 'cover' }} />
                              <div style={{ flex: 1 }}>
                                <h5 style={{ fontSize: '14px', fontWeight: 500, margin: 0 }}>{item.name}</h5>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Color: {item.color} | Size: {item.size} | Qty: {item.quantity}</span>
                              </div>
                              <span style={{ fontSize: '14px', fontWeight: 600 }}>${item.price}</span>
                            </div>
                          ))}
                        </div>

                        {/* Ship address details */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', fontSize: '14px' }} className="order-details-grid">
                          <div>
                            <span className="caption-text" style={{ fontSize: '10px', color: 'var(--text-primary)', fontWeight: 600 }}>Shipping Address</span>
                            <p style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>{order.address}</p>
                          </div>
                          <div>
                            <span className="caption-text" style={{ fontSize: '10px', color: 'var(--text-primary)', fontWeight: 600 }}>Payment Method</span>
                            <p style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>Visa ending in 4242</p>
                          </div>
                        </div>

                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="animate-fade-in" style={{ border: '1px solid var(--border-color)', padding: '32px', backgroundColor: 'var(--bg-white)' }}>
              <h2 className="h3" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px', fontWeight: 600 }}>Profile Settings</h2>
              
              <form onSubmit={handleSaveProfile}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={profile.name} 
                      onChange={e => setProfile({ ...profile, name: e.target.value })} 
                      className="form-input" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={profile.email} 
                      onChange={e => setProfile({ ...profile, email: e.target.value })} 
                      className="form-input" 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      value={profile.phone} 
                      onChange={e => setProfile({ ...profile, phone: e.target.value })} 
                      className="form-input" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Birthday</label>
                    <input 
                      type="date" 
                      value={profile.birthday} 
                      onChange={e => setProfile({ ...profile, birthday: e.target.value })} 
                      className="form-input" 
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '16px', padding: '12px 28px' }}>
                  Save Profile Settings
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 className="h3" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, fontWeight: 600 }}>Saved Addresses</h2>
                <button 
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '11px' }}
                >
                  {showAddressForm ? 'Cancel' : 'Add New Address'}
                </button>
              </div>

              {/* Add address Form */}
              {showAddressForm && (
                <div style={{ border: '1px solid var(--border-color)', padding: '32px', backgroundColor: 'var(--bg-white)', marginBottom: '32px' }} className="animate-fade-in">
                  <h3 className="h3" style={{ fontSize: '16px', marginBottom: '20px' }}>New Shipping Address</h3>
                  <form onSubmit={handleAddAddress}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input type="text" required value={newAddressForm.name} onChange={e => setNewAddressForm({ ...newAddressForm, name: e.target.value })} className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Street Address</label>
                      <input type="text" required value={newAddressForm.street} onChange={e => setNewAddressForm({ ...newAddressForm, street: e.target.value })} className="form-input" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="addr-fields-grid">
                      <div className="form-group">
                        <label className="form-label">City</label>
                        <input type="text" required value={newAddressForm.city} onChange={e => setNewAddressForm({ ...newAddressForm, city: e.target.value })} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">State / Prov</label>
                        <input type="text" required value={newAddressForm.state} onChange={e => setNewAddressForm({ ...newAddressForm, state: e.target.value })} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Zip / Post</label>
                        <input type="text" required value={newAddressForm.zip} onChange={e => setNewAddressForm({ ...newAddressForm, zip: e.target.value })} className="form-input" />
                      </div>
                    </div>
                    <button type="submit" className="btn-primary" style={{ padding: '10px 24px', fontSize: '12px' }}>
                      Save Address
                    </button>
                  </form>
                </div>
              )}

              {/* List of addresses */}
              {addresses.length === 0 ? (
                <p className="body-text" style={{ color: 'var(--text-muted)' }}>No saved addresses. Click add new above.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="addresses-grid">
                  {addresses.map((addr) => (
                    <div key={addr.id} style={{ border: '1px solid var(--border-color)', padding: '24px', backgroundColor: 'var(--bg-white)', position: 'relative' }}>
                      {addr.isDefault && (
                        <span style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', backgroundColor: '#e2dfd9', padding: '2px 6px' }}>
                          Default
                        </span>
                      )}
                      <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>{addr.name}</h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        {addr.street}<br />
                        {addr.city}, {addr.state} {addr.zip}<br />
                        {addr.country}
                      </p>
                      
                      <div style={{ display: 'flex', gap: '16px', marginTop: '20px', fontSize: '13px' }}>
                        <button onClick={() => alert("Simulated edit function.")} style={{ textDecoration: 'underline' }}>Edit</button>
                        <button onClick={() => handleDeleteAddress(addr.id)} style={{ textDecoration: 'underline', color: '#8A1F1F' }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: PAYMENT METHODS */}
          {activeTab === 'payments' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 className="h3" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, fontWeight: 600 }}>Payment Methods</h2>
                <button 
                  onClick={() => setShowCardForm(!showCardForm)}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '11px' }}
                >
                  {showCardForm ? 'Cancel' : 'Link Card'}
                </button>
              </div>

              {/* Add Card Form */}
              {showCardForm && (
                <div style={{ border: '1px solid var(--border-color)', padding: '32px', backgroundColor: 'var(--bg-white)', marginBottom: '32px' }} className="animate-fade-in">
                  <h3 className="h3" style={{ fontSize: '16px', marginBottom: '20px' }}>Link Credit Card</h3>
                  <form onSubmit={handleAddCard}>
                    <div className="form-group">
                      <label className="form-label">Cardholder Name</label>
                      <input type="text" required value={newCardForm.cardholder} onChange={e => setNewCardForm({ ...newCardForm, cardholder: e.target.value })} className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Card Number</label>
                      <input type="text" maxLength={16} placeholder="4242 4242 4242 4242" required value={newCardForm.number} onChange={e => setNewCardForm({ ...newCardForm, number: e.target.value })} className="form-input" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className="form-group">
                        <label className="form-label">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" maxLength={5} required value={newCardForm.expiry} onChange={e => setNewCardForm({ ...newCardForm, expiry: e.target.value })} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">CVV Security</label>
                        <input type="password" maxLength={3} placeholder="•••" required value={newCardForm.cvv} onChange={e => setNewCardForm({ ...newCardForm, cvv: e.target.value })} className="form-input" />
                      </div>
                    </div>
                    <button type="submit" className="btn-primary" style={{ padding: '10px 24px', fontSize: '12px' }}>
                      Link Card
                    </button>
                  </form>
                </div>
              )}

              {/* Cards List */}
              {payments.length === 0 ? (
                <p className="body-text" style={{ color: 'var(--text-muted)' }}>No credit cards linked. Link a payment method above.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="payments-grid">
                  {payments.map((pay) => (
                    <div key={pay.id} style={{ border: '1px solid var(--border-color)', padding: '24px', backgroundColor: 'var(--bg-white)', display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <CreditCard size={24} style={{ color: 'var(--text-muted)' }} />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>{pay.brand} {pay.number}</span>
                        <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)' }}>Expires {pay.expiry} | Cardholder: {pay.cardholder}</span>
                      </div>
                      <button onClick={() => handleDeleteCard(pay.id)} style={{ fontSize: '12px', color: '#8A1F1F', textDecoration: 'underline' }}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .account-main-layout { flex-direction: column !important; gap: 32px !important; }
          .account-sidebar { width: 100% !important; }
          .stats-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .form-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .order-details-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .addresses-grid { grid-template-columns: 1fr !important; }
          .payments-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
