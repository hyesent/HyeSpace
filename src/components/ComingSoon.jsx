import { comingSoon } from "../data/apps";

// ==================== COMING SOON ====================

const ComingSoon = () => {
  return (
    <section className="coming-soon-section">
      <h2 className="section-title">Coming Soon</h2>

      <div className="coming-soon-grid">
        {comingSoon.map((app) => (
          <div key={app.id} className="coming-soon-card glass">
            <div className="coming-soon-icon">
              {app.icon ? (
                <img src={app.icon} alt={app.name} />
              ) : (
                <div className="coming-soon-icon-placeholder">
                  {app.name.charAt(0)}
                </div>
              )}
            </div>

            <h3 className="coming-soon-name">{app.name}</h3>
            <span className="coming-soon-category">{app.category}</span>
            <p className="coming-soon-description">{app.description}</p>

            <span className="coming-soon-badge">Coming Soon</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComingSoon;