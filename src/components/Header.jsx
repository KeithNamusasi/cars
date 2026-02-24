import { Link } from 'react-router-dom'
import CarIcon from './CarIcon'

function Header({ cartCount }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
          <img 
            src="https://img.icons8.com/ios-filled/50/667eea/car.png" 
            alt="GlobalDrive"
            className="w-8 h-8"
          />
          GlobalDrive
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-gray-600 font-semibold">
          <Link to="/" className="hover:text-blue-600 transition-colors">Marketplace</Link>
          <Link to="/cars" className="hover:text-blue-600 transition-colors">Cars A-Z</Link>
          <Link to="/category/car" className="hover:text-blue-600 transition-colors">Cars</Link>
          <Link to="/category/suv" className="hover:text-blue-600 transition-colors">SUVs</Link>
          <Link to="/category/truck" className="hover:text-blue-600 transition-colors">Trucks</Link>
          <Link to="/category/supercar" className="hover:text-blue-600 transition-colors">Supercars</Link>
          <Link to="/category/bus" className="hover:text-blue-600 transition-colors">Buses</Link>

          <Link to="/cart" className="relative p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
            <img 
              src="https://img.icons8.com/ios-filled/24/666666/shopping-cart.png" 
              alt="Cart"
              className="w-6 h-6"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        <div className="md:hidden">
          {/* Mobile menu icon would go here */}
          <Link to="/cart" className="text-2xl pt-2 block">🛒</Link>
        </div>
      </div>
    </header>
  )
}

export default Header