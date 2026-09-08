export default function Empty({ title, detail, action }) {
    return (
      <div className="empty">
        <span>◌</span>
        <h3>{title}</h3>
        <p>{detail}</p>
        {action}
      </div>
    );
  }
