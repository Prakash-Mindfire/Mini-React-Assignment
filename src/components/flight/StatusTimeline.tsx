type Props = {
  status: string;
};

const STEPS = ["scheduled", "active", "landed"];

export default function StatusTimeline({ status }: Props) {
  const currentIndex = STEPS.indexOf(status);

  return (
    <div className="status-timeline">
      {STEPS.map((s, i) => (
        <div
          key={s}
          className={`status-step ${
            i <= currentIndex ? "active" : ""
          }`}
        >
          {s}
        </div>
      ))}
    </div>
  );
}
