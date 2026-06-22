// src/components/Herosection.jsx
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Leaf } from 'lucide-react'

function Herosection() {
  return (
    <section style={{ padding: '40px 0', overflow: 'hidden' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'center',
          minHeight: '480px'
        }}>
          {/* Left Content */}
          <div style={{ maxWidth: '520px' }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '800',
              lineHeight: 1.1,
              marginBottom: '20px',
              letterSpacing: '-0.02em'
            }}>
              Shop Smarter.<br />
              <span style={{ color: 'var(--primary)' }}>Live Better.</span>
            </h1>
            <p style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '28px'
            }}>
              Fresh groceries, medicines, dairy products, fruits, vegetables, snacks 
              and daily essentials delivered to your doorstep in minutes.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
              <Link to="/products" className="btn-primary">
                Start Shopping
                <ArrowRight size={18} />
              </Link>
              <Link to="/products" className="btn-outline">
                Explore Categories
              </Link>
            </div>
            <div style={{ display: 'flex', gap: '32px' }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '800' }}>10 min</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Avg Delivery
                </div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '800' }}>10K+</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Products
                </div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '800' }}>4.9★</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Rating
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              aspectRatio: '4/3'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop"
                alt="Fresh groceries"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Floating badges */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'white',
                padding: '10px 16px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-lg)',
                fontSize: '13px',
                fontWeight: '600'
              }}>
                <Leaf size={16} color="var(--primary)" />
                <span>100% Organic Picks</span>
              </div>
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                background: 'white',
                padding: '10px 16px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-lg)',
                fontSize: '13px',
                fontWeight: '600'
              }}>
                <Sparkles size={16} color="var(--primary)" />
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>AI Powered</div>
                  <div>Smart Shopping</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Herosection