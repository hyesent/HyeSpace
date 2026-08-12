import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { ThemeToggle } from "./UI";

// ==================== HEADER ====================

const Header = () => {
  const { theme, toggleTheme, user, signInWithGoogle } = useStore();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo */}
        <a href="/" className="logo">
          <svg
            className="logo-icon"
            width="32"
            height="32"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="originBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#020617" />
                <stop offset="50%" stopColor="#111827" />
                <stop offset="100%" stopColor="#164E63" />
              </linearGradient>
              <linearGradient id="crystal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#DBEAFE" />
                <stop offset="60%" stopColor="#67E8F9" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="18" />
              </filter>
            </defs>
            <rect width="512" height="512" rx="128" fill="url(#originBg)" />
            <circle cx="256" cy="256" r="150" fill="#22D3EE" opacity=".15" filter="url(#softGlow)" />
            <path
              d="M256 90 L390 168 L390 344 L256 422 L122 344 L122 168 Z"
              fill="none"
              stroke="url(#crystal)"
              strokeWidth="18"
              strokeLinejoin="round"
            />
            <path
              d="M190 175 V337 M322 175 V337 M190 256 H322"
              stroke="url(#crystal)"
              strokeWidth="34"
              strokeLinecap="round"
            />
            <circle cx="256" cy="256" r="22" fill="#FFFFFF" />
            <path
              d="M160 150 L256 95 L350 150"
              stroke="#FFFFFF"
              strokeOpacity=".35"
              strokeWidth="5"
              fill="none"
            />
          </svg>
          <span className="logo-text">HyeSpace</span>
        </a>

        {/* Actions */}
        <div className="header-actions">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />

          {user ? (
            <button
              className="icon-btn"
              onClick={() => navigate("/account")}
              aria-label="Account"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={signInWithGoogle}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;