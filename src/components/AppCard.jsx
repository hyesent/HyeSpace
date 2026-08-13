import { useState } from "react";
import { useStore } from "../context/StoreContext";
import { Badge, StarRating } from "./UI";
import { formatDate, timeAgo, formatCurrency, formatInterval, formatDownloadCount } from "../utils/formatters";
import { getDirectDownloadUrl } from "../utils/googleDrive";
import { initializePayment } from "../utils/paystack";

// ==================== APP CARD ====================

const AppCard = ({ app }) => {
  const {
    user,
    profile,
    signInWithGoogle,
    downloadCounts,
    incrementDownload,
    ratings,
    setRating,
    wishlist,
    toggleWishlist,
    isWishlisted,
    showToast,
    fetchSubscriptions,
  } = useStore();

  const [showChangelog, setShowChangelog] = useState(false);
  const [showTiers, setShowTiers] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState(null);

  const downloadUrl = getDirectDownloadUrl(app.apkUrl);
  const downloadCount = downloadCounts[app.id] || 0;
  const appRating = ratings[app.id] || app.rating;

  // Handle download
  const handleDownload = () => {
    if (downloadUrl) {
      incrementDownload(app.id);
      window.open(downloadUrl, "_blank");
      showToast("Download started");
    }
  };

  // Handle subscribe
  const handleSubscribe = async (tier, billingType = 'one-time') => {
    if (!user) {
      signInWithGoogle();
      return;
    }

    initializePayment({
      email: user.email,
      amount: tier.price,
      currency: tier.currency,
      planCode: billingType === 'recurring' ? tier.paystackPlanCode : null,
      metadata: {
        userId: user.id,
        appId: app.id,
        tierId: tier.id,
        storeId: profile?.store_id,
        interval: tier.interval,
        billingType,
      },
      onSuccess: async (response) => {
        showToast("Payment successful. Activating subscription...");
        await fetchSubscriptions();
      },
      onClose: () => {
        showToast("Payment cancelled");
      },
    });
  };

  // Handle share
  const handleShare = async () => {
    const url = app.webAppUrl || window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: app.name,
          text: app.shortDescription,
          url,
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(url);
      showToast("Link copied to clipboard");
    }
  };

  // Generate QR
  const handleQR = async () => {
    if (!qrDataUrl) {
      const { generateQR } = await import("../utils/qr");
      const url = app.webAppUrl || (downloadUrl || window.location.href);
      const dataUrl = await generateQR(url);
      setQrDataUrl(dataUrl);
    }
    setShowQR(true);
  };

  const wishlisted = isWishlisted(app.id);

  return (
    <>
      <div className="app-card glass">
        {/* Card Header */}
        <div className="card-header">
          <div className="app-icon-wrapper">
            {app.icon ? (
              <img src={app.icon} alt={app.name} className="app-icon" />
            ) : (
              <div className="app-icon-placeholder">
                {app.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="card-header-info">
            <div className="app-name-row">
              <h3 className="app-name">{app.name}</h3>
              <div className="app-badges">
                {app.isNew && <Badge variant="new">New</Badge>}
                {app.isUpdated && <Badge variant="updated">Updated</Badge>}
                <Badge variant="version">{app.version}</Badge>
              </div>
            </div>
            <span className="app-category">{app.category}</span>
          </div>
        </div>

        {/* Rating & Downloads */}
        <div className="app-meta">
          <StarRating
            rating={appRating}
            totalRatings={app.totalRatings}
            onRate={(val) => {
              setRating(app.id, val);
              showToast("Rating saved");
            }}
          />
          <span className="download-count">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {formatDownloadCount(downloadCount)} downloads
          </span>
          <span className="app-size">{app.size}</span>
        </div>

        {/* Description */}
        <p className="app-description">{app.shortDescription}</p>

        {/* Screenshots */}
        {app.screenshots.length > 0 && (
          <div className="screenshots">
            {app.screenshots.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${app.name} screenshot ${i + 1}`}
                className="screenshot-thumb"
                onClick={() => setLightboxImg(src)}
                loading="lazy"
              />
            ))}
          </div>
        )}

        {/* Changelog */}
        {app.changelog.length > 0 && (
          <div className="changelog">
            <button
              className="changelog-toggle"
              onClick={() => setShowChangelog(!showChangelog)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points={showChangelog ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
              </svg>
              What's New
            </button>
            {showChangelog && (
              <div className="changelog-timeline">
                {app.changelog.map((entry, i) => (
                  <div key={i} className="changelog-entry">
                    <div className="changelog-version">
                      {entry.version}
                      <span className="changelog-date">{formatDate(entry.date)}</span>
                    </div>
                    <p className="changelog-notes">{entry.notes}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Subscription Tiers */}
        {app.subscriptionTiers.length > 0 && (
          <div className="subscription-section">
            <button
              className="changelog-toggle"
              onClick={() => setShowTiers(!showTiers)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points={showTiers ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
              </svg>
              Subscription Plans
            </button>
            {showTiers && (
              <div className="tiers-grid">
                {app.subscriptionTiers.map((tier) => (
                  <div
                    key={tier.id}
                    className={`tier-card ${tier.highlighted ? "highlighted" : ""}`}
                  >
                    <h4 className="tier-name">{tier.name}</h4>
                    <div className="tier-price">
                      <span className="tier-amount">
                        {formatCurrency(tier.price, tier.currency)}
                      </span>
                      <span className="tier-interval">
                        {formatInterval(tier.interval)}
                      </span>
                    </div>
                    <p className="tier-description">{tier.description}</p>
                    {tier.features && (
                      <ul className="tier-features">
                        {tier.features.map((feat, i) => (
                          <li key={i}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* One-time button */}
                    <button
                      className="btn btn-outline tier-subscribe-btn"
                      onClick={() => handleSubscribe(tier, 'one-time')}
                    >
                      Pay Once
                    </button>

                    {/* Recurring button — only if plan code exists */}
                    {tier.paystackPlanCode && (
                      <button
                        className="btn btn-primary tier-subscribe-btn"
                        onClick={() => handleSubscribe(tier, 'recurring')}
                      >
                        Subscribe & Auto-Renew
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="card-actions">
          {downloadUrl && (
            <button className="btn btn-primary download-btn" onClick={handleDownload}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download APK
            </button>
          )}

          {app.webAppUrl && (
            <a
              href={app.webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline webapp-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Open Web App
            </a>
          )}

          <div className="card-action-icons">
            <button className="icon-btn" onClick={handleShare} aria-label="Share">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>

            <button className="icon-btn" onClick={handleQR} aria-label="QR Code">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="3" height="3" />
                <rect x="18" y="18" width="3" height="3" />
                <rect x="18" y="14" width="3" height="3" />
                <rect x="14" y="18" width="3" height="3" />
              </svg>
            </button>

            <button
              className={`icon-btn ${wishlisted ? "wishlisted" : ""}`}
              onClick={() => toggleWishlist(app.id)}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={wishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)}>
          <img src={lightboxImg} alt="Screenshot" />
        </div>
      )}

      {/* QR Modal */}
      {showQR && (
        <div className="modal-overlay" onClick={() => setShowQR(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowQR(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h3>Scan to Open</h3>
            {qrDataUrl && <img src={qrDataUrl} alt="QR Code" className="qr-image" />}
            <p className="qr-hint">Point your phone camera at the QR code</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AppCard;
