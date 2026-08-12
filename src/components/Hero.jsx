// ==================== HERO ====================

const Hero = ({ totalApps, totalDownloads }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Your apps.
          <br />
          One space.
        </h1>
        <p className="hero-subtitle">
          Discover, download, and subscribe to apps from Hyesent.
          One account, all your apps.
        </p>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">{totalApps}</span>
            <span className="hero-stat-label">Apps</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value">
              {totalDownloads >= 1000
                ? `${(totalDownloads / 1000).toFixed(1)}K`
                : totalDownloads}
            </span>
            <span className="hero-stat-label">Downloads</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value">1</span>
            <span className="hero-stat-label">Account</span>
          </div>
        </div>
      </div>

      {/* Decorative glass orb */}
      <div className="hero-orb" />
    </section>
  );
};

export default Hero;