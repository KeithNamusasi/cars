from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

DATABASE = 'cars.db'

def create_database():
    if not os.path.exists(DATABASE):
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE cars (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                make TEXT NOT NULL,
                model TEXT NOT NULL,
                year INTEGER NOT NULL,
                price REAL NOT NULL,
                mileage INTEGER NOT NULL,
                fuel_type TEXT NOT NULL,
                transmission TEXT NOT NULL,
                color TEXT NOT NULL,
                category TEXT NOT NULL,
                location TEXT NOT NULL,
                description TEXT,
                image_url TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Insert sample data (Global & Diverse)
        sample_cars = [
            # Ferrari (A-Z)
            ('Ferrari', '296 GTB', 2023, 312000, 500, 'Hybrid', 'Automatic', 'Rosso Corsa', 'supercar', 'Maranello, Italy', 'The defining hybrid sports car.', 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400'),
            ('Ferrari', '488 Pista', 2020, 450000, 1500, 'Gasoline', 'Automatic', 'Blue', 'supercar', 'Milan, Italy', 'Track-focused powerhouse.', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400'),
            ('Ferrari', '812 Superfast', 2021, 380000, 2000, 'Gasoline', 'Automatic', 'Yellow', 'supercar', 'Rome, Italy', 'V12 masterpiece.', 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=400'),
            ('Ferrari', 'Daytona SP3', 2023, 2200000, 50, 'Gasoline', 'Automatic', 'Red', 'supercar', 'Monaco', 'Limited edition marvel.', 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400'),
            ('Ferrari', 'Enzo', 2004, 3500000, 5000, 'Gasoline', 'Automatic', 'Rosso Corsa', 'supercar', 'London, UK', 'Legendary performance.', 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400'),
            ('Ferrari', 'F40', 1990, 2800000, 12000, 'Gasoline', 'Manual', 'Rosso Corsa', 'supercar', 'Paris, France', 'The ultimate icon.', 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400'),
            ('Ferrari', 'F8 Tributo', 2021, 280000, 5000, 'Gasoline', 'Automatic', 'Red', 'supercar', 'Maranello, Italy', 'Ultimate performance, like new', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400'),
            ('Ferrari', 'LaFerrari', 2015, 4000000, 2000, 'Hybrid', 'Automatic', 'Red', 'supercar', 'Zurich, Switzerland', 'Masterpiece of engineering.', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400'),
            ('Ferrari', 'Roma', 2022, 245000, 1200, 'Gasoline', 'Automatic', 'Silver', 'supercar', 'Vatican City', 'La Nuova Dolce Vita.', 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400'),
            ('Ferrari', 'SF90 Stradale', 2023, 520000, 100, 'Hybrid', 'Automatic', 'Red', 'supercar', 'Geneva, Switzerland', 'Pioneering hybrid technology.', 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400'),

            # Lamborghini (A-Z)
            ('Lamborghini', 'Aventador SVJ', 2021, 600000, 1000, 'Gasoline', 'Automatic', 'Nardo Gray', 'supercar', 'Sant\'Agata, Italy', 'The pinnacle of Aventador.', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400'),
            ('Lamborghini', 'Countach LPI 800-4', 2022, 2600000, 100, 'Hybrid', 'Automatic', 'White', 'supercar', 'Bologna, Italy', 'Rebirth of a legend.', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400'),
            ('Lamborghini', 'Diablo VT', 1999, 350000, 25000, 'Gasoline', 'Manual', 'Purple', 'supercar', 'Los Angeles, USA', 'Pure legacy speed.', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400'),
            ('Lamborghini', 'Gallardo LP560-4', 2013, 130000, 35000, 'Gasoline', 'Automatic', 'Orange', 'supercar', 'Miami, USA', 'Timeless design.', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400'),
            ('Lamborghini', 'Huracan STO', 2022, 400000, 200, 'Gasoline', 'Automatic', 'Blue', 'supercar', 'Dubai, UAE', 'Street-legal race car.', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400'),
            ('Lamborghini', 'Murcielago SV', 2010, 500000, 8000, 'Gasoline', 'Automatic', 'Green', 'supercar', 'Tokyo, Japan', 'V12 monster.', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400'),
            ('Lamborghini', 'Revuelto', 2024, 600000, 10, 'Hybrid', 'Automatic', 'Orange', 'supercar', 'Maranello, Italy', 'The future is here.', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400'),
            ('Lamborghini', 'Sián FKP 37', 2020, 3600000, 50, 'Hybrid', 'Automatic', 'Gold', 'supercar', 'London, UK', 'First hybrid Lamborghini.', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400'),
            ('Lamborghini', 'Urus Performante', 2023, 260000, 500, 'Gasoline', 'Automatic', 'Yellow', 'suv', 'Los Angeles, USA', 'The Super SUV.', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400'),
            ('Lamborghini', 'Veneno', 2013, 8000000, 1000, 'Gasoline', 'Automatic', 'Gray', 'supercar', 'Abu Dhabi, UAE', 'Extremely rare racing prototype.', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400'),

            # Toyota (A-Z)
            ('Toyota', '4Runner', 2022, 45000, 15000, 'Gasoline', 'Automatic', 'Khaki', 'suv', 'Colorado, USA', 'Built for the wild.', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400'),
            ('Toyota', 'Camry TRD', 2021, 35000, 20000, 'Gasoline', 'Automatic', 'White', 'car', 'Tokyo, Japan', 'Sporty and reliable.', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400'),
            ('Toyota', 'Corolla Hybrid', 2023, 28000, 5000, 'Hybrid', 'Automatic', 'Blue', 'car', 'New York, USA', 'Effortless efficiency.', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400'),
            ('Toyota', 'GR Supra', 2022, 55000, 8000, 'Gasoline', 'Automatic', 'Yellow', 'supercar', 'Nagoya, Japan', 'The return of the legend.', 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400'),
            ('Toyota', 'GR86', 2023, 32000, 1000, 'Gasoline', 'Manual', 'Red', 'car', 'Seattle, USA', 'Pure driving pleasure.', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400'),
            ('Toyota', 'Highlander', 2021, 42000, 30000, 'Gasoline', 'Automatic', 'Silver', 'suv', 'Chicago, USA', 'Spacious family SUV.', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400'),
            ('Toyota', 'Land Cruiser 300', 2023, 95000, 500, 'Diesel', 'Automatic', 'Black', 'suv', 'Dubai, UAE', 'King of the desert.', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400'),
            ('Toyota', 'Prius', 2023, 30000, 2000, 'Hybrid', 'Automatic', 'Silver', 'car', 'San Francisco, USA', 'The hybrid pioneer.', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400'),
            ('Toyota', 'RAV4 Prime', 2022, 48000, 12000, 'Hybrid', 'Automatic', 'Blue', 'suv', 'Toronto, Canada', 'Plugin power.', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400'),
            ('Toyota', 'Tundra TRD Pro', 2023, 75000, 5000, 'Gasoline', 'Automatic', 'Orange', 'truck', 'Texas, USA', 'Tough as nails.', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400'),

            # Nissan (A-Z)
            ('Nissan', '370Z Nismo', 2020, 48000, 15000, 'Gasoline', 'Manual', 'White', 'car', 'Sydney, Australia', 'Classic Z performance.', 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400'),
            ('Nissan', 'Altima', 2021, 24000, 25000, 'Gasoline', 'Automatic', 'Gray', 'car', 'Atlanta, USA', 'Comfort meets efficiency.', 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400'),
            ('Nissan', 'Ariya', 2023, 50000, 1000, 'Electric', 'Automatic', 'Copper', 'suv', 'Oslo, Norway', 'Innovation in every detail.', 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400'),
            ('Nissan', 'Armada', 2022, 55000, 10000, 'Gasoline', 'Automatic', 'Black', 'suv', 'Phoenix, USA', 'Full-size capability.', 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400'),
            ('Nissan', 'Frontier PRO-4X', 2023, 42000, 3000, 'Gasoline', 'Automatic', 'Green', 'truck', 'Portland, USA', 'Ready for adventure.', 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400'),
            ('Nissan', 'GT-R NISMO', 2023, 215000, 500, 'Gasoline', 'Automatic', 'Stealth Gray', 'supercar', 'Tokyo, Japan', 'The ultimate Godzilla.', 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400'),
            ('Nissan', 'Leaf e+', 2022, 35000, 12000, 'Electric', 'Automatic', 'White', 'car', 'Amsterdam, Netherlands', 'Practical electric driving.', 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400'),
            ('Nissan', 'Pathfinder Rock Creek', 2023, 45000, 2000, 'Gasoline', 'Automatic', 'Sand', 'suv', 'Denver, USA', 'Rugged and refined.', 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400'),
            ('Nissan', 'Sentra NISMO', 2019, 19000, 45000, 'Gasoline', 'Manual', 'Black', 'car', 'Mexico City, Mexico', 'Sporty compact.', 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400'),
            ('Nissan', 'Z Proto', 2023, 55000, 100, 'Gasoline', 'Manual', 'Yellow', 'car', 'Nagoya, Japan', 'A new era of Z.', 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400'),
        ]

        
        cursor.executemany('''
            INSERT INTO cars (make, model, year, price, mileage, fuel_type, transmission, color, category, location, description, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', sample_cars)
        
        conn.commit()
        conn.close()

@app.route('/api/cars', methods=['GET'])
def get_cars():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Get query parameters
    make = request.args.get('make')
    model = request.args.get('model')
    year = request.args.get('year')
    category = request.args.get('category')
    location = request.args.get('location')
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')
    
    query = 'SELECT * FROM cars WHERE 1=1'
    params = []
    
    if make:
        query += ' AND make LIKE ?'
        params.append(f'%{make}%')
    if model:
        query += ' AND model LIKE ?'
        params.append(f'%{model}%')
    if year:
        query += ' AND year = ?'
        params.append(year)
    if category:
        query += ' AND category = ?'
        params.append(category)
    if location:
        query += ' AND location LIKE ?'
        params.append(f'%{location}%')
    if min_price:
        query += ' AND price >= ?'
        params.append(min_price)
    if max_price:
        query += ' AND price <= ?'
        params.append(max_price)
    
    cursor.execute(query, params)
    cars = cursor.fetchall()
    
    conn.close()
    
    # Convert to dict format
    car_list = []
    for car in cars:
        car_list.append({
            'id': car[0],
            'make': car[1],
            'model': car[2],
            'year': car[3],
            'price': car[4],
            'mileage': car[5],
            'fuel_type': car[6],
            'transmission': car[7],
            'color': car[8],
            'category': car[9],
            'location': car[10],
            'description': car[11],
            'image_url': car[12],
            'created_at': car[13]
        })
    
    return jsonify(car_list)

@app.route('/api/cars/<int:id>', methods=['GET'])
def get_car(id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM cars WHERE id = ?', (id,))
    car = cursor.fetchone()
    conn.close()
    
    if car:
        return jsonify({
            'id': car[0],
            'make': car[1],
            'model': car[2],
            'year': car[3],
            'price': car[4],
            'mileage': car[5],
            'fuel_type': car[6],
            'transmission': car[7],
            'color': car[8],
            'category': car[9],
            'location': car[10],
            'description': car[11],
            'image_url': car[12],
            'created_at': car[13]
        })
    else:
        return jsonify({'error': 'Car not found'}), 404

@app.route('/api/cars', methods=['POST'])
def add_car():
    data = request.json
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO cars (make, model, year, price, mileage, fuel_type, transmission, color, category, location, description, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data['make'],
        data['model'],
        data['year'],
        data['price'],
        data['mileage'],
        data['fuel_type'],
        data['transmission'],
        data['color'],
        data['category'],
        data['location'],
        data['description'],
        data['image_url']
    ))
    
    car_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return jsonify({'id': car_id, 'message': 'Car added successfully'}), 201

@app.route('/api/cars/<int:id>', methods=['PUT'])
def update_car(id):
    data = request.json
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        UPDATE cars SET make=?, model=?, year=?, price=?, mileage=?, fuel_type=?, transmission=?, color=?, category=?, location=?, description=?, image_url=?
        WHERE id = ?
    ''', (
        data['make'],
        data['model'],
        data['year'],
        data['price'],
        data['mileage'],
        data['fuel_type'],
        data['transmission'],
        data['color'],
        data['category'],
        data['location'],
        data['description'],
        data['image_url'],
        id
    ))
    
    conn.commit()
    conn.close()
    
    if cursor.rowcount > 0:
        return jsonify({'message': 'Car updated successfully'})
    else:
        return jsonify({'error': 'Car not found'}), 404

@app.route('/api/cars/<int:id>', methods=['DELETE'])
def delete_car(id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM cars WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    
    if cursor.rowcount > 0:
        return jsonify({'message': 'Car deleted successfully'})
    else:
        return jsonify({'error': 'Car not found'}), 404

@app.route('/api/makes', methods=['GET'])
def get_makes():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT DISTINCT make FROM cars ORDER BY make')
    makes = cursor.fetchall()
    conn.close()
    
    return jsonify([make[0] for make in makes])

if __name__ == '__main__':
    create_database()
    app.run(debug=True, host='0.0.0.0', port=5000)