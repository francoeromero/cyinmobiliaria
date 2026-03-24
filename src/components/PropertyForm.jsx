
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PropertyForm = ({ property, isOpen, onClose, onSave }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    operation: 'Venta', // modificacion
    location: '',
    price: '',
    type: 'Casa',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    image: '',
    acceptsSquareMeters: 'No' // nuevo campo
  });


  useEffect(() => {
    // if (property) {
    //   setFormData(property);
    // } 
    if (property) {
    setFormData({
      ...property,
      acceptsSquareMeters: property.acceptsSquareMeters || 'No'
    });
  } 

    else {
      setFormData({
        title: '',
        location: '',
        price: '',
        type: 'Casa',
        bedrooms: '',
        bathrooms: '',
        area: '',
        description: '',
        image: '',
        acceptsSquareMeters: 'No'
      });
    }
  }, [property]);

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!formData.title || !formData.location || !formData.price) {
      toast({
        title: "Error",
        description: "Por favor completa los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    const propertyData = {
      ...formData,
      price: parseFloat(formData.price),
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseInt(formData.bathrooms) || 0,
      area: parseFloat(formData.area) || 0,
      // generaba un id de js que no coincidia con la db
      // id: property?.id || Date.now(),
      image: formData.image || `https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&crop=center`
    };
    
    // console.log('Enviando desde formulario Formdata',formData)
    console.log('modificado:',propertyData)
 
    onSave(propertyData);
    onClose();
    
    toast({
      title: "Éxito",
      description: property ? "Propiedad actualizada correctamente" : "Propiedad creada correctamente"
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Verificación específica para 'operation'
    if (name === "operation") {
      console.log("✅ operation capturada:", value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

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
          <h2 className="text-2xl font-bold text-black">
            {property ? 'Editar Propiedad' : 'Nueva Propiedad'}
          </h2>
          <button
            onClick={onClose}
            className="text-black/60 hover:text-black transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-black/80 text-sm font-medium mb-2">
                Título *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ej: Casa moderna en zona residencial"
                className="form-input"
                required
              />
            </div>




            <div>
            <label className="block text-black/80 text-sm font-medium mb-2">
              Tipo de Operación
            </label>
            <select
              name="operation"
              value={formData.operation}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="" >Seleccioná una operación</option>
              <option value="Venta">Venta</option>
              <option value="Alquiler">Alquiler</option>
            </select>
          </div>








            <div>
              <label className="block text-black/80 text-sm font-medium mb-2">
                Ubicación *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ej: Zona Norte, Ciudad"
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="block text-black/80 text-sm font-medium mb-2">
                Precio *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Precio en USD"
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="block text-black/80 text-sm font-medium mb-2">
                Tipo de Propiedad
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Casa" >Casa</option>
                <option value="Apartamento" >Apartamento</option>
                {/* <option value="Villa" >Villa</option>
                <option value="Penthouse" >Penthouse</option> */}
                <option value="Estudio" >Local</option>
              </select>
            </div>

            <div>
              <label className="block text-black/80 text-sm font-medium mb-2">
                Habitaciones
              </label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="Número de habitaciones"
                className="form-input"
                min="0"
              />
            </div>

            <div>
              <label className="block text-black/80 text-sm font-medium mb-2">
                Baños
              </label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="Número de baños"
                className="form-input"
                min="0"
              />
            </div>




            <div>
              <label className="block text-black/80 text-sm font-medium mb-2">
                Área (m²)
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Área en metros cuadrados"
                className="form-input"
                min="0"
              />
            </div>


            <div>
            <label className="block text-black/80 text-sm font-medium mb-2">
              El propietario acepta en metros cuadrados?
            </label>
            <select
              name="acceptsSquareMeters"
              value={formData.acceptsSquareMeters}
              onChange={handleChange}
              className="form-input"
            >
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>


            <div>
              <label className="block text-black/80 text-sm font-medium mb-2">
                URL de Imagen
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="form-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-black/80 text-sm font-medium mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción detallada de la propiedad..."
              rows="4"
              className="form-input resize-none"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{property ? 'Actualizar' : 'Guardar'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PropertyForm;
