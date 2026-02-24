import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function CarDetail({ onAddToCart }) {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCar()
  }, [id])

  const fetchCar = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/cars/${id}`)
      const data = await response.json()
      setCar(data)
    } catch (error) {
      console.error('Error fetching car:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="py-32 text-center">
        <div className="inline-block animate-spin text-5xl mb-4">🔄</div>
        <p className="text-xl text-gray-500 font-medium">Fetching excellence...</p>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="py-32 text-center">
        <div className="text-5xl mb-4 text-gray-300">🚗</div>
        <p className="text-xl text-gray-500 font-medium">Vehicle information unavailable.</p>
        <Link to="/" className="text-blue-600 font-bold mt-4 inline-block">Return to Marketplace</Link>
      </div>
    )
  }

  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <Link to="/" className="text-sm font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors mb-12 inline-block">
          ← Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src={car.image_url}
                alt={`${car.make} ${car.model}`}
                className="w-full h-[600px] object-cover transition-transform duration-1000 hover:scale-105"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800'
                }}
              />
              <div className="absolute top-8 right-8 bg-black/80 backdrop-blur px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest text-white italic ring-1 ring-white/20">
                {car.category}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="h-32 bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 cursor-pointer hover:border-blue-300 transition-all">
                  <img src={car.image_url} className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity" alt="thumb" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-12 rounded-[3.5rem] border border-gray-100 sticky top-32">
            <div className="mb-10">
              <span className="text-blue-600 font-black uppercase tracking-tighter text-lg">{car.category} from {car.location}</span>
              <h1 className="text-6xl font-black text-gray-900 leading-tight mb-2 tracking-tighter">{car.make} {car.model}</h1>
              <p className="text-2xl text-gray-400 font-bold tracking-widest">{car.year}</p>
            </div>

            <div className="mb-12">
              <p className="text-5xl font-black text-gray-900 mb-2 tracking-tighter">${car.price.toLocaleString()}</p>
              <p className="text-gray-400 font-medium">Excluding taxes and global shipping</p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-12 border-t border-gray-200 pt-8">
              {[
                { label: 'Fuel', value: car.fuel_type, icon: '🛢️' },
                { label: 'Gearbox', value: car.transmission, icon: '⚙️' },
                { label: 'Mileage', value: `${car.mileage.toLocaleString()} mi`, icon: '📊' },
                { label: 'Exterior', value: car.color, icon: '🎨' }
              ].map(spec => (
                <div key={spec.label} className="flex justify-between items-center py-2">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                    <span>{spec.icon}</span> {spec.label}
                  </span>
                  <span className="text-gray-900 font-black tracking-tight">{spec.value}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-600 leading-relaxed mb-12 text-lg italic bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              "{car.description}"
            </p>

            <div className="flex gap-4">
              <button
                className="flex-1 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 text-xl"
                onClick={() => onAddToCart(car)}
              >
                Add to Cart
              </button>
              <button className="flex-1 py-5 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all active:scale-95 text-xl">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CarDetail