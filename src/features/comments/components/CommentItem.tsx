import {
    ReactMarkdown,
} from "../../deps";

import { useCommentItem } from "../hooks/useCommentItem";
import type { CommentItemProp } from "../types";

const CommentItem = (props: CommentItemProp) => {
    const {
        comment,
    } = props;

    const {
        editing,
        setEditing,
        text,
        setText,
        handleSave,
        handleDelete,
        handleKeyDown,
    } = useCommentItem(props);

    return (
        <div className="comment-card">
            <div className="comment-meta">
                <small>
                    Created: {new Date(comment.createdAt).toLocaleString()}
                    {comment.updatedAt && (
                        <>
                            {" • "}
                            Edited: {new Date(
                                comment.updatedAt
                            ).toLocaleString()}
                        </>
                    )}
                </small>
            </div>

            <div className="comment-body">
                {editing ? (
                    <div className="edit-mode">
                        <textarea
                            rows={3}
                            value={text}
                            onChange={(e) =>
                                setText(e.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className="comment-textarea"
                        />

                        <div className="edit-actions">
                            <button
                                className="btn-primary"
                                onClick={handleSave}
                                disabled={!text.trim()}
                            >
                                Save
                            </button>

                            <button
                                className="btn-secondary"
                                onClick={() => {
                                    setEditing(false);
                                    setText(comment.text);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="markdown-content">
                        <ReactMarkdown>
                            {comment.text}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            {!editing && (
                <div className="comment-actions">
                    <button
                        className="btn-info"
                        onClick={() => setEditing(true)}
                        aria-label="Edit comment"
                    >
                        Edit
                    </button>

                    <button
                        className="btn-danger"
                        onClick={handleDelete}
                        aria-label="Delete comment"
                    >
                        Delete
                    </button>
                </div>
            )}

            {comment.history.length > 0 && (
                <details className="comment-history">
                    <summary>Edit History</summary>

                    {comment.history.map((h, i) => (
                        <div key={i} className="history-item">
                            <small>
                                {new Date(
                                    h.updatedAt
                                ).toLocaleString()}
                            </small>

                            <ReactMarkdown>
                                {h.text}
                            </ReactMarkdown>
                        </div>
                    ))}
                </details>
            )}
        </div>
    );
};

export default CommentItem;
