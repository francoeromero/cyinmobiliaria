
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, Award, TrendingUp, Heart, Shield, Star } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { icon: TrendingUp, label: 'Propiedades Vendidas', value: '60+', color: 'text-blue-400' },
    { icon: Award, label: 'Años de Experiencia', value: '5+', color: 'text-green-400' },
    { icon: Users, label: 'Clientes Satisfechos', value: '100+', color: 'text-purple-400' },
    { icon: Star, label: 'Calificación Promedio', value: '5/5', color: 'text-yellow-400' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Pasión por el Servicio',
      description: 'Nos apasiona ayudar a nuestros clientes a encontrar el hogar perfecto que se adapte a sus necesidades y sueños.'
    },
    {
      icon: Shield,
      title: 'Transparencia Total',
      description: 'Creemos en la honestidad y transparencia en cada transacción, proporcionando información clara y precisa.'
    },
    {
      icon: Award,
      title: 'Excelencia Profesional',
      description: 'Nuestro equipo está comprometido con los más altos estándares de profesionalismo y calidad en el servicio.'
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <Helmet>
        <title>Nosotros - CY Desarrollos Inmobiliarios</title>
        <meta name="description" content="Conoce más sobre CY Desarrollos Inmobiliarios, nuestra historia, valores y compromiso con la excelencia en el sector inmobiliario." />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-amber-400 mr-3" />
            <h1 className="text-3xl sm:text-4xl font-bold text-black/70">
              Nosotros
            </h1>
          </div>
          <p className="text-black/70 text-base sm:text-lg max-w-3xl mx-auto">
            En CY Desarrollos Inmobiliarios nos comprometemos diariamente a ofrecer soluciones de la más alta calidad en cada proyecto inmobiliario.
          </p>
        </motion.div>

        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-effect rounded-2xl p-6 sm:p-8">
            <h2 className="text-black/70 sm:text-3xl font-bold /70 mb-6 text-center">
              Nuestra Historia
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-black/80 text-base sm:text-lg leading-relaxed mb-4">
                  En Estudio RC combinamos más de 30 años de trayectoria en la construcción con más de 5 años de experiencia en la comercialización de inmuebles. Somos un estudio de arquitectura que entiende el valor de cada proyecto, desde su diseño hasta su venta. Acompañamos a nuestros clientes en todo el proceso de venta, desde la evaluación del inmueble, la estrategia comercial, la producción de material visual y técnico, hasta el cierre de la operación. Trabajamos con compromiso, visión técnica y profundo conocimiento del mercado para lograr desarrollos sólidos y operaciones exitosas.
                </p>
                <p className="text-black/80 text-base sm:text-lg leading-relaxed">
                  Nuestro compromiso con la excelencia y la satisfacción del cliente nos ha permitido construir 
                  relaciones duraderas y ayudar a miles de familias a encontrar su hogar ideal.
                </p>
              </div>
              <div className="relative">
                <img  
                  className="w-full h-64 object-cover rounded-xl"
                  alt="Equipo de CY Desarrollos Inmobiliarios trabajando en oficina moderna"
                 src="https://images.unsplash.com/photo-1636373466162-330695a2af88" />
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-black/70 mb-12 text-center">
            Nuestros Números
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="glass-effect rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-4`} />
                <div className="text-2xl sm:text-3xl font-bold text-black/70 mb-2">{stat.value}</div>
                <div className="text-black/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-black/70 mb-12 text-center">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="glass-effect rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <value.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black/70 mb-3">{value.title}</h3>
                <p className="text-black/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="glass-effect rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-black/70 mb-6">
              ¿Listo para Encontrar tu Hogar Ideal?
            </h2>
            <p className="text-black/70 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Nuestro equipo de expertos está aquí para ayudarte en cada paso del proceso. 
              Desde la búsqueda inicial hasta la firma del contrato, te acompañamos para que encuentres la propiedad perfecta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
          className="btn-primary"
          onClick={() => (window.location.href = '/propiedades')}
        >
          Explorar Propiedades
        </button>
              <a
                href="https://wa.me/541151487328?text=Hola%2C%20quiero%20consultar%20por%20el%20proyecto%20de%20vivienda."
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-secondary">
                  Contactar Asesor
                </button>
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage;
