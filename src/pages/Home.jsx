// src/pages/Home.jsx
import Herosection from '../components/Herosection'
import Categories from '../components/Categories'
import Testimonials from '../components/Testimonials'
import ProductCard from '../components/ProductCard'
import { useApp } from '../context/AppContext'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

function Home() {
  const { products, filteredProducts, selectedCategory, setSelectedCategory } = useApp()
  const featuredProducts = filteredProducts.slice(0, 10)

  return (
    <div>
      <Herosection />
      <Categories />
      <Testimonials />
      
      {/* Featured Products */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <div className="section-subtitle">Admin · Manage Catalogue</div>
              <h2 className="section-title">Featured Products</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                {filteredProducts.length} products available
              </p>
            </div>
            <Link to="/admin" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '50px',
              background: 'var(--primary)',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              <Plus size={18} />
              Add Product
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '20px'
          }}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home