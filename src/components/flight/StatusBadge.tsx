type Props = {
  status: string;
};

const statusStyles: Record<string, string> = {
  active: "#2ecc71",
  scheduled: "#3498db",
  delayed: "#f39c12",
  landed: "#9b59b6",
  cancelled: "#e74c3c",
};

export default function StatusBadge({ status }: Props) {
  return (
    <span
      style={{
        background: statusStyles[status] ?? "#7f8c8d",
        color: "white",
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 22,
        fontWeight: 600,
        textTransform: "capitalize",
      }}
    >
      {status}
    </span>
  );
}
