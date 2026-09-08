export default function Button({ children, className = "primary", ...props }) {
    return (
      <button className={`button ${className}`} {...props}>
        {children}
      </button>
    );
  }
