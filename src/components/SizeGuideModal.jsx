import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('women');

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '650px' }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
        
        <h3 className="h2" style={{ marginBottom: '24px', fontFamily: 'var(--font-serif)' }}>Size Guide</h3>
        
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '24px' }}>
          <button 
            onClick={() => setActiveTab('women')}
            style={{
              padding: '12px 24px',
              fontWeight: 500,
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderBottom: activeTab === 'women' ? '2px solid var(--text-primary)' : '2px solid transparent',
              color: activeTab === 'women' ? 'var(--text-primary)' : 'var(--text-muted)'
            }}
          >
            Women's Sizing
          </button>
          <button 
            onClick={() => setActiveTab('men')}
            style={{
              padding: '12px 24px',
              fontWeight: 500,
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderBottom: activeTab === 'men' ? '2px solid var(--text-primary)' : '2px solid transparent',
              color: activeTab === 'men' ? 'var(--text-primary)' : 'var(--text-muted)'
            }}
          >
            Men's Sizing
          </button>
        </div>

        <div>
          {activeTab === 'women' ? (
            <div>
              <p className="body-text" style={{ marginBottom: '16px', fontSize: '14px' }}>
                All measurements are in inches. For sizing in centimeters, please note 1 inch = 2.54 cm.
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--text-primary)' }}>
                    <th style={{ padding: '12px 8px', fontWeight: 600 }}>Size</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600 }}>US / UK</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600 }}>Bust</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600 }}>Waist</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600 }}>Hips</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 500 }}>XS</td>
                    <td style={{ padding: '12px 8px' }}>0 - 2</td>
                    <td style={{ padding: '12px 8px' }}>31.5\" - 32.5\"</td>
                    <td style={{ padding: '12px 8px' }}>24\" - 25\"</td>
                    <td style={{ padding: '12px 8px' }}>34\" - 35\"</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 500 }}>S</td>
                    <td style={{ padding: '12px 8px' }}>4 - 6</td>
                    <td style={{ padding: '12px 8px' }}>33.5\" - 34.5\"</td>
                    <td style={{ padding: '12px 8px' }}>26\" - 27\"</td>
                    <td style={{ padding: '12px 8px' }}>36\" - 37\"</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 500 }}>M</td>
                    <td style={{ padding: '12px 8px' }}>8 - 10</td>
                    <td style={{ padding: '12px 8px' }}>35.5\" - 37.5\"</td>
                    <td style={{ padding: '12px 8px' }}>28\" - 29.5\"</td>
                    <td style={{ padding: '12px 8px' }}>38.5\" - 40\"</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 500 }}>L</td>
                    <td style={{ padding: '12px 8px' }}>12 - 14</td>
                    <td style={{ padding: '12px 8px' }}>39\" - 40.5\"</td>
                    <td style={{ padding: '12px 8px' }}>31\" - 32.5\"</td>
                    <td style={{ padding: '12px 8px' }}>41.5\" - 43\"</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 500 }}>XL</td>
                    <td style={{ padding: '12px 8px' }}>16</td>
                    <td style={{ padding: '12px 8px' }}>42\" - 43.5\"</td>
                    <td style={{ padding: '12px 8px' }}>34\" - 35.5\"</td>
                    <td style={{ padding: '12px 8px' }}>44.5\" - 46\"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <p className="body-text" style={{ marginBottom: '16px', fontSize: '14px' }}>
                All measurements are in inches. Fits standard men's tailoring shapes.
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--text-primary)' }}>
                    <th style={{ padding: '12px 8px', fontWeight: 600 }}>Size</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600 }}>Chest</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600 }}>Waist</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600 }}>Sleeve</th>
                    <th style={{ padding: '12px 8px', fontWeight: 600 }}>Neck</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 500 }}>S</td>
                    <td style={{ padding: '12px 8px' }}>36\" - 38\"</td>
                    <td style={{ padding: '12px 8px' }}>30\" - 32\"</td>
                    <td style={{ padding: '12px 8px' }}>32.5\" - 33\"</td>
                    <td style={{ padding: '12px 8px' }}>14.5\" - 15\"</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 500 }}>M</td>
                    <td style={{ padding: '12px 8px' }}>39\" - 41\"</td>
                    <td style={{ padding: '12px 8px' }}>32\" - 34\"</td>
                    <td style={{ padding: '12px 8px' }}>33.5\" - 34\"</td>
                    <td style={{ padding: '12px 8px' }}>15.5\" - 16\"</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 500 }}>L</td>
                    <td style={{ padding: '12px 8px' }}>42\" - 44\"</td>
                    <td style={{ padding: '12px 8px' }}>34\" - 36\"</td>
                    <td style={{ padding: '12px 8px' }}>34.5\" - 35\"</td>
                    <td style={{ padding: '12px 8px' }}>16.5\" - 17\"</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 500 }}>XL</td>
                    <td style={{ padding: '12px 8px' }}>45\" - 47\"</td>
                    <td style={{ padding: '12px 8px' }}>36\" - 38\"</td>
                    <td style={{ padding: '12px 8px' }}>35.5\" - 36\"</td>
                    <td style={{ padding: '12px 8px' }}>17.5\" - 18\"</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 500 }}>XXL</td>
                    <td style={{ padding: '12px 8px' }}>48\" - 50\"</td>
                    <td style={{ padding: '12px 8px' }}>38\" - 40\"</td>
                    <td style={{ padding: '12px 8px' }}>36\" - 36.5\"</td>
                    <td style={{ padding: '12px 8px' }}>18\" - 18.5\"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
