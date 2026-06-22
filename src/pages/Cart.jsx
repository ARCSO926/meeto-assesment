// src/pages/Cart.jsx
import { useApp } from '../context/AppContext'
import { Link } from 'react-router-dom'
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight } from 'lucide-react'

function Cart() {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useApp()

  if (cart.length === 0) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        padding: '40px'
      }}>
        <ShoppingCart size={64} strokeWidth={1} color="var(--text-muted)" />
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
            Your cart is empty
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            Add fresh groceries to get started.
          </p>
          <Link to="/products" className="btn-primary">
            Start Shopping
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <h2 className="section-title" style={{ marginBottom: '32px' }}>Your Cart</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cart.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                gap: '20px',
                padding: '20px',
                background: 'white',
                borderRadius: '16px',
                border: '1px solid var(--border)'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--primary-light)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '40px',
                  flexShrink: 0
                }}>
                  {item.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h4 style={{ fontWeight: '700' }}>{item.name}</h4>
                    <span style={{ fontWeight: '800', fontSize: '18px' }}>₹{item.price * item.quantity}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    {item.weight}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'var(--bg-light)',
                      borderRadius: '10px',
                      padding: '4px'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '32px',
                          height: '32px',
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
                      <span style={{ fontWeight: '700', minWidth: '24px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '32px',
                          height: '32px',
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
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#ef4444',
                        background: 'none',
                        border: 'none',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid var(--border)',
            height: 'fit-content',
            position: 'sticky',
            top: '100px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
              Order Summary
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Delivery</span>
                <span style={{ color: 'var(--primary)' }}>FREE</span>
              </div>
              <div style={{ 
                borderTop: '1px solid var(--border)', 
                paddingTop: '12px',
                display: 'flex', 
                justifyContent: 'space-between',
                fontSize: '18px',
                fontWeight: '700'
              }}>
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>
            <Link to="/checkout" style={{
              display: 'block',
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              background: 'var(--primary)',
              color: 'white',
              textAlign: 'center',
              fontWeight: '700',
              fontSize: '16px'
            }}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart