import { useToast } from "@/shared/context/ToastContext";
import { useEffect, useState } from "../../deps";
import type { CommentItemProp } from "../types";
import { useComments } from "../context/CommentsContext";

export function useCommentItem({
  comment,
  flightIata,
  flightDate,
}: CommentItemProp) {
  const { addComment, updateComment, deleteComment } = useComments();
  const { showToast } = useToast();

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);


  useEffect(() => {
    setText(comment.text);
  }, [comment.text]);

  const handleSave = () => {
    const trimmed = text.trim();

    if (!trimmed) {

      showToast("Comment cannot be empty");
      return;
    }

    if (trimmed === comment.text) {
      setEditing(false);
      return;
    }

    updateComment(
      flightIata,
      flightDate,
      comment.id,
      trimmed
    );

    setEditing(false);
  };

  const handleDelete = () => {

    const deletedComment = comment;

    deleteComment(flightIata, flightDate, comment.id);

    showToast(
      "Comment deleted",
      "error",
      {
        id: `delete-${comment.id}`,
        action: {
          label: "Undo Delete",
          onClick: () => {
            
            addComment(
              flightIata,
              flightDate,
              deletedComment.text,
              deletedComment.createdAt,
              deletedComment.id
            );
          }
        }
      }
    );
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Escape") {
      setEditing(false);
      setText(comment.text);
    }

    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSave();
    }
  };

  return {
    editing,
    setEditing,
    text,
    setText,
    handleSave,
    handleDelete,
    handleKeyDown,
  };
}
