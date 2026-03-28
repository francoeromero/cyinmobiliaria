import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { getPropertyById } from '@/utils/localStorage';
import { getPropertyImageUrls, getPrimaryImageUrl } from '@/utils/propertyImages';

const DetailField = ({ label, value }) => (
  <div className="border-b border-black/10 pb-3">
    <div className="text-sm font-bold text-black">{label}</div>
    <div className="mt-0.5 text-sm text-black/80">{value ?? '—'}</div>
  </div>
);

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

  const refDisplay =
    property?.refCode ||
    (property?.id ? `CY-${String(property.id).slice(0, 8).toUpperCase()}` : '—');

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
    <div className="min-h-screen bg-black/[0.03] py-6 sm:py-10">
      <Helmet>
        <title>{property.title} - CY Desarrollos Inmobiliarios</title>
        <meta name="description" content={property.description || property.title} />
      </Helmet>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="mb-6">
            <button
              type="button"
              onClick={handleBack}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Volver
            </button>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Izquierda: carrusel principal */}
            <div className="relative min-h-[320px] overflow-hidden rounded-xl bg-neutral-200 sm:min-h-[400px] lg:min-h-[480px] lg:max-h-[min(85vh,640px)]">
              {mainSrc ? (
                <img
                  src={mainSrc}
                  alt={property.title}
                  className="h-full w-full min-h-[320px] object-cover sm:min-h-[400px] lg:min-h-[480px]"
                />
              ) : (
                <div className="flex min-h-[320px] items-center justify-center text-black/40">
                  Sin imagen
                </div>
              )}
              {n > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setPhotoIndex((i) => (i - 1 + n) % n)}
                    className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md transition hover:bg-white"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoIndex((i) => (i + 1) % n)}
                    className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md transition hover:bg-white"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
              <div className="property-badge">
                {property.price != null
                  ? `USD ${property.price.toLocaleString()}`
                  : 'Consultar'}
              </div>
            </div>

            {/* Derecha: ficha */}
            <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-md">
              <div
                className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white sm:text-sm"
                style={{ backgroundColor: 'var(--brand-accent)' }}
              >
                Detalles de la propiedad
              </div>
              <div className="p-5 sm:p-6">
                <h2 className="mb-4 text-lg font-bold text-black sm:text-xl">
                  {property.title}
                </h2>
                <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  <DetailField label="Tipo de propiedad" value={property.type} />
                  <DetailField label="Ubicación" value={property.location} />
                  <DetailField label="Dormitorios" value={String(property.bedrooms ?? 0)} />
                  <DetailField label="Baños" value={String(property.bathrooms ?? 0)} />
                  <DetailField
                    label="Superficie cubierta"
                    value={property.area != null ? `${property.area} m²` : '—'}
                  />
                  <DetailField label="Operación" value={property.operation || '—'} />
                  <DetailField
                    label="Precio"
                    value={
                      property.price != null
                        ? `USD ${property.price.toLocaleString()}`
                        : '—'
                    }
                  />
                  <DetailField
                    label="Acepta m²"
                    value={property.acceptsSquareMeters || '—'}
                  />
                  {property.antiquity ? (
                    <DetailField label="Antigüedad" value={property.antiquity} />
                  ) : null}
                  {property.floors != null && property.floors !== '' ? (
                    <DetailField label="Plantas" value={String(property.floors)} />
                  ) : null}
                </div>
                <p className="mt-5 text-center text-sm text-black/50">
                  (REF. {refDisplay})
                </p>

                {n > 1 ? (
                  <div className="mt-5 border-t border-black/10 pt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/50">
                      Galería
                    </p>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {images.map((url, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setPhotoIndex(i)}
                          className={`relative shrink-0 overflow-hidden rounded-md ring-2 ring-offset-2 transition ${
                            i === safeIndex
                              ? 'ring-[color:var(--brand-accent)]'
                              : 'ring-transparent opacity-80 hover:opacity-100'
                          }`}
                          aria-label={`Ver imagen ${i + 1}`}
                        >
                          <img
                            src={url}
                            alt=""
                            className="h-16 w-24 object-cover sm:h-20 sm:w-32"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/541151487328"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex flex-1 items-center justify-center gap-2 sm:flex-none"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Contactar agente
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-10 border-t border-black/10 pt-10 lg:grid-cols-2">
            <section>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-black">
                Información básica
              </h3>
              {property.description ? (
                <p className="leading-relaxed text-black/80">{property.description}</p>
              ) : (
                <p className="text-black/50">
                  Consultá con nuestro equipo para más información sobre esta propiedad.
                </p>
              )}
            </section>
            <section>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-black">
                Contacto
              </h3>
              <p className="mb-4 text-sm text-black/70">
                Escribinos por WhatsApp y te respondemos a la brevedad.
              </p>
              <a
                href="https://wa.me/541151487328"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Abrir WhatsApp
              </a>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
