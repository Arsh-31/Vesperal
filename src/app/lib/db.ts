import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

const todosCollection = collection(db, "todos");

// Save or update user's todos (overwrite)
type Todo = {
  id: string;
  title: string;
  completed: boolean;
  // Add other fields as needed
};

export const saveUserTodos = async (userId: string, todos: Todo[]) => {
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
  callback: (todos: Todo[]) => void
) => {
  const docRef = doc(todosCollection, userId);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data().todos as Todo[]);
    } else {
      callback([]);
    }
  });
};
