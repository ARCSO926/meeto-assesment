// src/components/Categories.jsx
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

function Categories() {
  const { categories, setSelectedCategory } = useApp()
  const navigate = useNavigate()

  const handleClick = (catId) => {
    setSelectedCategory(catId)
    navigate('/products')
  }

  return (
    <section style={{ padding: '40px 0' }}>
      <div className="container">
        <div className="section-subtitle">Shop by Category</div>
        <h2 className="section-title" style={{ marginBottom: '32px' }}>
          Everything you need, all in one place
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '16px'
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                padding: '20px 12px',
                borderRadius: '16px',
                border: 'none',
                background: 'var(--bg-light)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '13px',
                fontWeight: '500'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--primary-light)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--bg-light)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ fontSize: '36px' }}>{cat.emoji}</span>
              <span style={{ textAlign: 'center', lineHeight: 1.3 }}>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories