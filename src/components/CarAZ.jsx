import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CarIcon from './CarIcon'

function CarAZ() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedLetter, setSelectedLetter] = useState('A')
  const [filteredCars, setFilteredCars] = useState([])

  useEffect(() => {
    fetchCars()
  }, [])

  useEffect(() => {
    if (cars.length > 0) {
      const filtered = cars.filter(car => 
        car.make.charAt(0).toUpperCase() === selectedLetter
      )
      setFilteredCars(filtered)
    }
  }, [selectedLetter, cars])

  const fetchCars = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/cars')
      const data = await response.json()
      setCars(data)
    } catch (error) {
      console.error('Error fetching cars:', error)
    } finally {
      setLoading(false)
    }
  }

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  if (loading) {
    return (
      <div className="py-32 text-center">
        <div className="inline-block animate-spin text-5xl mb-4">
          <img src="https://img.icons8.com/ios-filled/64/gray/loading.png" alt="Loading" />
        </div>
        <p className="text-xl text-gray-500 font-medium">Loading cars...</p>
      </div>
    )
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Cars A-Z</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our extensive collection of vehicles from around the world, organized alphabetically by brand.
          </p>
        </div>

        {/* Alphabet Navigation */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-16 shadow-sm border border-gray-100">
          <div className="flex flex-wrap justify-center gap-3">
            {alphabet.map(letter => {
              const hasCars = cars.some(car => 
                car.make.charAt(0).toUpperCase() === letter
              )
              
              return (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={
                    selectedLetter === letter 
                      ? 'w-10 h-10 rounded-lg font-bold bg-blue-600 text-white shadow-lg shadow-blue-200 transition-all duration-300'
                      : hasCars 
                        ? 'w-10 h-10 rounded-lg font-bold bg-white hover:bg-blue-50 text-gray-600 hover:text-blue-600 border border-gray-200 transition-all duration-300'
                        : 'w-10 h-10 rounded-lg font-bold bg-gray-100 text-gray-300 cursor-not-allowed border border-gray-200 transition-all duration-300'
                  }
                  disabled={!hasCars}
                >
                  {letter}
                </button>
              )
            })}
          </div>
        </div>

        {/* Car Listings */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map(car => (
              <div key={car.id} className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={car.image_url}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400'
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest text-gray-900 shadow-sm border border-gray-100 flex items-center gap-2">
                    <CarIcon category={car.category} size={12} />
                    {car.category}
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                    <img src="https://img.icons8.com/ios-filled/12/white/marker.png" alt="Location" />
                    {car.location}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase">{car.make} {car.model}</h3>
                    <span className="text-gray-400 font-bold">{car.year}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-400 font-bold">
                    <span className="flex items-center gap-1">
                      <img src="https://img.icons8.com/ios-filled/16/gray/gear.png" alt="Transmission" />
                      {car.transmission}
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center gap-1">
                      <img src="https://img.icons8.com/ios-filled/16/gray/speedometer.png" alt="Mileage" />
                      {car.mileage.toLocaleString()} mi
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-3xl font-black text-blue-600 tracking-tighter">${car.price.toLocaleString()}</p>
                    <div className="flex gap-2">
                      <Link
                        to={`/car/${car.id}`}
                        className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all border border-gray-100"
                        title="View Details"
                      >
                        <img src="https://img.icons8.com/ios-filled/20/gray/view.png" alt="View" />
                      </Link>
                      <button
                        className="px-6 py-3 bg-gray-900 text-white font-black rounded-xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-gray-200"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="text-5xl mb-4 text-gray-300">
              <img src="https://img.icons8.com/ios-filled/64/gray/search.png" alt="No cars" />
            </div>
            <p className="text-xl text-gray-500 font-medium">
              No vehicles found starting with the letter "{selectedLetter}"
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default CarAZ