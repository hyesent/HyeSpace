import { useStore } from "../context/StoreContext";
import { developer } from "../data/apps";

// ==================== ABOUT MODAL ====================

export const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal about-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="about-content">
          <div className="about-avatar">
            {developer.avatar ? (
              <img src={developer.avatar} alt={developer.name} />
            ) : (
              <div className="about-avatar-placeholder">
                {developer.name.charAt(0)}
              </div>
            )}
          </div>

          <h2>{developer.name}</h2>
          <p className="about-bio">{developer.bio}</p>

          <div className="about-socials">
            {developer.socials.github && (
              <a
                href={developer.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {developer.socials.email && (
              <a href={`mailto:${developer.socials.email}`} className="social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Email
              </a>
            )}
            {developer.socials.website && (
              <a
                href={developer.socials.website}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== ONBOARDING MODAL ====================

export const OnboardingModal = ({ isOpen, onClose, storeId }) => {
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(storeId);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal onboarding-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="onboarding-content">
          <div className="onboarding-icon">
            <svg width="48" height="48" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="onboardingBg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#020617" />
                  <stop offset="100%" stopColor="#164E63" />
                </linearGradient>
                <linearGradient id="onboardingCrystal" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#67E8F9" />
                </linearGradient>
              </defs>
              <rect width="512" height="512" rx="128" fill="url(#onboardingBg)" />
              <circle cx="256" cy="256" r="80" fill="none" stroke="url(#onboardingCrystal)" strokeWidth="12" />
              <path d="M256 176 V336 M176 256 H336" stroke="url(#onboardingCrystal)" strokeWidth="24" strokeLinecap="round" />
              <circle cx="256" cy="256" r="16" fill="#FFFFFF" />
            </svg>
          </div>

          <h2>Your HyeSpace ID</h2>
          <p className="onboarding-description">
            This is your universal ID. Enter it inside Hyescriptures, Hyelearner, or any Hye app
            to link your subscriptions. One ID. All your apps.
          </p>

          <div className="store-id-display">
            <code>{storeId}</code>
            <button className="btn btn-outline btn-sm" onClick={handleCopy}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </button>
          </div>

          <button className="btn btn-primary" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};