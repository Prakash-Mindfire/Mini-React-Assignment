import { useState } from "@/features/deps";
import { useComments } from "../context/CommentsContext";

export function useAddComment(
    flightIata: string,
    flightDate: string
) {
    const { addComment } = useComments();
    const [text, setText] = useState("");

    const handleAdd = () => {
        if (!text.trim()) return;

        addComment(flightIata, flightDate, text);
        setText("");
    };

    return {
        text,
        setText,
        handleAdd,
    };
}