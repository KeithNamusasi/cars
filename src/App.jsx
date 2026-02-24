import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Filters from './components/Filters'
import CarListings from './components/CarListings'
import CarDetail from './components/CarDetail'
import Cart from './components/Cart'
import Footer from './components/Footer'

function App() {
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [cart, setCart] = useState([])
  const [makes, setMakes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCars()
    fetchMakes()
  }, [])

  const fetchCars = async (params = {}) => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams(params).toString()
      const response = await fetch(`/api/cars${queryParams ? `?${queryParams}` : ''}`)
      const data = await response.json()
      setCars(data)
      setFilteredCars(data)
    } catch (error) {
      console.error('Error fetching cars:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMakes = async () => {
    try {
      const response = await fetch('/api/makes')
      const data = await response.json()
      setMakes(data)
    } catch (error) {
      console.error('Error fetching makes:', error)
    }
  }

  const handleSearch = (searchTerm) => {
    // If search term is empty, show all cars
    if (!searchTerm.trim()) {
      setFilteredCars(cars)
      return
    }
    
    // Use backend search for better performance and consistency
    fetchCars({ search: searchTerm })
  }

  const handleFilter = (filters) => {
    const filtered = cars.filter(car => {
      const matchMake = !filters.make || car.make === filters.make
      const matchCategory = !filters.category || car.category === filters.category
      const matchLocation = !filters.location || car.location.toLowerCase().includes(filters.location.toLowerCase())
      const matchPrice = (!filters.maxPrice || car.price <= parseFloat(filters.maxPrice))
      return matchMake && matchCategory && matchLocation && matchPrice
    })
    setFilteredCars(filtered)
  }

  const addToCart = (car) => {
    setCart(prev => [...prev, car])
  }

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <Router>
      <div className="App">
        <Header cartCount={cart.length} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero onSearch={handleSearch} />
              <Filters
                makes={makes}
                onFilter={handleFilter}
                onReset={() => setFilteredCars(cars)}
              />
              <CarListings
                cars={filteredCars}
                loading={loading}
                onAddToCart={addToCart}
              />
            </>
          } />
          <Route path="/car/:id" element={<CarDetail onAddToCart={addToCart} />} />
          <Route path="/cart" element={
            <Cart
              cart={cart}
              onRemove={removeFromCart}
              onClear={clearCart}
            />
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App