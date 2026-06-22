// src/pages/Checkout.jsx
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { Check, CreditCard, MapPin, Truck } from 'lucide-react'

function Checkout() {
  const { cart, cartTotal, setCart } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    setCart([])
    localStorage.removeItem('cart')
    setTimeout(() => navigate('/'), 3000)
  }

  if (cart.length === 0 && !orderPlaced) {
    navigate('/cart')
    return null
  }

  if (orderPlaced) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        padding: '40px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'var(--primary-light)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Check size={40} color="var(--primary)" />
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: '800' }}>Order Placed!</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Your fresh groceries are on the way. Redirecting to home...
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 className="section-title" style={{ marginBottom: '32px' }}>Checkout</h2>
        
        {/* Progress */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '40px' }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{
              flex: 1,
              height: '4px',
              borderRadius: '2px',
              background: s <= step ? 'var(--primary)' : 'var(--border)'
            }} />
          ))}
        </div>

        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid var(--border)'
        }}>
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={20} color="var(--primary)" />
                Delivery Address
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input placeholder="Full Name" style={inputStyle} />
                <input placeholder="Phone Number" style={inputStyle} />
                <input placeholder="Address Line 1" style={inputStyle} />
                <input placeholder="Address Line 2" style={inputStyle} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <input placeholder="City" style={inputStyle} />
                  <input placeholder="PIN Code" style={inputStyle} />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck size={20} color="var(--primary)" />
                Delivery Slot
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Today, 2:00 PM - 4:00 PM', 'Today, 4:00 PM - 6:00 PM', 'Today, 6:00 PM - 8:00 PM', 'Tomorrow, 10:00 AM - 12:00 PM'].map((slot, i) => (
                  <label key={i} style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: '2px solid var(--border)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <input type="radio" name="slot" defaultChecked={i === 0} />
                    <span>{slot}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CreditCard size={20} color="var(--primary)" />
                Payment
              </h3>
              <div style={{ marginBottom: '24px' }}>
                {cart.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom: '1px solid var(--border)'
                  }}>
                    <span>{item.name} x{item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '16px 0',
                  fontSize: '18px',
                  fontWeight: '800'
                }}>
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['UPI', 'Credit/Debit Card', 'Cash on Delivery'].map((method, i) => (
                  <label key={i} style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: '2px solid var(--border)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <input type="radio" name="payment" defaultChecked={i === 0} />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                style={{
                  padding: '14px 28px',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  background: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                style={{
                  marginLeft: 'auto',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'var(--primary)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                style={{
                  marginLeft: 'auto',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'var(--primary)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '12px',
  border: '1px solid var(--border)',
  fontSize: '15px',
  outline: 'none',
  fontFamily: 'inherit'
}

export default Checkout