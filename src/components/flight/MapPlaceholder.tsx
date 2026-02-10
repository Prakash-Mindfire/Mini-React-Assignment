import { FaMapMarkedAlt } from "react-icons/fa";

export default function MapPlaceholder() {
  return (
    <div
      style={{
        margin: "24px 0",
        height: 240,
        borderRadius: 12,
        background:
          "linear-gradient(135deg, #1f2937, #111827)",
        color: "#9ca3af",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
      }}
    >
      <FaMapMarkedAlt style={{marginRight:10, fontSize:"xx-large", verticalAlign:"middle"}} /> Live aircraft tracking (coming soon)
    </div>
  );
}
