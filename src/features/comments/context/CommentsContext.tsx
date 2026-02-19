import { useToast } from "@/shared/context/ToastContext";
import {
  createContext, useContext, useEffect, useState,
  FiEdit, FiTrash2,
  FaRegCommentDots
} from "../../deps";
import type { CommentsContextType, CommentsStore, FlightComment } from "../types";

const CommentsContext = createContext<CommentsContextType | undefined>(
  undefined
);

export const CommentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState<CommentsStore>({});
  const { showToast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("comments_v2");
    if (saved) setStore(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("comments_v2", JSON.stringify(store));
  }, [store]);

  const keyOf = (iata: string, date: string) => `${iata}_${date}`;

  const getComments = (iata: string, date: string) => {

    const comments = store[keyOf(iata, date)];
    return Array.isArray(comments) ? comments : [];
  };

  const addComment = (iata: string, date: string, text: string, createdAt?: string, id?: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      showToast("Comment cannot be empty", "error");
      return;
    }
    const key = keyOf(iata, date);

    const newComment: FlightComment = {
      id: id ?? crypto.randomUUID(),
      flightIata: iata,
      flightDate: date,
      text,
      createdAt: createdAt ?? new Date().toISOString(),
      history: [],
    };

    setStore((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newComment],
    }));

    showToast(
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <FaRegCommentDots /> Comment added
      </span>);
  };

  const updateComment = (
    iata: string,
    date: string,
    id: string,
    newText: string
  ) => {
    const key = keyOf(iata, date);

    setStore((prev) => ({
      ...prev,
      [key]: prev[key].map((c) =>
        c.id === id
          ? {
            ...c,
            history: [
              ...c.history,
              { text: c.text, updatedAt: new Date().toISOString() },
            ],
            text: newText,
            updatedAt: new Date().toISOString(),
          }
          : c
      ),
    }));

    showToast(
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <FiEdit />
        Comment updated
      </span>
    );
  };

  const deleteComment = (iata: string, date: string, id: string) => {
    const key = keyOf(iata, date);

    setStore((prev) => ({
      ...prev,
      [key]: prev[key].filter((c) => c.id !== id),
    }));

    showToast(
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <FiTrash2 /> Comment deleted
      </span>
      , "error");
  };

  return (
    <CommentsContext.Provider
      value={{ getComments, addComment, updateComment, deleteComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => {
  const ctx = useContext(CommentsContext);
  if (!ctx) throw new Error("useComments must be used inside provider");
  return ctx;
};
