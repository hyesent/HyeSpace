import { developer } from "../data/apps";

// ==================== FOOTER ====================

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer glass">
      <div className="footer-inner">
        <div className="footer-brand">
          <svg
            className="footer-logo"
            width="20"
            height="20"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="footerCrystal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#67E8F9" />
              </linearGradient>
            </defs>
            <rect width="512" height="512" rx="128" fill="#020617" />
            <path
              d="M256 90 L390 168 L390 344 L256 422 L122 344 L122 168 Z"
              fill="none"
              stroke="url(#footerCrystal)"
              strokeWidth="18"
              strokeLinejoin="round"
            />
            <path
              d="M190 175 V337 M322 175 V337 M190 256 H322"
              stroke="url(#footerCrystal)"
              strokeWidth="34"
              strokeLinecap="round"
            />
            <circle cx="256" cy="256" r="22" fill="#FFFFFF" />
          </svg>
          <span>HyeSpace</span>
        </div>

        <p className="footer-credit">
          Built by{" "}
          <a
            href={developer.socials.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            hyesent.dev
          </a>
        </p>

        <span className="footer-date">{currentYear}</span>
      </div>
    </footer>
  );
};

export default Footer;