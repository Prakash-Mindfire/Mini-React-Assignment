import { STEPS } from "../constants";
import type { StatusTimelineProps } from "../types";

export default function StatusTimeline({ status }: StatusTimelineProps) {
  const currentIndex = STEPS.includes(status)
    ? STEPS.indexOf(status)
    : 0;

  return (
    <div className="status-timeline">
      {STEPS.map((s, i) => (
        <div
          key={`${s}-${i}`}
          className={`status-step ${i <= currentIndex ? "active" : ""}`}
        >
          {s}
        </div>
      ))}
    </div>
  );
}
