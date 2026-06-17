import React from 'react';
import { Award, Leaf, Shield, Quote } from 'lucide-react';

export default function About() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
      
      {/* 1. Full-bleed Hero */}
      <section 
        style={{
          height: '60vh',
          minHeight: '400px',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1600&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 45%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: '#FFF',
          padding: '0 var(--space-24)'
        }}
      >
        <span className="caption-text" style={{ color: '#F8F6F2', letterSpacing: '0.2em', marginBottom: '16px' }}>Our Heritage</span>
        <h1 className="display-text" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(38px, 5vw, 64px)' }}>The Architecture of Dress</h1>
      </section>

      {/* 2. Founding Statement */}
      <section className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
        <span className="caption-text" style={{ marginBottom: '16px', display: 'block' }}>AURA Philosophy</span>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', lineHeight: '1.6', color: 'var(--text-primary)', fontStyle: 'italic' }}>
          "We believe in clothing as personal architecture. AURA was founded to strip away the noise, offering pure textures, relaxed silhouettes, and luxury craftsmanship designed to endure for generations."
        </p>
        <span style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '24px' }}>
          — Marcus & Sophie Sterling, Founders
        </span>
      </section>

      {/* 3. Our Values */}
      <section className="container" id="values">
        <h2 className="h2" style={{ textAlign: 'center', marginBottom: '48px', fontFamily: 'var(--font-serif)' }}>Studio Values</h2>
        
        <div className="grid-cols-3">
          <div style={{ border: '1px solid var(--border-color)', padding: '40px 32px', backgroundColor: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Leaf size={32} style={{ color: 'var(--accent-gold)' }} />
            <h3 className="h3" style={{ fontSize: '20px', fontWeight: 600 }}>Sustainability</h3>
            <p className="body-text" style={{ fontSize: '14px', lineHeight: '1.7' }}>
              We partner with local Belgian, Portuguese, and Italian weavers committed to organic cotton, linen flax, and chemical-free washing. 100% of our products are packed in zero-plastic, biodegradable shippers.
            </p>
          </div>

          <div style={{ border: '1px solid var(--border-color)', padding: '40px 32px', backgroundColor: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Award size={32} style={{ color: 'var(--accent-gold)' }} />
            <h3 className="h3" style={{ fontSize: '20px', fontWeight: 600 }}>Craftsmanship</h3>
            <p className="body-text" style={{ fontSize: '14px', lineHeight: '1.7' }}>
              Every blazer, shoe, and dress is completed by hand in workshops that guarantee living wages, fair conditions, and deep respect for generational textile techniques.
            </p>
          </div>

          <div style={{ border: '1px solid var(--border-color)', padding: '40px 32px', backgroundColor: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Shield size={32} style={{ color: 'var(--accent-gold)' }} />
            <h3 className="h3" style={{ fontSize: '20px', fontWeight: 600 }}>Inclusivity</h3>
            <p className="body-text" style={{ fontSize: '14px', lineHeight: '1.7' }}>
              Luxury tailoring should adapt to the wearer, not vice versa. Our garments are engineered with subtle adjustments to fit diverse proportions beautifully across a complete size scale.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Timeline Milestones */}
      <section className="container" id="timeline" style={{ maxWidth: '900px' }}>
        <h2 className="h2" style={{ textAlign: 'center', marginBottom: '48px', fontFamily: 'var(--font-serif)' }}>Historical Milestones</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
          {/* Vertical connecting line */}
          <div style={{ position: 'absolute', left: '20px', top: '8px', bottom: '8px', width: '1.5px', backgroundColor: 'var(--border-color)' }} />

          {[
            { year: '2020', title: 'The Blueprint', text: 'Marcus and Sophie establish AURA as a research workshop in Antwerp, experimenting with linen drape dynamics.' },
            { year: '2022', title: 'First Capsule Release', text: 'AURA drops its first collection: 6 unisex linen styles, selling out in hours and earning reviews in Vogue International.' },
            { year: '2024', title: 'Antwerp Flagship Boutique', text: 'We open our first permanent physical space—an architectural concrete studio—in Antwerp\'s historic fashion district.' },
            { year: '2026', title: 'The Carbon Net-Zero Goal', text: 'Achieved complete vertical supply-chain traceability, offsetting 100% of our carbon footprints through reforestation partnerships.' }
          ].map((milestone) => (
            <div key={milestone.year} style={{ display: 'flex', gap: '24px', position: 'relative', paddingLeft: '40px' }}>
              {/* Timeline dot */}
              <div 
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '4px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-gold)',
                  border: '3.5px solid var(--bg-primary)'
                }}
              />
              <div>
                <span style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)' }}>
                  {milestone.year}
                </span>
                <h4 style={{ fontSize: '16px', fontWeight: 600, margin: '2px 0 6px' }}>{milestone.title}</h4>
                <p className="body-text" style={{ fontSize: '14px', lineHeight: '1.6' }}>{milestone.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Founder Spotlight */}
      <section className="container">
        <h2 className="h2" style={{ textAlign: 'center', marginBottom: '48px', fontFamily: 'var(--font-serif)' }}>Creative Direction</h2>
        
        <div className="grid-cols-2" style={{ gap: '48px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ aspectRatio: '4/5', overflow: 'hidden', backgroundColor: '#e5e5e5' }}>
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop" 
                alt="Marcus Sterling" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} 
              />
            </div>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 600 }}>Marcus Sterling</h4>
              <span className="caption-text" style={{ fontSize: '10px', color: 'var(--accent-gold)' }}>Head of Design & Atelier</span>
              <p className="body-text" style={{ fontSize: '14px', marginTop: '12px', lineHeight: '1.6' }}>
                A graduate of the Royal Academy of Fine Arts Antwerp, Marcus spent a decade in Paris tailoring ateliers before returning to Belgium to formulate AURA's fluid, sculptural draping guidelines.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ aspectRatio: '4/5', overflow: 'hidden', backgroundColor: '#e5e5e5' }}>
              <img 
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop" 
                alt="Sophie Sterling" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} 
              />
            </div>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 600 }}>Sophie Sterling</h4>
              <span className="caption-text" style={{ fontSize: '10px', color: 'var(--accent-gold)' }}>CEO & Sourcing Lead</span>
              <p className="body-text" style={{ fontSize: '14px', marginTop: '12px', lineHeight: '1.6' }}>
                With a background in supply-chain economics, Sophie manages AURA's zero-waste framework, auditing every spinning mill, dye house, and sewing workshop to ensure absolute circular standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Press Pull Quotes */}
      <section 
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
          padding: '80px 0',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <Quote size={40} style={{ color: 'var(--accent-gold)', opacity: 0.6 }} />
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontStyle: 'italic', lineHeight: '1.5' }}>
            "AURA is redefining minimalist luxury. Their silk slip dresses and linen blazers carry an architectural weight that feels timeless yet completely contemporary."
          </p>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'var(--text-primary)' }}>
            — ELLE Magazine EDITORIAL BOARD
          </span>
        </div>
      </section>

    </div>
  );
}
