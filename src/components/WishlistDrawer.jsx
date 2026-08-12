import { useStore } from "../context/StoreContext";
import { apps } from "../data/apps";

// ==================== WISHLIST DRAWER ====================

const WishlistDrawer = ({ isOpen, onClose }) => {
  const { wishlist, toggleWishlist } = useStore();

  const wishlistApps = apps.filter((app) => wishlist.includes(app.id));

  return (
    <>
      {/* Overlay */}
      <div
        className={`drawer-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`wishlist-drawer glass ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h2>Wishlist</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close wishlist">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          {wishlistApps.length > 0 ? (
            <div className="wishlist-list">
              {wishlistApps.map((app) => (
                <div key={app.id} className="wishlist-item">
                  <div className="wishlist-item-icon">
                    {app.icon ? (
                      <img src={app.icon} alt={app.name} />
                    ) : (
                      <div className="wishlist-item-placeholder">
                        {app.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="wishlist-item-info">
                    <h4>{app.name}</h4>
                    <span>{app.category}</span>
                  </div>

                  <button
                    className="icon-btn wishlist-remove"
                    onClick={() => toggleWishlist(app.id)}
                    aria-label={`Remove ${app.name} from wishlist`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <p>No apps in your wishlist yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistDrawer;