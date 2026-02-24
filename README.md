# Car Sales E-commerce Application

A modern, responsive car sales e-commerce application built with React, Flask, and SQLite.

## Features

- 🚗 **Car Listings**: Browse through thousands of quality used cars
- 🔍 **Search & Filters**: Search by make, model, year, and price range
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🛒 **Shopping Cart**: Add cars to cart and complete checkout
- 📸 **Image Gallery**: High-quality car images with fallbacks
- 🎨 **Modern UI**: Beautiful gradient designs and smooth animations

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Flask** - Python web framework
- **SQLite** - Lightweight database
- **Flask-CORS** - Cross-origin resource sharing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd car-sales-ecommerce
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

### Running the Application

**Start the backend server (port 5000):**
```bash
cd backend
python app.py
```

**Start the frontend development server (port 3000):**
```bash
npm run dev
```

**Access the application:**
Open your browser and navigate to `http://localhost:3000`

## Database

The application uses SQLite as the database. The database (`cars.db`) will be automatically created when you first run the backend server. Sample data is also automatically populated.

## API Endpoints

### Cars
- `GET /api/cars` - Get all cars (supports query parameters for filtering)
- `GET /api/cars/:id` - Get car by ID
- `POST /api/cars` - Add a new car
- `PUT /api/cars/:id` - Update a car
- `DELETE /api/cars/:id` - Delete a car

### Makes
- `GET /api/makes` - Get all distinct car makes

## Project Structure

```
car-sales-ecommerce/
├─ backend/
│  ├─ app.py              # Flask backend server
│  └─ requirements.txt    # Python dependencies
├─ src/
│  ├─ components/         # React components
│  │  ├─ Header.jsx
│  │  ├─ Hero.jsx
│  │  ├─ Filters.jsx
│  │  ├─ CarListings.jsx
│  │  ├─ CarDetail.jsx
│  │  ├─ Cart.jsx
│  │  └─ Footer.jsx
│  ├─ App.jsx             # Main app component
│  ├─ main.jsx            # Entry point
│  └─ index.css           # Global styles
├─ index.html             # HTML template
├─ vite.config.js         # Vite configuration
├─ package.json           # Frontend dependencies
└─ README.md              # Project documentation
```

## Features in Detail

### Search Functionality
- Real-time search across make, model, and keywords
- Debounced search for better performance
- Search results highlighted and filtered dynamically

### Filtering
- Make (Toyota, Honda, Ford, Tesla, BMW, Mercedes, etc.)
- Year (last 20 years)
- Price range (min and max price filters)
- Reset filters functionality

### Shopping Cart
- Add/remove items from cart
- Quantity tracking
- Real-time price calculations
- Checkout process with success message

### Car Details
- Detailed information about each car
- High-resolution images
- Specs and specifications
- Add to cart and buy now options

## Development

### Building for Production

**Build the frontend:**
```bash
npm run build
```

**Serve the production build:**
```bash
npm run preview
```

### API Development

The backend API is built with Flask and supports all CRUD operations. The database is automatically created and populated with sample data on first run.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Car images provided by Unsplash
- Design inspiration from modern e-commerce platforms
- Built with React and Flask