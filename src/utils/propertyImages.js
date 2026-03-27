/** URLs de imágenes en documentos Firestore: `images` (array) y/o `image` (portada). */

export const getPropertyImageUrls = (property) => {
  if (!property) return [];
  const list = Array.isArray(property.images)
    ? property.images.map((u) => String(u).trim()).filter(Boolean)
    : [];
  if (list.length) return list;
  if (property.image && String(property.image).trim()) {
    return [String(property.image).trim()];
  }
  return [];
};
