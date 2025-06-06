"use client";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { useEffect } from "react";

import { useState } from "react";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export const Todo = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!auth.currentUser) return;

    const unsubscribe = onSnapshot(
      collection(db, "users", auth.currentUser.uid, "todos"),
      (snapshot) => {
        const fetchedTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[];
        setTasks(fetchedTasks);
      }
    );

    return () => unsubscribe();
  }, []);

  const addTask = async () => {
    if (!input.trim() || !auth.currentUser) return;

    await addDoc(collection(db, "users", auth.currentUser.uid, "todos"), {
      text: input.trim(),
      completed: false,
    });

    setInput("");
  };

  const deleteTask = async (id: string) => {
    if (!auth.currentUser) return;
    await deleteDoc(doc(db, "users", auth.currentUser.uid, "todos", id));
  };

  const toggleTask = async (id: string, completed: boolean) => {
    if (!auth.currentUser) return;
    await updateDoc(doc(db, "users", auth.currentUser.uid, "todos", id), {
      completed: !completed,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-[#fef6f6] dark:bg-[#2b2222] p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col gap-6 text-center">
        <h2 className="text-2xl font-semibold text-[#7e4a4a] dark:text-[#f4d6d6]">
          To-Do List
        </h2>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add new task..."
            className="flex-grow px-4 py-2 rounded-lg border border-[#e7c6c6] dark:border-[#553838] bg-[#fffafa] dark:bg-[#3a2d2d] text-[#7e4a4a] dark:text-[#f4d6d6] focus:outline-none focus:ring-2 focus:ring-[#d49999]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-[#b39f9f] hover:bg-[#a38686] text-white rounded-lg font-semibold transition"
            aria-label="Add Task"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul className="max-h-60 overflow-y-auto divide-y divide-[#ecdada] dark:divide-[#553838]">
          {tasks.length === 0 && (
            <li className="text-[#a78686] dark:text-[#a78f8f] text-center py-4">
              No tasks yet
            </li>
          )}

          {tasks.map(({ id, text, completed }) => (
            <li
              key={id}
              className="flex items-center justify-between py-3"
              aria-label={`Task: ${text}`}
            >
              <label
                className={`flex items-center cursor-pointer select-none gap-3 flex-grow ${
                  completed
                    ? "line-through text-[#bda9a9] dark:text-[#6f4c4c]"
                    : "text-[#7e4a4a] dark:text-[#f4d6d6]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => toggleTask(id, completed)}
                  className="w-5 h-5 rounded border-[#b39f9f] dark:border-[#8b6f6f] text-[#d49999] focus:ring-[#d49999]"
                />
                <span>{text}</span>
              </label>

              <button
                onClick={() => deleteTask(id)}
                aria-label={`Delete task: ${text}`}
                className="ml-4 text-[#d76c6c] hover:text-[#b34747] transition text-lg"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
