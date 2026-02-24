import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CarIcon from './CarIcon'

function CategoryPage() {
  const { category } = useParams()
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCars()
  }, [category])

  const fetchCars = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/cars?category=${category}`)
      const data = await response.json()
      setCars(data)
    } catch (error) {
      console.error('Error fetching cars:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="py-32 text-center">
        <div className="inline-block animate-spin text-5xl mb-4">
          <img src="https://img.icons8.com/ios-filled/64/gray/loading.png" alt="Loading" />
        </div>
        <p className="text-xl text-gray-500 font-medium">Loading {category}...</p>
      </div>
    )
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <CarIcon category={category} size={48} />
            <h1 className="text-5xl font-black text-gray-900">
              {capitalizeFirstLetter(category)} Collection
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our premium selection of {category}s from around the world. 
            Handpicked for performance, comfort, and style.
          </p>
        </div>

        {/* Category Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16 shadow-sm border border-blue-100">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-blue-600 mb-2">{cars.length}</div>
              <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">Available {category}s</div>
            </div>
            <div className="w-px bg-gray-300"></div>
            <div>
              <div className="text-4xl font-black text-blue-600 mb-2">
                ${Math.min(...cars.map(c => c.price)).toLocaleString()}
              </div>
              <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">Starting Price</div>
            </div>
            <div className="w-px bg-gray-300"></div>
            <div>
              <div className="text-4xl font-black text-blue-600 mb-2">
                {Math.max(...cars.map(c => c.year))}
              </div>
              <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">Newest Model</div>
            </div>
          </div>
        </div>

        {/* Car Listings */}
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map(car => (
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
              No {category}s available at the moment
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default CategoryPage