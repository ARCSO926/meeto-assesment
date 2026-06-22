// src/components/Testimonials.jsx
function Testimonials() {
  return (
    <section style={{ padding: '60px 0', background: 'var(--bg-light)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px'
        }}>
          {/* Fresh Farm Produce */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            display: 'flex',
            gap: '24px',
            alignItems: 'center'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'var(--primary-light)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                marginBottom: '16px'
              }}>
                🌱
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
                Fresh Farm Produce
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px', lineHeight: 1.5 }}>
                Hand-picked seasonal fruits & vegetables delivered straight from local farms.
              </p>
              <a href="/products" style={{
                color: 'var(--primary)',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Shop Produce →
              </a>
            </div>
            <div style={{
              width: '200px',
              height: '200px',
              borderRadius: '16px',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              <img 
                src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&auto=format&fit=crop"
                alt="Fresh vegetables"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Pharmacy Delivery */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            display: 'flex',
            gap: '24px',
            alignItems: 'center'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: '#fef3c7',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                marginBottom: '16px'
              }}>
                💊
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
                Pharmacy Delivery
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px', lineHeight: 1.5 }}>
                Medicines & wellness at your door in minutes.
              </p>
              <a href="/products" style={{
                color: 'var(--primary)',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Order Now →
              </a>
            </div>
            <div style={{
              width: '200px',
              height: '200px',
              borderRadius: '16px',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              <img 
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop"
                alt="Pharmacy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* Baby & Kids */}
        <div style={{
          marginTop: '32px',
          background: 'white',
          borderRadius: '24px',
          padding: '32px',
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          maxWidth: '50%'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#fce7f3',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              marginBottom: '16px'
            }}>
              👶
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
              Baby & Kids Essentials
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px', lineHeight: 1.5 }}>
              Diapers, food, and toys for the little ones.
            </p>
            <a href="/products" style={{
              color: 'var(--primary)',
              fontWeight: '600',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              Explore →
            </a>
          </div>
          <div style={{
            width: '180px',
            height: '180px',
            borderRadius: '16px',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <img 
              src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&auto=format&fit=crop"
              alt="Baby products"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials