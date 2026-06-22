// src/components/Navbar.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { MapPin, Search, ChevronDown, Shield, LogIn, ShoppingCart, X } from 'lucide-react'

function Navbar() {
  const { cartCount, categories, selectedCategory, setSelectedCategory, user } = useApp()
  const [showCategories, setShowCategories] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId === selectedCategory ? null : catId)
    setShowCategories(false)
    navigate('/products')
  }

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          padding: '12px 24px',
          height: '64px'
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'var(--primary)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '800',
              fontSize: '18px'
            }}>
              N
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '16px', lineHeight: 1.2 }}>Neiro Store</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>AI Powered Grocery</div>
            </div>
          </Link>

          {/* Delivery Location */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: 'var(--bg-light)',
            borderRadius: '8px',
            fontSize: '13px',
            cursor: 'pointer',
            flexShrink: 0
          }}>
            <MapPin size={14} color="var(--primary)" />
            <span>Deliver to <strong>Home · 10 min</strong></span>
            <ChevronDown size={14} />
          </div>

          {/* Search */}
          <div style={{
            flex: 1,
            position: 'relative',
            maxWidth: '500px'
          }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} />
            <input
              type="text"
              placeholder="Search for groceries, fruits, snacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 42px',
                borderRadius: '50px',
                border: '1px solid var(--border)',
                background: 'var(--bg-light)',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Categories Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowCategories(!showCategories)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'transparent',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Categories
                <ChevronDown size={16} />
              </button>
              
              {showCategories && (
                <>
                  <div 
                    style={{ position: 'fixed', inset: 0, zIndex: 99 }}
                    onClick={() => setShowCategories(false)}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '280px',
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '12px',
                    zIndex: 100,
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{ 
                      fontSize: '12px', 
                      fontWeight: '600', 
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      padding: '8px 12px'
                    }}>
                      Shop by Category
                    </div>
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: 'none',
                          background: selectedCategory === cat.id ? 'var(--primary-light)' : 'transparent',
                          cursor: 'pointer',
                          fontSize: '14px',
                          textAlign: 'left',
                          transition: 'all 0.2s'
                        }}
                      >
                        <span style={{ fontSize: '20px' }}>{cat.emoji}</span>
                        <span style={{ 
                          fontWeight: selectedCategory === cat.id ? '600' : '400',
                          color: selectedCategory === cat.id ? 'var(--primary)' : 'var(--text-primary)'
                        }}>
                          {cat.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Admin */}
            <Link to="/admin" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-secondary)'
            }}>
              <Shield size={18} />
              <span>Admin</span>
            </Link>

            {/* Login */}
            <Link to="/login" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-secondary)'
            }}>
              <LogIn size={18} />
              <span>Login</span>
            </Link>

            {/* Cart */}
            <button
              onClick={() => setShowCart(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '50px',
                border: 'none',
                background: 'var(--primary)',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                position: 'relative'
              }}
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  width: '22px',
                  height: '22px',
                  background: 'var(--accent)',
                  color: 'var(--text-primary)',
                  borderRadius: '50%',
                  fontSize: '11px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      {showCart && <CartSidebar onClose={() => setShowCart(false)} />}
    </>
  )
}

function CartSidebar({ onClose }) {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useApp()
  const navigate = useNavigate()

  return (
    <>
      <div 
        style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'rgba(0,0,0,0.5)', 
          zIndex: 200 
        }}
        onClick={onClose}
      />
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '420px',
        maxWidth: '100%',
        height: '100vh',
        background: 'white',
        zIndex: 201,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShoppingCart size={22} />
            <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Your Cart</h2>
            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </span>
          </div>
          <button 
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              background: 'var(--bg-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '16px 24px' }}>
          {cart.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: '16px',
              color: 'var(--text-muted)'
            }}>
              <ShoppingCart size={48} strokeWidth={1} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Your cart is empty
                </p>
                <p style={{ fontSize: '14px' }}>Add fresh groceries to get started.</p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '16px',
                  background: 'var(--bg-light)',
                  borderRadius: '16px'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'white',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    flexShrink: 0
                  }}>
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: '600', fontSize: '14px', marginBottom: '2px' }}>
                      {item.name}
                    </h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      {item.weight} · ₹{item.price}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'white',
                        borderRadius: '8px',
                        padding: '4px'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            border: 'none',
                            background: 'var(--bg-light)',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >−</button>
                        <span style={{ fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            border: 'none',
                            background: 'var(--bg-light)',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >+</button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          border: 'none',
                          background: 'transparent',
                          color: '#ef4444',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '14px', alignSelf: 'flex-start' }}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid var(--border)',
            background: 'var(--bg-light)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Delivery</span>
              <span style={{ color: 'var(--primary)' }}>FREE</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '16px',
              fontSize: '18px',
              fontWeight: '700'
            }}>
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
            <button
              onClick={() => {
                onClose()
                navigate('/checkout')
              }}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                background: 'var(--primary)',
                color: 'white',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar