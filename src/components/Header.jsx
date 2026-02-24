import { Link } from 'react-router-dom'

function Header({ cartCount }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
          <span className="text-3xl">🚗</span>
          GlobalDrive
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-gray-600 font-semibold">
          <Link to="/" className="hover:text-blue-600 transition-colors">Marketplace</Link>
          <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>

          <Link to="/cart" className="relative p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
            <span className="text-xl">🛒</span>
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