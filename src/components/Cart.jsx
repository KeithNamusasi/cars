import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Cart({ cart, onRemove, onClear }) {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  const calculateTotal = () => {
    return cart.reduce((total, car) => total + car.price, 0)
  }

  const handleCheckout = () => {
    setCheckoutSuccess(true)
    setTimeout(() => {
      onClear()
      setCheckoutSuccess(false)
    }, 3000)
  }

  if (cart.length === 0) {
    if (checkoutSuccess) {
      return (
        <div className="py-40 text-center animate-in fade-in zoom-in duration-500">
          <div className="text-8xl mb-8">✨</div>
          <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter">Your Order is Placed!</h2>
          <p className="text-xl text-gray-500 max-w-lg mx-auto leading-relaxed">
            Thank you for choosing GlobalDrive. Your vehicle is now being prepared for international shipment.
          </p>
          <Link to="/" className="mt-12 inline-block px-12 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
            Return to Marketplace
          </Link>
        </div>
      )
    }

    return (
      <div className="py-40 text-center">
        <div className="text-8xl mb-8 opacity-20 grayscale">🛒</div>
        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Your cart is currently empty</h2>
        <p className="text-xl text-gray-500 mb-10">Start your journey by exploring our global inventory.</p>
        <Link to="/" className="px-10 py-5 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all active:scale-95 shadow-2xl shadow-gray-200">
          Back to Vehicles
        </Link>
      </div>
    )
  }

  return (
    <section className="py-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="text-blue-600 font-black uppercase tracking-widest text-sm">Your Selection</span>
            <h2 className="text-5xl font-black text-gray-900 tracking-tighter mt-2">Shopping Bag</h2>
          </div>
          <button
            onClick={onClear}
            className="text-gray-400 font-bold hover:text-red-500 transition-colors uppercase tracking-widest text-xs"
          >
            Clear all items
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((car, index) => (
              <div key={index} className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 items-center transition-all hover:shadow-xl">
                <div className="w-full md:w-56 h-36 rounded-2xl overflow-hidden">
                  <img
                    src={car.image_url}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200'
                    }}
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest">{car.category}</span>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">{car.make} {car.model}</h3>
                  <p className="text-gray-400 font-bold">{car.year} • {car.location}</p>
                </div>
                <div className="text-right flex flex-col items-center md:items-end gap-2">
                  <p className="text-2xl font-black text-gray-900 tracking-tighter font-mono">${car.price.toLocaleString()}</p>
                  <button
                    className="p-3 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all active:scale-95"
                    onClick={() => onRemove(index)}
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200 sticky top-32">
            <h3 className="text-2xl font-black text-gray-900 mb-8 tracking-tighter">Summary</h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500 font-bold uppercase text-xs tracking-widest">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-bold uppercase text-xs tracking-widest">
                <span>Shipping</span>
                <span className="text-green-500 text-[10px]">Free Worldwide</span>
              </div>
              <div className="flex justify-between text-gray-900 font-black text-lg py-4 border-t border-gray-100 mt-4">
                <span>Subtotal</span>
                <span className="font-mono text-2xl tracking-tighter">${calculateTotal().toLocaleString()}</span>
              </div>
            </div>

            <button
              className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 text-xl disabled:bg-gray-200 disabled:shadow-none"
              onClick={handleCheckout}
              disabled={checkoutSuccess}
            >
              {checkoutSuccess ? 'Securing Transaction...' : 'Reserve Now'}
            </button>
            <p className="text-[10px] text-gray-400 font-medium mt-6 text-center leading-relaxed">
              By clicking Reserve, you agree to our terms of global vehicle delivery and secure payment processing.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart