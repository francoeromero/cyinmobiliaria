
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, Tag } from 'lucide-react';




const PropertyCard = ({ property, onClick }) => {




  return (
    <motion.div
      className="property-card cursor-pointer"
      onClick={() => onClick && onClick(property)}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
  
        



        <div className="property-badge">
          ${property.price?.toLocaleString()}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center justify-between">
            <span className="text-black font-semibold text-sm bg-white/80 px-2 py-1 rounded">
              {property.type}
            </span>
          {property.operation && (
            <div className="flex items-center gap-2">
              <span className={`text-white font-semibold text-sm px-2 py-1 rounded ${
                property.operation === 'Venta' 
                  ? 'bg-amber-500/80' 
                  : 'bg-amber-500/80'
              }`}>
                {property.operation}
              </span>
              

            </div>
          )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2">
          {property.title}
        </h3>
        
        <div className="flex items-center text-black/70 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
          
          
          {/* MODIFICACION */}
          <p className="text-sm text-black/80">{property.operationType}</p> 

        </div>

{property.operation && (
  <div className="flex items-center text-black/70 mb-3 gap-2">
    <Tag className="w-4 h-4 mr-1" />
    <span className="text-sm font-medium">
      {property.operation}
    </span>

    {property.acceptsSquareMeters === 'Sí' && (
      <span className="text-xs bg-amber-100 text-black-800 px-2 py-0.5 rounded">
        Acepta m²
      </span>
    )}
  </div>
)}
        
        <div className="flex items-center justify-between text-black/80 text-sm">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span>{property.area}m²</span>
            </div>
          </div>
        </div>
        
        {property.description && (
          <p className="text-black/60 text-sm mt-3 line-clamp-2">
            {property.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default PropertyCard;
