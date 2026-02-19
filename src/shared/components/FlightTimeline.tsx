import type { FlightTimelineProp } from "../types";

export default function FlightTimeline({ departure, arrival }: FlightTimelineProp) {
  return (
    <div className="timeline">
      <span>{departure}</span>
      <div className="line">
        <div className="dot" />
        <div className="track" />
        <div className="dot" />
      </div>
      <span>{arrival}</span>
    </div>
  );
}
