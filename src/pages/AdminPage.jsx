
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react';
import PropertyForm from '@/components/PropertyForm';
import PropertyModal from '@/components/PropertyModal';
import SearchFilter from '@/components/SearchFilter';
import { getProperties, addProperty, updateProperty, deleteProperty } from '@/utils/localStorage';
import { useToast } from '@/components/ui/use-toast';

const AdminPage = () => {

  const [isAuthorized, setIsAuthorized] = useState(() => {
    const password = prompt("Ingrese la contraseña para acceder:");
    if (password !== import.meta.env.VITE_ADMIN_PASSWORD) {
      alert("Contraseña incorrecta. Redirigiendo...");
      window.location.href = "/";
      return false; 
    }
    return true;
  });

  if (!isAuthorized) return null;



  const { toast } = useToast();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null);

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

const handleSaveProperty = async (propertyData) => {
  let updatedProperties;

  if (editingProperty) {

    // Actualiza en Firebase
    await updateProperty(editingProperty.id, propertyData);
  } else {
    // Agrega en Firebase
    await addProperty(propertyData);
  }
  // Vuelve a cargar desde Firebase
  const loadedProperties = await getProperties();

  setProperties(loadedProperties);
  setFilteredProperties(loadedProperties);
  setEditingProperty(null);
};

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setIsFormOpen(true);
  };

const handleDeleteProperty = async (propertyId) => {
  if (window.confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
    await deleteProperty(propertyId);
    const loadedProperties = await getProperties();
    setProperties(loadedProperties);
    setFilteredProperties(loadedProperties);
    toast({
      title: "Éxito",
      description: "Propiedad eliminada correctamente"
    });
  }
};

  const handleViewProperty = (property) => {
    setSelectedProperty(property);
    setIsViewModalOpen(true);
  };

  const handleNewProperty = () => {
    setEditingProperty(null);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen py-8">
      <Helmet>
        <title>Panel de Administración - CY Desarrollos Inmobiliarios</title>
        <meta name="description" content="Panel administrativo para gestionar propiedades. Crear, editar, eliminar y administrar todas las propiedades del sistema." />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">
              Panel de Administración
            </h1>
            <p className="text-black/70">
              Gestiona todas las propiedades del sistema
            </p>
          </div>
          
          <button
            onClick={handleNewProperty}
            className="btn-primary flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Propiedad</span>
          </button>
        </motion.div>

        <SearchFilter
          filters={filters}
          onFilterChange={setFilters}
          onSearch={handleSearch}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">
              {properties.length}
            </div>
            <div className="text-black/70">Total Propiedades</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">
              {filteredProperties.length}
            </div>
            <div className="text-black/70">Resultados Filtrados</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">
              ${properties.reduce((sum, p) => sum + (p.price || 0), 0).toLocaleString()}
            </div>
            <div className="text-black/70">Valor Total</div>
          </div>
        </motion.div>

        <motion.div
          className="admin-table"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr>
                  <th className="table-header text-left">Imagen</th>
                  <th className="table-header text-left">Título</th>
                  <th className="table-header text-left hidden md:table-cell">Ubicación</th>
                  <th className="table-header text-left">Precio</th>
                  <th className="table-header text-left hidden lg:table-cell">Tipo</th>
                  
                  <th className="table-header text-left hidden lg:table-cell">Operación</th>
                  <th className="table-header text-left hidden lg:table-cell">Detalles</th>
                  
                  <th className="table-header text-center hidden lg:table-cell">Acepta m²</th>
                  <th className="table-header text-center">Acciones</th>

                </tr>
              </thead>
              <tbody>
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((property, index) => (
                    <motion.tr
                      key={property.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-black/5 transition-colors"
                    >
                      <td className="table-cell">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-16 h-12 object-cover rounded-lg"
                        />
                      </td>
                      <td className="table-cell">
                        <div className="font-semibold text-black line-clamp-2">
                          {property.title}
                        </div>
                      </td>
                      <td className="table-cell hidden md:table-cell">{property.location}</td>
                      <td className="table-cell">
                        <span className="font-semibold text-red-400">
                          ${property.price?.toLocaleString()}
                        </span>
                      </td>
                      <td className="table-cell hidden lg:table-cell">
                        <span className="bg-blue-600/20 text-black-300 px-2 py-1 rounded text-sm">
                          {property.type}
                        </span>
                      </td>

                      <td className="table-cell hidden lg:table-cell">
                        <span className={`px-2 py-1 rounded text-sm ${
                          property.operation === 'Venta' 
                            ? 'bg-red-600/20 text-black' 
                            : 'bg-orange-600/20 text-black'
                        }`}>
                          {property.operation}
                        </span>
                      </td>




                      <td className="table-cell hidden lg:table-cell">
                        <div className="text-sm text-black/70">
                          {property.bedrooms}h • {property.bathrooms}b • {property.area}m²
                        </div>
                      </td>


                          
                      {/* ACEPTA M2 */}
                    <td className="table-cell hidden lg:table-cell">
                      <span className={`px-2 py-1 rounded text-sm ${
                        property.acceptsSquareMeters === 'Sí'
                          ? 'bg-green-500/20 text-green-700'
                          : 'bg-gray-300/40 text-gray-700'
                      }`}>
                        {property.acceptsSquareMeters}
                      </span>
                    </td>

                      <td className="table-cell">
                        <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                          <button
                            onClick={() => handleViewProperty(property)}
                            className="p-1 sm:p-2 text-blue-400 hover:text-blue-300 transition-colors"
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditProperty(property)}
                            className="p-1 sm:p-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(property.id)}
                            className="p-1 sm:p-2 text-red-400 hover:text-red-300 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>



                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="table-cell text-center py-12">
                      <Search className="w-12 h-12 text-black/40 mx-auto mb-4" />
                      <p className="text-black/60">No se encontraron propiedades</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <PropertyForm
        property={editingProperty}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProperty(null);
        }}
        onSave={handleSaveProperty}
      />

      <PropertyModal
        property={selectedProperty}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
    </div>
  );
};

export default AdminPage;
