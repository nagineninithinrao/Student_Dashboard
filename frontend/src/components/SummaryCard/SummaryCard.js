import "./Summarycard.css";

function SummaryCard({ title, value }) {
  return (
    <div className="summary-card">
      <p className="card-title">{title}</p>
      <h2 className="card-value">{value}</h2>
    </div>
  );
}

export default SummaryCard;
