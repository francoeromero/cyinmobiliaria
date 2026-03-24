
import React, { useEffect } from 'react';
import { Search, Filter, DollarSign, Home, MapPin, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchFilter = ({ filters, onFilterChange, onSearch }) => {
  const propertyTypes = ['Todos', 'Casa', 'Apartamento', 'Villa', 'Penthouse', 'Estudio'];
  const operationTypes = ['Todos', 'Venta', 'Alquiler'];

  useEffect(() => {
    if (filters.operation && filters.operation !== 'Todos') {
      onSearch();
    }
  }, [filters.operation]);

  const handleOperationChange = (e) => {
    const newFilters = { ...filters, operation: e.target.value };
    onFilterChange(newFilters);
  };

  return (
    <motion.div
      className="search-container "
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6 ">
        <Filter className="w-6 h-6 text-black mr-3 " />
        <h2 className="text-xl font-semibold text-black">Filtros de Búsqueda</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 ">
        <div className="space-y-2 ">
          <label className="text-black/80 text-sm font-medium flex items-center">
            <Search className="w-4 h-4 mr-2" />
            Buscar por título
          </label>
          <input
            type="text"
            placeholder="Buscar propiedades..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="filter-input"
          />
        </div>

        <div className="space-y-2">
          <label className="text-black/80 text-sm font-medium flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Ubicación
          </label>
          <input
            type="text"
            placeholder="Ciudad, barrio..."
            value={filters.location || ''}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            className="filter-input"
          />
        </div>

        <div className="space-y-2">
          <label className="text-black/80 text-sm font-medium flex items-center">
            <Home className="w-4 h-4 mr-2" />
            Tipo de propiedad
          </label>
          <select
            value={filters.type || 'Todos'}
            onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
            className="filter-input"
          >
            {propertyTypes.map(type => (
              <option key={type} value={type} className="bg-slate-400 text-black">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-black/80 text-sm font-medium flex items-center">
            <Tag className="w-4 h-4 mr-2" />
            Tipo de operación
          </label>
          <select
            value={filters.operation || 'Todos'}
            onChange={handleOperationChange}
            className="filter-input"
          >
            {operationTypes.map(operation => (
              <option key={operation} value={operation} className="bg-slate-400 text-black">
                {operation}
              </option>
            ))}
          </select>
        </div>


{/* 
        <select
          name="operationType"
          value={filters.operationType}
          onChange={handleFilterChange}
          className="form-input"
          >
          <option value="">Todos</option>
          <option value="Venta">Venta</option>
          <option value="Alquiler">Alquiler</option>
        </select> */}




        <div className="space-y-2">
          <label className="text-black/80 text-sm font-medium flex items-center">
            <DollarSign className="w-4 h-4 mr-2" />
            Precio máximo
          </label>
          <input
            type="number"
            placeholder="Precio máximo"
            value={filters.maxPrice || ''}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
            className="filter-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-black/80 text-sm font-medium">Habitaciones mínimas</label>
          <select
            value={filters.minBedrooms || ''}
            onChange={(e) => onFilterChange({ ...filters, minBedrooms: e.target.value })}
            className="filter-input"
          >
            <option value="" className="bg-slate-400 text-black">Cualquiera</option>
            <option value="1" className="bg-slate-400 text-black">1+</option>
            <option value="2" className="bg-slate-400 text-black">2+</option>
            <option value="3" className="bg-slate-400 text-black">3+</option>
            <option value="4" className="bg-slate-400 text-black">4+</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-black/80 text-sm font-medium">Baños mínimos</label>
          <select
            value={filters.minBathrooms || ''}
            onChange={(e) => onFilterChange({ ...filters, minBathrooms: e.target.value })}
            className="filter-input"
          >
            <option value="" className="bg-slate-400 text-black">Cualquiera</option>
            <option value="1" className="bg-slate-400 text-black">1+</option>
            <option value="2" className="bg-slate-400 text-black">2+</option>
            <option value="3" className="bg-slate-400 text-black">3+</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-black/80 text-sm font-medium">Área mínima (m²)</label>
          <input
            type="number"
            placeholder="Área mínima"
            value={filters.minArea || ''}
            onChange={(e) => onFilterChange({ ...filters, minArea: e.target.value })}
            className="filter-input"
          />
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={onSearch}
          className="btn-primary flex items-center space-x-2"
        >
          <Search className="w-5 h-5" />
          <span>Buscar Propiedades </span>
        </button>
      </div>
    </motion.div>
  );
};

export default SearchFilter;
