import React from 'react'

const carIcons = {
  car: 'https://img.icons8.com/ios-filled/50/667eea/sedan.png',
  suv: 'https://img.icons8.com/ios-filled/50/667eea/suv.png', 
  truck: 'https://img.icons8.com/ios-filled/50/667eea/pickup-truck.png',
  supercar: 'https://img.icons8.com/ios-filled/50/667eea/race-car.png',
  bus: 'https://img.icons8.com/ios-filled/50/667eea/bus.png',
  motorcycle: 'https://img.icons8.com/ios-filled/50/667eea/motorcycle.png'
}

function CarIcon({ category, size = 24, className = '' }) {
  const iconUrl = carIcons[category.toLowerCase()] || carIcons.car
  
  return (
    <img 
      src={iconUrl} 
      alt={category} 
      className={className}
      style={{ width: size, height: size }}
      onError={(e) => {
        e.target.src = carIcons.car
        e.target.onerror = null // Prevent infinite loop
      }}
    />
  )
}

export default CarIcon