// src/components/Footer.jsx
import { Link } from 'react-router-dom'
import { X, Camera, Globe } from 'lucide-react'

function Footer() {
  return (
    <footer style={{
      background: '#0f1f17',
      color: 'white',
      padding: '60px 0 24px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '48px',
          marginBottom: '48px'
          
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'var(--primary)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '800'
              }}>
                N
              </div>
              <div>
                <div style={{ fontWeight: '700' }}>Neiro Store</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>AI Powered Grocery Marketplace</div>
              </div>
            </div>
            <p style={{ 
              color: 'rgba(255,255,255,0.6)', 
              fontSize: '14px', 
              lineHeight: 1.6,
              maxWidth: '320px',
              marginBottom: '20px'
            }}>
              Built with React, Supabase and Modern Web Technologies. Fresh groceries delivered to your doorstep in minutes — smarter, greener, faster.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[X, Camera, Globe].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)',
                  transition: 'all 0.2s'
                }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>
              Shop
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Categories', 'Offers', 'Pharmacy', 'Bestsellers'].map(item => (
                <li key={item}>
                  <Link to="/products" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', transition: 'color 0.2s' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['About', 'Careers', 'Help Centre', 'Privacy'].map(item => (
                <li key={item}>
                  <a href="#" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.4)'
        }}>
          <span>© 2026 Neiro Store. All rights reserved.</span>
          <span>Made with care for fresh living 🌿</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer