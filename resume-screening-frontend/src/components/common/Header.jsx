export default function Header({ eyebrow, title, children }) {
    return (
      <header className="page-header">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{children}</p>
        </div>
      </header>
    );
  }
