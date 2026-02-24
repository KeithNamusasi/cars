import React from 'react'
import { Link } from 'react-router-dom'

function CarListings({ cars, loading, onAddToCart }) {
  if (loading) {
    return (
      <div className="py-32 text-center">
        <div className="inline-block animate-spin text-5xl mb-4">🔄</div>
        <p className="text-xl text-gray-500 font-medium">Curating world-class vehicles...</p>
      </div>
    )
  }

  if (cars.length === 0) {
    return (
      <div className="py-32 text-center">
        <div className="text-5xl mb-4 text-gray-300">🔍</div>
        <p className="text-xl text-gray-500 font-medium font-serif italic text-pretty">
          No vehicles matching your elite criteria were found in our global database.
        </p>
      </div>
    )
  }

  return (
    <section className="py-24 bg-white" id="listings">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Global Marketplace</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Showing {cars.length} vehicles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cars.map(car => (
            <div key={car.id} className="group relative bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="h-64 relative overflow-hidden">
                <img
                  src={car.image_url}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400'
                  }}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest text-gray-900 shadow-sm border border-gray-100 italic">
                  {car.category}
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                  <span>📍 {car.location}</span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase">{car.make} {car.model}</h3>
                  <span className="text-gray-400 font-bold">{car.year}</span>
                </div>

                <div className="flex items-center gap-4 mb-6 text-sm text-gray-400 font-bold">
                  <span>⚙️ {car.transmission}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>📊 {car.mileage.toLocaleString()} mi</span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <p className="text-3xl font-black text-blue-600 tracking-tighter">${car.price.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <Link
                      to={`/car/${car.id}`}
                      className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all border border-gray-100"
                      title="View Details"
                    >
                      👁️
                    </Link>
                    <button
                      onClick={() => onAddToCart(car)}
                      className="px-6 py-3 bg-gray-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-gray-200"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CarListings