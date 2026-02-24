import React, { useState } from 'react'

function Filters({ makes, onFilter, onReset }) {
  const [filters, setFilters] = useState({
    make: '',
    category: '',
    location: '',
    minPrice: '',
    maxPrice: ''
  })

  const categories = ['car', 'supercar', 'truck', 'bus', 'suv']

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const handleApply = () => {
    onFilter(filters)
  }

  const handleReset = () => {
    const resetFilters = {
      make: '',
      category: '',
      location: '',
      minPrice: '',
      maxPrice: ''
    }
    setFilters(resetFilters)
    onReset()
  }

  return (
    <section className="bg-gray-50 py-12 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-6 items-end justify-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Category</label>
            <select
              name="category"
              className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              value={filters.category}
              onChange={handleChange}
            >
              <option value="">All Vehicles</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}s</option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Make</label>
            <select
              name="make"
              className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              value={filters.make}
              onChange={handleChange}
            >
              <option value="">All Makes</option>
              {makes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Location</label>
            <input
              name="location"
              type="text"
              placeholder="Country or City..."
              className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              value={filters.location}
              onChange={handleChange}
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Max Price</label>
            <input
              name="maxPrice"
              type="number"
              placeholder="Max Price ($)"
              className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              value={filters.maxPrice}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleApply}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95 shadow-blue-200"
            >
              Filter
            </button>
            <button
              onClick={handleReset}
              className="px-8 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Filters