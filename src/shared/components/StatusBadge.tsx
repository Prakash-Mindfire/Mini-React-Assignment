import { statusStyles } from "../constants";

type Props = {
  status: string;
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
