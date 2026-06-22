// src/pages/AdminDashboard.jsx
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import { Plus, X, ChevronDown } from 'lucide-react'

function AdminDashboard() {
  const { products, filteredProducts, categories, addProduct, updateProduct, deleteProduct, selectedCategory, setSelectedCategory } = useApp()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    weight: '',
    category: '',
    emoji: ''
  })

  const handleAdd = async (e) => {
    e.preventDefault()
    await addProduct({
      ...formData,
      price: Number(formData.price)
    })
    setShowAddModal(false)
    resetForm()
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    await updateProduct(editingProduct.id, {
      ...formData,
      price: Number(formData.price)
    })
    setShowEditModal(false)
    setEditingProduct(null)
  }

  const handleDelete = async () => {
    await deleteProduct(showDeleteConfirm.id)
    setShowDeleteConfirm(null)
  }

  const openEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: String(product.price),
      weight: product.weight,
      category: product.category,
      emoji: product.emoji
    })
    setShowEditModal(true)
  }

  const openDelete = (product) => {
    setShowDeleteConfirm(product)
  }

  const resetForm = () => {
    setFormData({ name: '', price: '', weight: '', category: '', emoji: '' })
  }

  const categoryName = categories.find(c => c.id === selectedCategory)?.name

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <div className="section-subtitle">Admin · Manage Catalogue</div>
            <h2 className="section-title">
              {selectedCategory ? categoryName : 'Featured Products'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              {filteredProducts.length} products available
            </p>
          </div>
          <button
            onClick={() => { resetForm(); setShowAddModal(true) }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '50px',
              background: 'var(--primary)',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '20px'
        }}>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isAdmin={true}
              onEdit={openEdit}
              onDelete={openDelete}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            No products in this category
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <ProductModal
          title="Add New Product"
          subtitle="Fill in details to add a new product to the catalogue."
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          onSubmit={handleAdd}
          onClose={() => setShowAddModal(false)}
          submitLabel="Add Product"
        />
      )}

      {/* Edit Product Modal */}
      {showEditModal && (
        <ProductModal
          title="Edit Product"
          subtitle="Update product information below."
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          onSubmit={handleEdit}
          onClose={() => { setShowEditModal(false); setEditingProduct(null) }}
          submitLabel="Update Product"
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <Modal onClose={() => setShowDeleteConfirm(null)}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
            Delete this product?
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
            "{showDeleteConfirm.name}" will be permanently removed from your catalogue.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setShowDeleteConfirm(null)}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                background: 'white',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: 'none',
                background: '#ef4444',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Yes, delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

function ProductModal({ title, subtitle, formData, setFormData, categories, onSubmit, onClose, submitLabel }) {
  return (
    <Modal onClose={onClose}>
      <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>{subtitle}</p>
      
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>
            Product Name
          </label>
          <input
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Organic Bananas"
            style={inputStyle}
            required
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>
              Price (₹)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              placeholder="49"
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>
              Weight
            </label>
            <input
              value={formData.weight}
              onChange={e => setFormData({ ...formData, weight: e.target.value })}
              placeholder="500 g"
              style={inputStyle}
              required
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>
            Category
          </label>
          <div style={{ position: 'relative' }}>
            <select
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
              required
            >
              <option value="">Choose category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <ChevronDown size={16} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>
            Product Emoji
          </label>
          <input
            value={formData.emoji}
            onChange={e => setFormData({ ...formData, emoji: e.target.value })}
            placeholder="🍌"
            style={inputStyle}
            maxLength={2}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              background: 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              background: 'var(--primary)',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  )
}

function Modal({ children, onClose }) {
  return (
    <>
      <div 
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200 }}
        onClick={onClose}
      />
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '480px',
        background: 'white',
        borderRadius: '20px',
        padding: '28px',
        zIndex: 201,
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            border: 'none',
            background: 'var(--bg-light)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>
        {children}
      </div>
    </>
  )
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '10px',
  border: '1px solid var(--border)',
  fontSize: '14px',
  outline: 'none',
  fontFamily: 'inherit'
}

export default AdminDashboard