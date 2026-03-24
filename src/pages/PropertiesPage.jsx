
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Grid3X3, List, Search } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import SearchFilter from '@/components/SearchFilter';
import PropertyModal from '@/components/PropertyModal';
import { getProperties } from '@/utils/localStorage';

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

useEffect(() => {
  const fetchProperties = async () => {
    const loadedProperties = await getProperties();
    setProperties(loadedProperties);
    setFilteredProperties(loadedProperties);
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

    if (filters.operation && filters.operation !== 'Todos') {
      filtered = filtered.filter(property => property.operation === filters.operation);
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
        <title>Todas las Propiedades - CY Desarrollos Inmobiliarios</title>
        <meta name="description" content="Explora todas nuestras propiedades disponibles. Usa nuestros filtros avanzados para encontrar exactamente lo que buscas." />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-black/70 mb-4">
            Todas las Propiedades
          </h1>
          <p className="text-black/70 text-base sm:text-lg max-w-2xl mx-auto">
            Explora nuestra colección completa de propiedades inmobiliarias y encuentra tu hogar ideal.
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
            <span className="text-black/80">
              {filteredProperties.length} propiedades encontradas
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-black'
                  : 'glass-effect text-black/60 hover:text-black'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-black'
                  : 'glass-effect text-black/60 hover:text-black'
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
              <Search className="w-20 h-20 text-black/40 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-black mb-4">
                No se encontraron propiedades
              </h3>
              <p className="text-black/60 text-lg max-w-md mx-auto">
                Intenta ajustar tus filtros de búsqueda para encontrar más resultados.
              </p>
            </div>
          )}
        </motion.div>

        {filteredProperties.length > 12 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button className="btn-primary">
              Cargar Más Propiedades
            </button>
          </motion.div>
        )}
      </div>

      <PropertyModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default PropertiesPage;
