import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12 mt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic tracking-tighter flex items-center gap-2">
              <img src="https://img.icons8.com/ios-filled/32/blue/car.png" alt="GlobalDrive" />
              GlobalDrive
            </Link>
            <p className="text-gray-400 leading-relaxed font-medium">
              The world's premier digital marketplace for elite vehicles.
              From daily drivers to track-exclusive supercars, we deliver excellence across every continent.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Inventory</h3>
            <ul className="space-y-4">
              <li><Link to="/cars" className="text-gray-400 hover:text-white transition-colors font-bold">Cars A-Z</Link></li>
              <li><Link to="/category/car" className="text-gray-400 hover:text-white transition-colors font-bold">Cars</Link></li>
              <li><Link to="/category/suv" className="text-gray-400 hover:text-white transition-colors font-bold">SUVs</Link></li>
              <li><Link to="/category/truck" className="text-gray-400 hover:text-white transition-colors font-bold">Trucks</Link></li>
              <li><Link to="/category/supercar" className="text-gray-400 hover:text-white transition-colors font-bold">Supercars</Link></li>
              <li><Link to="/category/bus" className="text-gray-400 hover:text-white transition-colors font-bold">Buses</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors font-bold">New Arrivals</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Platform</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors font-bold">Our Story</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors font-bold">Global Network</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors font-bold">Shipping Policy</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors font-bold">Privacy</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Contact</h3>
            <ul className="space-y-4 font-bold text-gray-400">
              <li className="flex items-center gap-3">
                <img src="https://img.icons8.com/ios-filled/16/gray/phone.png" alt="Phone" />
                +1 (800) GLOBAL-DRIVE
              </li>
              <li className="flex items-center gap-3">
                <img src="https://img.icons8.com/ios-filled/16/gray/email.png" alt="Email" />
                elite@globaldrive.com
              </li>
              <li className="flex items-center gap-3 text-blue-400">
                <img src="https://img.icons8.com/ios-filled/16/blue/globe.png" alt="Globe" />
                120 Countries Served
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-500 font-bold text-sm tracking-widest uppercase">
            © 2024 GlobalDrive Elite Marketplace.
          </p>
          <div className="flex gap-8 text-2xl grayscale hover:grayscale-0 transition-all">
            <img src="https://img.icons8.com/ios-filled/24/gray/credit-card.png" alt="Credit Card" />
            <img src="https://img.icons8.com/ios-filled/24/gray/paypal.png" alt="PayPal" />
            <img src="https://img.icons8.com/ios-filled/24/gray/bitcoin.png" alt="Bitcoin" />
            <img src="https://img.icons8.com/ios-filled/24/gray/bank.png" alt="Bank Transfer" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer