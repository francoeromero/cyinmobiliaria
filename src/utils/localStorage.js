import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { app } from "@/lib/firebase"; 

const db = getFirestore(app);
const PROPERTIES_COLLECTION = "properties";

export const getProperties = async () => {
  const snapshot = await getDocs(collection(db, PROPERTIES_COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const saveProperties = async (properties) => {
  // Esto agregará todas las propiedades nuevas, pero normalmente deberías usar addProperty/updateProperty individualmente
  const batch = properties.map(prop => addDoc(collection(db, PROPERTIES_COLLECTION), prop));
  await Promise.all(batch);
  return true;
};

export const addProperty = async (property) => {

  const docRef = await addDoc(collection(db, PROPERTIES_COLLECTION), {
    ...property,
    // elimino tambien esto que genera el id
    // createdAt: new Date().toISOString()
  });
  const docSnap = await getDoc(docRef);
  return { id: docRef.id, ...docSnap.data() };
};

export const updateProperty = async (id, updatedProperty) => {
  await updateDoc(doc(db, PROPERTIES_COLLECTION, id), updatedProperty);
  const docSnap = await getDoc(doc(db, PROPERTIES_COLLECTION, id));
  return { id, ...docSnap.data() };
};

export const deleteProperty = async (id) => {
  await deleteDoc(doc(db, PROPERTIES_COLLECTION, id));
  return true;
};

export const getPropertyById = async (id) => {
  const docSnap = await getDoc(doc(db, PROPERTIES_COLLECTION, id));
  return docSnap.exists() ? { id, ...docSnap.data() } : null;
};