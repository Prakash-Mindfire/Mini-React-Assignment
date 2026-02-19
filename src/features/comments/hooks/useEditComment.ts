import { useState } from "@/features/deps";
import { useComments } from "../context/CommentsContext";
import type { CommentItemProp } from "../types";

export function useEditComment({
  comment,
  flightIata,
  flightDate,
}: CommentItemProp) {
  const { updateComment, deleteComment } = useComments();

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  const handleSave = () => {
    if (!text.trim()) return false;

    if (text.trim() === comment.text) {
      setEditing(false);
      return true;
    }

    updateComment(flightIata, flightDate, comment.id, text);
    setEditing(false);
    return true;
  };

  const handleCancel = () => {
    setEditing(false);
    setText(comment.text);
  };

  const handleDelete = () => {
    deleteComment(flightIata, flightDate, comment.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCancel();
    }

    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSave();
    }
  };

  return {
    editing,
    text,
    setText,
    setEditing,
    handleSave,
    handleCancel,
    handleDelete,
    handleKeyDown,
  };
}
