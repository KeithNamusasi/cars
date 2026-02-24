import React, { useState } from 'react'
import CarAnimation from './CarAnimation'

function Hero({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
          Drive the <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Future</span> Globally
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          From daily commuters to track-ready supercars, trucks, and buses.
          Discover the world's finest vehicles in one elite marketplace.
        </p>

        <form className="max-w-2xl mx-auto relative group" onSubmit={handleSearch}>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
          <div className="relative flex p-2 bg-white rounded-2xl shadow-xl">
            <input
              type="text"
              placeholder="Search make, model, or category..."
              className="flex-1 px-4 py-4 text-lg border-none focus:ring-0 rounded-l-xl outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all transform hover:scale-[1.02] active:scale-95"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
          <Link to="/category/car" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <img src="https://img.icons8.com/ios-filled/16/gray/sedan.png" alt="Cars" />
            Cars
          </Link>
          <span className="w-1 h-1 rounded-full bg-gray-300 self-center"></span>
          <Link to="/category/truck" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <img src="https://img.icons8.com/ios-filled/16/gray/pickup-truck.png" alt="Trucks" />
            Trucks
          </Link>
          <span className="w-1 h-1 rounded-full bg-gray-300 self-center"></span>
          <Link to="/category/bus" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <img src="https://img.icons8.com/ios-filled/16/gray/bus.png" alt="Buses" />
            Buses
          </Link>
          <span className="w-1 h-1 rounded-full bg-gray-300 self-center"></span>
          <Link to="/category/supercar" className="flex items-center gap-2 text-indigo-600 hover:text-blue-600 transition-colors">
            <img src="https://img.icons8.com/ios-filled/16/indigo/race-car.png" alt="Supercars" />
            Supercars
          </Link>
        </div>
      </div>

      {/* Car Animation */}
      <div className="mt-16">
        <CarAnimation />
      </div>
    </section>
  )
}

export default Hero