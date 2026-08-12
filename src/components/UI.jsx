// ==================== REUSABLE UI COMPONENTS ====================

// ---------- BUTTON ----------
export const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) => {
  const base = "btn";
  const variants = {
    primary: "btn-primary",
    outline: "btn-outline",
    ghost: "btn-ghost",
  };
  const sizes = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// ---------- BADGE ----------
export const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "badge-default",
    new: "badge-new",
    updated: "badge-updated",
    version: "badge-version",
  };

  return <span className={`badge ${variants[variant]} ${className}`}>{children}</span>;
};

// ---------- STAR RATING ----------
export const StarRating = ({ rating = 0, totalRatings = 0, onRate, readonly = false }) => {
  const stars = [];
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars.push(
        <svg
          key={i}
          className={`star filled ${!readonly ? "clickable" : ""}`}
          onClick={() => !readonly && onRate && onRate(i + 1)}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    } else if (i === full && hasHalf) {
      stars.push(
        <svg
          key={i}
          className={`star half ${!readonly ? "clickable" : ""}`}
          onClick={() => !readonly && onRate && onRate(i + 1)}
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <defs>
            <linearGradient id={`halfStar-${i}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={`url(#halfStar-${i})`}
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      );
    } else {
      stars.push(
        <svg
          key={i}
          className={`star empty ${!readonly ? "clickable" : ""}`}
          onClick={() => !readonly && onRate && onRate(i + 1)}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }
  }

  return (
    <div className="star-rating">
      <div className="stars">{stars}</div>
      {totalRatings > 0 && <span className="rating-count">({totalRatings})</span>}
    </div>
  );
};

// ---------- THEME TOGGLE ----------
export const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button className="icon-btn theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      {theme === "dark" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
};

// ---------- TOAST ----------
export const Toast = ({ message, visible }) => {
  return <div className={`toast ${visible ? "show" : ""}`}>{message}</div>;
};

// ---------- STATS BAR ----------
export const StatsBar = ({ totalApps, totalDownloads }) => {
  return (
    <div className="stats-bar">
      <span className="stat">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
        {totalApps} apps
      </span>
      <span className="stat">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {totalDownloads.toLocaleString()} downloads
      </span>
    </div>
  );
};

// ---------- SKELETON LOADER ----------
export const Skeleton = ({ width = "100%", height = "20px", borderRadius = "8px" }) => {
  return <div className="skeleton" style={{ width, height, borderRadius }} />;
};

// ---------- EMPTY STATE ----------
export const EmptyState = ({ icon, title, message }) => {
  return (
    <div className="empty-state">
      {icon && <div className="empty-icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
};