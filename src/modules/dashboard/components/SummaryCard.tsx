import React from "react";

interface SummaryCardProps {
  title: string;
  value: number | string;
  change: number;
  changeType: "positive" | "negative";
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  change,
  changeType,
}) => {
  const changeColorClass =
    changeType === "positive"
      ? "summary-card-change-positive"
      : "summary-card-change-negative";

  return (
    <div className="summary-card">
      <h3 className="summary-card-title">{title}</h3>
      <p className="summary-card-value">
        {typeof value === "number" ? `$${value.toLocaleString()}` : value}
      </p>
      <p className={changeColorClass}>
        {changeType === "positive" ? "▲" : "▼"} {Math.abs(change)}%
      </p>
    </div>
  );
};
