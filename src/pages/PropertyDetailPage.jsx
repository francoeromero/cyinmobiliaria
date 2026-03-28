import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Square,
  DollarSign,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { getPropertyById } from '@/utils/localStorage';
import { getPropertyImageUrls, getPrimaryImageUrl } from '@/utils/propertyImages';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);

  const backPath = location.state?.from || '/propiedades';

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const data = await getPropertyById(id);
      if (!cancelled) {
        setProperty(data);
        setLoading(false);
        setPhotoIndex(0);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const rawUrls = property ? getPropertyImageUrls(property) : [];
  const images =
    rawUrls.length > 0
      ? rawUrls
      : property
        ? [getPrimaryImageUrl(property) || property.image].filter(Boolean)
        : [];
  const n = images.length;
  const safeIndex = n > 0 ? Math.min(photoIndex, n - 1) : 0;
  const mainSrc = n > 0 ? images[safeIndex] : '';

  const handleBack = () => {
    navigate(backPath);
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <p className="text-black/60">Cargando propiedad…</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-black">Propiedad no encontrada</h1>
        <p className="mb-8 text-black/60">No existe una propiedad con este enlace.</p>
        <Link to="/propiedades" className="btn-primary inline-block">
          Ver propiedades
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-10">
      <Helmet>
        <title>
          {property.title} - CY Desarrollos Inmobiliarios
        </title>
        <meta name="description" content={property.description || property.title} />
      </Helmet>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="glass-effect rounded-2xl p-5 shadow-lg sm:p-8"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-xl font-bold text-black sm:text-2xl">
              Detalles de la Propiedad
            </h1>
            <button
              type="button"
              onClick={handleBack}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Volver
            </button>
          </div>

          <div className="space-y-6">
            <div className="relative h-64 overflow-hidden rounded-xl sm:h-80 md:h-96">
              {mainSrc ? (
                <img
                  src={mainSrc}
                  alt={property.title}
                  className="h-full w-full object-cover"
                />
              ) : null}
              {n > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setPhotoIndex((i) => (i - 1 + n) % n)}
                    className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/55"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoIndex((i) => (i + 1) % n)}
                    className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/55"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setPhotoIndex(i)}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          i === safeIndex ? 'bg-white' : 'bg-white/45'
                        }`}
                        aria-label={`Foto ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
              <div className="property-badge">
                ${property.price?.toLocaleString()}
              </div>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-semibold text-black sm:text-2xl">
                {property.title}
              </h2>
              <div className="mb-4 flex items-center text-black/70">
                <MapPin className="mr-2 h-5 w-5 shrink-0" />
                <span>{property.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-4">
              <div className="glass-effect rounded-lg p-4 text-center">
                <Bed className="mx-auto mb-2 h-6 w-6 text-[color:var(--brand-accent)]" />
                <div className="font-semibold text-black">{property.bedrooms}</div>
                <div className="text-sm text-black/60">Habitaciones</div>
              </div>
              <div className="glass-effect rounded-lg p-4 text-center">
                <Bath className="mx-auto mb-2 h-6 w-6 text-[color:var(--brand-accent)]" />
                <div className="font-semibold text-black">{property.bathrooms}</div>
                <div className="text-sm text-black/60">Baños</div>
              </div>
              <div className="glass-effect rounded-lg p-4 text-center">
                <Square className="mx-auto mb-2 h-6 w-6 text-[color:var(--brand-accent)]" />
                <div className="font-semibold text-black">{property.area}m²</div>
                <div className="text-sm text-black/60">Área</div>
              </div>
              <div className="glass-effect rounded-lg p-4 text-center">
                <DollarSign className="mx-auto mb-2 h-6 w-6 text-[color:var(--brand-accent)]" />
                <div className="font-semibold text-black">{property.type}</div>
                <div className="text-sm text-black/60">Tipo</div>
              </div>
            </div>

            {property.description ? (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-black">Descripción</h3>
                <p className="leading-relaxed text-black/80">{property.description}</p>
              </div>
            ) : null}

            <div className="flex flex-wrap justify-end gap-3 pt-2">
              <a
                href="https://wa.me/541151487328"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center"
              >
                Contactar Agente
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
