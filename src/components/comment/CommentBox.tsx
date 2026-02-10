import { useState } from "react";
import { useComments } from "../../context/CommentsContext";

type Props = {
  flightIata: string;
  flightDate: string;
};

const CommentBox = ({ flightIata, flightDate }: Props) => {
  const { addComment } = useComments();
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;

    addComment(flightIata, flightDate, text);
    setText(""); // reset after save
  };

  return (
    <>
      <div className="comment-input-wrapper" style={{ marginTop: 16 }}>
        <div>
          {/* <h4>Add Comment</h4> */}
          <h4>
          Comments for {flightIata} 
          {/* <span className="muted">
             •  {formatFlightDate(flightDate)}
          </span> */}
          </h4>
        </div>
        <textarea
          className="comment-textarea"
          cols={30}
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your comment in Markdown..."
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            resize: "vertical",
          }}
        />
        <small style={{ color: "#888" }}>
          Supports Markdown: **bold**, _italic_, `code`, lists
        </small>
        <button
          className="add-comment-button"
          onClick={handleAdd}
        >
          Add Comment
        </button>
      </div>
    </>
  );
};

export default CommentBox;
