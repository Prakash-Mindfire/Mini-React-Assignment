type Props = {
  title: string;
  children: React.ReactNode;
};

export default function InfoCard({ title, children }: Props) {
  return (
    <section className="info-card">
      <h3>{title}</h3>
      <div className="info-grid">{children}</div>
    </section>
  );
}
