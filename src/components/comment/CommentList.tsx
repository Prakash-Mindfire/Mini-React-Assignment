import { useComments } from "../../context/CommentsContext";
import CommentItem from "./CommentItem";

type Props = {
  flightIata: string;
  flightDate: string;
};

const CommentsList = ({ flightIata, flightDate }: Props) => {
  const { getComments } = useComments();

  try {
    const comments = getComments(flightIata, flightDate);

    if (comments.length === 0) {
      return <p>No comments yet.</p>;
    }

    return (
      <div style={{ marginTop: 16 }}>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            flightIata={flightIata}
            flightDate={flightDate}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading comments:", error);
    return <p>Error loading comments. Please try again.</p>;
  }
};

export default CommentsList;
