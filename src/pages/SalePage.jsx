
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Grid3X3, List, Search, ShoppingCart } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import SearchFilter from '@/components/SearchFilter';
import PropertyModal from '@/components/PropertyModal';
import { getProperties } from '@/utils/localStorage';

const SalePage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({ operation: 'Venta' });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

useEffect(() => {
  const fetchProperties = async () => {
    const loadedProperties = await getProperties();
    const saleProperties = loadedProperties.filter(property => property.operation === 'Venta');
    setProperties(saleProperties);
    setFilteredProperties(saleProperties);
  };
  fetchProperties();
}, []);

  const handleSearch = () => {
    let filtered = properties;

    if (filters.search) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.type && filters.type !== 'Todos') {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= parseFloat(filters.maxPrice));
    }

    if (filters.minBedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.minBedrooms));
    }

    if (filters.minBathrooms) {
      filtered = filtered.filter(property => property.bathrooms >= parseInt(filters.minBathrooms));
    }

    if (filters.minArea) {
      filtered = filtered.filter(property => property.area >= parseFloat(filters.minArea));
    }

    setFilteredProperties(filtered);
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen py-8">
      <Helmet>
        <title>Propiedades en Venta - CY Desarrollos Inmobiliarios</title>
        <meta name="description" content="Explora todas nuestras propiedades en venta. Encuentra la casa o apartamento perfecto para comprar." />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <ShoppingCart className="w-8 h-8 text-amber-400 mr-3" />
            <h1 className="text-3xl sm:text-4xl font-bold text-black/70">
              Propiedades en Venta
            </h1>
          </div>
          <p className="text-black/70 text-base sm:text-lg max-w-2xl mx-auto">
            Descubre nuestra selección de propiedades disponibles para compra. Encuentra tu hogar ideal.
          </p>
        </motion.div>

        <SearchFilter
          filters={filters}
          onFilterChange={setFilters}
          onSearch={handleSearch}
        />

        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            <span className="text-white/80">
              {filteredProperties.length} propiedades en venta encontradas
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'glass-effect text-white/60 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'glass-effect text-white/60 hover:text-white'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {filteredProperties.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid-container' : 'space-y-6'}>
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={viewMode === 'list' ? 'w-full' : ''}
                >
                  <PropertyCard
                    property={property}
                    onClick={handlePropertyClick}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-20 h-20 text-white/40 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                No se encontraron propiedades en venta
              </h3>
              <p className="text-white/60 text-lg max-w-md mx-auto">
                Intenta ajustar tus filtros de búsqueda para encontrar más resultados.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      <PropertyModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default SalePage;
