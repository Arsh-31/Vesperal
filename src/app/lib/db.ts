import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

const todosCollection = collection(db, "todos");

// Save or update user's todos (overwrite)
export const saveUserTodos = async (userId: string, todos: any[]) => {
  await setDoc(doc(todosCollection, userId), { todos });
};

// Get user's todos
export const getUserTodos = async (userId: string) => {
  const docRef = doc(todosCollection, userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().todos;
  }
  return [];
};

// Real-time listener for user's todos
export const subscribeUserTodos = (
  userId: string,
  callback: (todos: any[]) => void
) => {
  const docRef = doc(todosCollection, userId);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data().todos);
    } else {
      callback([]);
    }
  });
};
