
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Award, Users, ArrowRight } from 'lucide-react';
import PropertyCarousel from '@/components/PropertyCarousel';
import SearchFilter from '@/components/SearchFilter';
import SearchResultsCarousel from '@/components/SearchResultsCarousel';
import PropertyModal from '@/components/PropertyModal';
import { getProperties } from '@/utils/localStorage';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

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
    setHasSearched(true);
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const stats = [
    { icon: TrendingUp, label: 'Propiedades Vendidas', value: '60+' },
    { icon: Award, label: 'Años de Experiencia', value: '5+' },
    { icon: Users, label: 'Clientes Satisfechos', value: '100+' }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Inicio - CY Desarrollos Inmobiliarios</title>
        <meta name="description" content="Descubre las mejores propiedades inmobiliarias en nuestra plataforma. Casas, apartamentos y más con los mejores precios." />
      </Helmet>




<section className="hero-section relative overflow-hidden">
  {/* VIDEO DE FONDO */}
  <video
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="/clip.mp4" type="video/mp4" />
    Tu navegador no soporta HTML5 video.
  </video>

  {/* CAPA OSCURA (opcional para mejorar contraste del texto) */}
  <div className="absolute inset-0 bg-black/40 z-10"></div>

  {/* CONTENIDO ENCIMA DEL VIDEO */}
  <div className="container mx-auto px-4 relative z-20">
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
        Encuentra tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">Hogar Perfecto </span>
      </h1>
      <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
        Descubre las mejores propiedades inmobiliarias con nuestra plataforma avanzada de búsqueda y gestión.
      </p>

      {/* ESTADÍSTICAS */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="glass-effect rounded-xl p-4 sm:p-6 text-center w-36 sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-white/60 text-xs sm:text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
</section>

{/* SECCIÓN SOBRE NOSOTROS */}
<section className="py-16">
  <div className="container mx-auto px-4 sm:px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      {/* Contenedor con glass effect y borde dorado */}
      <div className="glass-effect rounded-2xl p-8 sm:p-12 border-2 border-amber-400/50 shadow-lg">
        {/* Línea decorativa superior */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-transparent to-amber-400"></div>
          <div className="h-3 w-3 bg-amber-400 rounded-full mx-4"></div>
          <div className="h-1 w-12 bg-gradient-to-l from-transparent to-amber-400"></div>
        </div>

        {/* Título con color dorado */}
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">
            CY Desarrollos Inmobiliarios
          </span>
        </h2>

        {/* Línea divisoria */}
        <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-amber-300 mx-auto mb-10"></div>

        {/* Contenido */}
        <div className="space-y-6 text-black/70 text-base sm:text-lg leading-relaxed">
          <p className="first-letter:text-xl ">
            En CY Desarrollos Inmobiliarios nos comprometemos diariamente a ofrecer soluciones de la más alta calidad, mediante la selección de materiales de primeras marcas, la supervisión rigurosa de cada proceso constructivo y la mejora continua de nuestros diseños en cada proyecto.
          </p>
          <p>
            Disponemos de amplias opciones de financiación, orientadas a facilitar el acceso a la primera vivienda para cada familia.
          </p>
          <p>
            Brindamos acompañamiento integral en todas las etapas del proceso, con profesionalismo, compromiso y experiencia.
          </p>
        </div>

        {/* Línea decorativa inferior */}
        <div className="flex items-center justify-center mt-8">
          <div className="h-1 w-12 bg-gradient-to-r from-transparent to-amber-400"></div>
          <div className="h-3 w-3 bg-amber-400 rounded-full mx-4"></div>
          <div className="h-1 w-12 bg-gradient-to-l from-transparent to-amber-400"></div>
        </div>
      </div>
    </motion.div>
  </div>
</section>




      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-black/70 text-center mb-12">
              Propiedades Destacadas
            </h2>
            <PropertyCarousel properties={properties.slice(0, 5)} />
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-black/10">
        <div className="container mx-auto px-4 sm:px-6">
          <SearchFilter
            filters={filters}
            onFilterChange={setFilters}
            onSearch={handleSearch}
          />
        </div>
      </section>

      {hasSearched && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-black/70 text-center mb-12">
                Resultados de Búsqueda ({filteredProperties.length})
              </h2>
              
              {filteredProperties.length > 0 ? (
                <>
                  <SearchResultsCarousel
                    properties={filteredProperties}
                    onPropertyClick={handlePropertyClick}
                  />
                  
                  <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Link
                      to="/propiedades"
                      className="btn-primary inline-flex items-center space-x-2"
                    >
                      <span>Ver Todas las Propiedades</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray/40 mx-auto mb-4" />
                  <p className="text-gray/60 text-lg mb-6">No se encontraron propiedades con los filtros aplicados</p>
                  <Link
                    to="/propiedades"
                    className="btn-secondary inline-flex items-center space-x-2"
                  >
                    <span>Ver Todas las Propiedades</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      <PropertyModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
