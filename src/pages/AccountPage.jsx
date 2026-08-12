import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { apps } from "../data/apps";
import { formatDate, formatCurrency, formatInterval } from "../utils/formatters";
import { OnboardingModal } from "../components/Modals";

// ==================== ACCOUNT PAGE ====================

const AccountPage = () => {
  const {
    user,
    profile,
    authLoading,
    subscriptions,
    subsLoading,
    fetchSubscriptions,
    signOut,
    showOnboarding,
    dismissOnboarding,
  } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchSubscriptions();
    }
  }, [user, fetchSubscriptions]);

  if (authLoading) {
    return (
      <div className="account-page">
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading account...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const subscriptionsWithApp = subscriptions.map((sub) => {
    const app = apps.find((a) => a.id === sub.app_id);
    const tier = app?.subscriptionTiers?.find((t) => t.id === sub.tier_id);
    return {
      ...sub,
      appName: app?.name || sub.app_id,
      appIcon: app?.icon || null,
      tierName: tier?.name || sub.tier_id,
      tierPrice: tier?.price || 0,
      tierCurrency: tier?.currency || "NGN",
      tierInterval: tier?.interval || "monthly",
    };
  });

  const activeSubs = subscriptionsWithApp.filter(
    (sub) => sub.status === "active"
  );
  const inactiveSubs = subscriptionsWithApp.filter(
    (sub) => sub.status !== "active"
  );

  return (
    <div className="account-page">
      <div className="account-container">
        {/* Back button */}
        <button
          className="btn btn-outline btn-sm back-btn"
          onClick={() => navigate("/")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Store
        </button>

        {/* Profile Header */}
        <div className="account-header glass">
          <div className="account-user">
            <div className="account-avatar">
              <svg
                width="24"
                height="24"
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
            </div>
            <div className="account-user-info">
              <h2>{user.user_metadata?.full_name || "User"}</h2>
              <span className="account-email">{profile.email}</span>
            </div>
          </div>

          <button className="btn btn-outline btn-sm" onClick={signOut}>
            Sign Out
          </button>
        </div>

        {/* Store ID */}
        <div className="store-id-section glass">
          <div className="store-id-header">
            <h3>Your HyeSpace ID</h3>
            <p>Enter this ID in any Hye app to link your subscriptions.</p>
          </div>
          <div className="store-id-display">
            <code>{profile.store_id}</code>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => {
                navigator.clipboard.writeText(profile.store_id);
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </button>
          </div>
        </div>

        {/* Active Subscriptions */}
        <div className="subscriptions-section">
          <h3>Active Subscriptions</h3>

          {subsLoading ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>Loading subscriptions...</p>
            </div>
          ) : activeSubs.length > 0 ? (
            <div className="subscriptions-list">
              {activeSubs.map((sub) => (
                <div key={sub.id} className="subscription-card glass">
                  <div className="subscription-app">
                    {sub.appIcon ? (
                      <img src={sub.appIcon} alt={sub.appName} className="subscription-app-icon" />
                    ) : (
                      <div className="subscription-app-placeholder">
                        {sub.appName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4>{sub.appName}</h4>
                      <span className="subscription-tier">{sub.tierName}</span>
                    </div>
                  </div>

                  <div className="subscription-details">
                    <span className="subscription-price">
                      {formatCurrency(sub.tierPrice, sub.tierCurrency)}
                      {formatInterval(sub.tierInterval)}
                    </span>
                    <span className="subscription-status active">Active</span>
                  </div>

                  {sub.expires_at && (
                    <p className="subscription-expiry">
                      Renews {formatDate(sub.expires_at)}
                    </p>
                  )}
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
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <p>No active subscriptions.</p>
              <span>Browse apps to subscribe.</span>
            </div>
          )}
        </div>

        {/* Inactive / Expired Subscriptions */}
        {inactiveSubs.length > 0 && (
          <div className="subscriptions-section">
            <h3>Past Subscriptions</h3>
            <div className="subscriptions-list">
              {inactiveSubs.map((sub) => (
                <div key={sub.id} className="subscription-card glass inactive">
                  <div className="subscription-app">
                    {sub.appIcon ? (
                      <img src={sub.appIcon} alt={sub.appName} className="subscription-app-icon" />
                    ) : (
                      <div className="subscription-app-placeholder">
                        {sub.appName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4>{sub.appName}</h4>
                      <span className="subscription-tier">{sub.tierName}</span>
                    </div>
                  </div>
                  <span className="subscription-status expired">
                    {sub.status === "cancelled" ? "Cancelled" : "Expired"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <OnboardingModal
        isOpen={showOnboarding}
        onClose={dismissOnboarding}
        storeId={profile.store_id}
      />
    </div>
  );
};

export default AccountPage;