type Props = {
  departure: string;
  arrival: string;
};

export default function FlightTimeline({ departure, arrival }: Props) {
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
