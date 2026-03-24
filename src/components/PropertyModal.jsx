
import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Bed, Bath, Square, DollarSign, Calendar } from 'lucide-react';

const PropertyModal = ({ property, isOpen, onClose }) => {
  if (!isOpen || !property) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Detalles de la Propiedad</h2>
          <button
            onClick={onClose}
            className="text-black/60 hover:text-black transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="relative h-64 rounded-xl overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-500 text-black px-4 py-2 rounded-full font-semibold">
              ${property.price?.toLocaleString()}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black mb-2">{property.title}</h3>
            <div className="flex items-center text-black/70 mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{property.location}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-effect rounded-lg p-4 text-center">
              <Bed className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <div className="text-black font-semibold">{property.bedrooms}</div>
              <div className="text-black/60 text-sm">Habitaciones</div>
            </div>
            <div className="glass-effect rounded-lg p-4 text-center">
              <Bath className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <div className="text-black font-semibold">{property.bathrooms}</div>
              <div className="text-black/60 text-sm">Baños</div>
            </div>
            <div className="glass-effect rounded-lg p-4 text-center">
              <Square className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <div className="text-black font-semibold">{property.area}m²</div>
              <div className="text-black/60 text-sm">Área</div>
            </div>
            <div className="glass-effect rounded-lg p-4 text-center">
              <DollarSign className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <div className="text-black font-semibold">{property.type}</div>
              <div className="text-black/60 text-sm">Tipo</div>
            </div>
          </div>

          {property.description && (
            <div>
              <h4 className="text-lg font-semibold text-black mb-3">Descripción</h4>
              <p className="text-black/80 leading-relaxed">{property.description}</p>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="btn-secondary"
            >
              Cerrar
            </button>

                <a
                  href="https://wa.me/541151487328"
                  target="_blank"
                  rel="noopener noreferrer"
                  
                >

            <button className="btn-primary">
              Contactar Agente
            </button>
                </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyModal;
