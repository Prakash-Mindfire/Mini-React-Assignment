import {
  useTranslation,
  formatFlightDate,
} from "../../deps";

import { useAddComment } from "../hooks/useAddComment";
import type { CommentBoxProps } from "../types";

export default function CommentBox({
  flightIata,
  flightDate,
}: CommentBoxProps) {
  const { t } = useTranslation();
  const { text, setText, handleAdd } = useAddComment(flightIata, flightDate);

  return (
    <div className="comment-input-wrapper">
      <div>
        <h4>
          {t("comments.title", {
            flight: flightIata ?? "flight",
          })}
          <span className="muted">
            • {formatFlightDate(flightDate)}
          </span>
        </h4>
      </div>

      <textarea
        className="comment-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("comment.comment_placeholder")}
        style={{
          width: "100%",
          padding: 8,
          borderRadius: 6,
          resize: "vertical",
        }}
      />

      <small style={{ color: "#888" }}>
        {t("comments.textbox_info")}
      </small>

      <button
        className="add-comment-button"
        onClick={handleAdd}
      >
        {t("comments.add_comment")}
      </button>
    </div>
  );
}
