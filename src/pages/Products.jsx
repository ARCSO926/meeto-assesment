// src/pages/Products.jsx
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import { X } from 'lucide-react'

function Products() {
  const { filteredProducts, selectedCategory, setSelectedCategory, categories } = useApp()

  const categoryName = categories.find(c => c.id === selectedCategory)?.name

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h2 className="section-title">
              {selectedCategory ? categoryName : 'All Products'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              {filteredProducts.length} products available
            </p>
          </div>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'white',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <X size={14} />
              Clear filter
            </button>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '20px'
        }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: 'var(--text-muted)'
          }}>
            <p style={{ fontSize: '18px', marginBottom: '8px' }}>No products found</p>
            <p>Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products