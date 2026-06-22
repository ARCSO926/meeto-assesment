// src/components/ProductCard.jsx
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Pencil, Trash2, Plus, Minus, Check } from 'lucide-react'

function ProductCard({ product, isAdmin = false, onEdit, onDelete }) {
  const { addToCart, cart, updateQuantity } = useApp()
  const [showToast, setShowToast] = useState(false)
  
  const cartItem = cart.find(item => item.id === product.id)
  const inCart = !!cartItem

  const handleAdd = () => {
    addToCart(product)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '16px',
      border: '1px solid var(--border)',
      position: 'relative',
      transition: 'all 0.2s'
    }}>
      {/* Weight badge */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        fontSize: '11px',
        fontWeight: '600',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {product.weight}
      </div>

      {/* Admin actions */}
      {isAdmin && (
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          display: 'flex',
          gap: '6px'
        }}>
          <button
            onClick={() => onEdit?.(product)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--bg-light)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)'
            }}
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete?.(product)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--bg-light)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ef4444'
            }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}

      {/* Product Image */}
      <div style={{
        width: '100%',
        aspectRatio: '1',
        background: 'var(--primary-light)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '80px',
        marginBottom: '16px',
        marginTop: '20px'
      }}>
        {product.emoji}
      </div>

      {/* Category */}
      <div style={{
        fontSize: '10px',
        fontWeight: '600',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: '6px'
      }}>
        {product.category?.replace(/-/g, ' ')}
      </div>

      {/* Name */}
      <h3 style={{
        fontSize: '15px',
        fontWeight: '700',
        marginBottom: '12px',
        lineHeight: 1.3
      }}>
        {product.name}
      </h3>

      {/* Price & Action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '18px', fontWeight: '800' }}>
          ₹{product.price}
        </span>
        
        {isAdmin ? null : inCart ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--primary-light)',
            borderRadius: '10px',
            padding: '6px'
          }}>
            <button
              onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                border: 'none',
                background: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Minus size={14} />
            </button>
            <span style={{ fontWeight: '700', minWidth: '20px', textAlign: 'center', fontSize: '14px' }}>
              {cartItem.quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                border: 'none',
                background: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Plus size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Plus size={16} />
            Add
          </button>
        )}
      </div>

      {/* Toast */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'var(--primary)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: '600',
          zIndex: 300,
          animation: 'slideIn 0.3s ease'
        }}>
          <Check size={16} />
          Added to cart: {product.name}
        </div>
      )}
    </div>
  )
}

export default ProductCard