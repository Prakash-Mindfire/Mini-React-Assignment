import type { InfoCardProps } from "../types";

export const InfoCard = ({ title, rows, children }: InfoCardProps) => {
  return (
    <div className="info-card">
      <h3 className="info-title">{title}</h3>
      <div className="info-content {children?} ">
        {rows &&
          rows.map((row, idx) => {
            return (
              <>
                <div key={idx} className="info-row" >
                  <span className="info-label">{row.label}</span>
                  <span className="info-value">
                    {row.value ?? "—"}
                  </span>
                </div>
              </>
            );
          })}

        {children}

      </div>
    </div>
  );
};
