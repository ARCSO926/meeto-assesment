// src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [categories, setCategories] = useState([
    { id: 'fruits-vegetables', name: 'Fruits & Vegetables', emoji: '🥦' },
    { id: 'dairy', name: 'Dairy', emoji: '🥛' },
    { id: 'bakery', name: 'Bakery', emoji: '🥐' },
    { id: 'snacks', name: 'Snacks', emoji: '🍿' },
    { id: 'beverages', name: 'Beverages', emoji: '🥤' },
    { id: 'frozen-foods', name: 'Frozen Foods', emoji: '🧊' },
    { id: 'pharmacy', name: 'Pharmacy', emoji: '💊' },
    { id: 'pet-care', name: 'Pet Care', emoji: '🐾' },
    { id: 'personal-care', name: 'Personal Care', emoji: '🧴' },
    { id: 'tea-coffee', name: 'Tea & Coffee', emoji: '☕' },
    { id: 'atta-rice', name: 'Atta & Rice', emoji: '🌾' },
  ])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch products from Supabase
  useEffect(() => {
    fetchProducts()
    const savedCart = localStorage.getItem('cart')
    if (savedCart) setCart(JSON.parse(savedCart))
    
    // Check auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    
    return () => listener.subscription.unsubscribe()
  }, [])

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setProducts(data)
    } else {
      // Fallback demo data
      setProducts([
        { id: 1, name: 'Basmati Rice', price: 540, weight: '5 KG', category: 'atta-rice', emoji: '🍚' },
        { id: 2, name: 'Aashirvaad Atta', price: 320, weight: '5 KG', category: 'atta-rice', emoji: '🌾' },
        { id: 3, name: 'Nescafe Gold', price: 599, weight: '100 G', category: 'tea-coffee', emoji: '☕' },
        { id: 4, name: 'Tata Premium Tea', price: 280, weight: '500 G', category: 'tea-coffee', emoji: '🍵' },
        { id: 5, name: 'Colgate Toothpaste', price: 99, weight: '150 G', category: 'personal-care', emoji: '🪥' },
        { id: 6, name: 'Dove Body Wash', price: 249, weight: '250 ML', category: 'personal-care', emoji: '🧴' },
        { id: 7, name: 'Whiskas Cat Treats', price: 180, weight: '60 G', category: 'pet-care', emoji: '🐱' },
        { id: 8, name: 'Pedigree Dog Food', price: 320, weight: '1.2 KG', category: 'pet-care', emoji: '🐶' },
        { id: 9, name: 'Vitamin C Tablets', price: 199, weight: '30 TABS', category: 'pharmacy', emoji: '💊' },
        { id: 10, name: 'Paracetamol 500mg', price: 25, weight: '10 TABS', category: 'pharmacy', emoji: '💊' },
        { id: 11, name: 'Frozen Green Peas', price: 95, weight: '500 G', category: 'frozen-foods', emoji: '🟢' },
        { id: 12, name: 'Vanilla Ice Cream', price: 220, weight: '500 ML', category: 'frozen-foods', emoji: '🍨' },
        { id: 13, name: 'Mineral Water', price: 20, weight: '1 L', category: 'beverages', emoji: '💧' },
        { id: 14, name: 'Tropicana Orange', price: 110, weight: '1 L', category: 'beverages', emoji: '🧃' },
        { id: 15, name: 'Coca Cola', price: 40, weight: '750 ML', category: 'beverages', emoji: '🥤' },
        { id: 16, name: 'Roasted Almonds', price: 449, weight: '200 G', category: 'snacks', emoji: '🌰' },
        { id: 17, name: 'Dark Chocolate', price: 199, weight: '100 G', category: 'snacks', emoji: '🍫' },
        { id: 18, name: 'Lays Classic Salted', price: 30, weight: '75 G', category: 'snacks', emoji: '🥔' },
        { id: 19, name: 'Butter Croissant', price: 59, weight: '1 PC', category: 'bakery', emoji: '🥐' },
        { id: 20, name: 'Sourdough Bread', price: 119, weight: '400 G', category: 'bakery', emoji: '🍞' },
        { id: 21, name: 'Mozzarella Cheese', price: 249, weight: '200 G', category: 'dairy', emoji: '🧀' },
        { id: 22, name: 'Farm Eggs', price: 89, weight: '1 DOZEN', category: 'dairy', emoji: '🥚' },
        { id: 23, name: 'Amul Full Cream Milk', price: 68, weight: '1 L', category: 'dairy', emoji: '🥛' },
        { id: 24, name: 'Carrots', price: 45, weight: '1 KG', category: 'fruits-vegetables', emoji: '🥕' },
        { id: 25, name: 'Baby Spinach', price: 59, weight: '500 G', category: 'fruits-vegetables', emoji: '🥬' },
        { id: 26, name: 'Tomatoes', price: 39, weight: '1 KG', category: 'fruits-vegetables', emoji: '🍅' },
        { id: 27, name: 'Red Apples', price: 189, weight: '1 KG', category: 'fruits-vegetables', emoji: '🍎' },
        { id: 28, name: 'Fresh Bananas', price: 49, weight: '1 DOZEN', category: 'fruits-vegetables', emoji: '🍌' },
      ])
    }
  }

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      let newCart
      if (existing) {
        newCart = prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        newCart = [...prev, { ...product, quantity: 1 }]
      }
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev => {
      const newCart = prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const addProduct = async (product) => {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
    
    if (!error && data) {
      setProducts(prev => [data[0], ...prev])
      return true
    }
    // Fallback: add to local state
    const newProduct = { ...product, id: Date.now() }
    setProducts(prev => [newProduct, ...prev])
    return true
  }

  const updateProduct = async (id, updates) => {
    const { error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
    
    if (!error) {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
      return true
    }
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
    return true
  }

  const deleteProduct = async (id) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    setProducts(prev => prev.filter(p => p.id !== id))
    return true
  }

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products

  return (
    <AppContext.Provider value={{
      products,
      cart,
      categories,
      selectedCategory,
      setSelectedCategory,
      isAdmin,
      setIsAdmin,
      user,
      setUser,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      cartCount,
      addProduct,
      updateProduct,
      deleteProduct,
      filteredProducts,
      fetchProducts
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)