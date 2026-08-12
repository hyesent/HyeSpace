import { useState } from "react";
import { useStore } from "../context/StoreContext";
import { apps } from "../data/apps";
import { formatDate, formatCurrency, formatInterval } from "../utils/formatters";
import { OnboardingModal } from "./Modals";

// ==================== ACCOUNT PANEL ====================

const AccountPanel = () => {
  const {
    user,
    profile,
    subscriptions,
    subsLoading,
    fetchSubscriptions,
    signOut,
    showOnboarding,
    dismissOnboarding,
  } = useStore();

  const [isOpen, setIsOpen] = useState(true);

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

  return (
    <section className="account-panel-section">
      <div className="account-panel glass">
        {/* Panel Header */}
        <div className="account-panel-header">
          <div className="account-panel-user">
            <div className="account-panel-avatar">
              {user.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt={profile.email} />
              ) : (
                <div className="account-panel-avatar-placeholder">
                  {profile?.email?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="account-panel-user-info">
              <h3>{user.user_metadata?.full_name || profile?.email}</h3>
              <span className="account-panel-email">{profile?.email}</span>
            </div>
          </div>

          <div className="account-panel-actions">
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "Collapse" : "Expand"}
            </button>
            <button className="btn btn-outline btn-sm" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </div>

        {/* Store ID */}
        <div className="store-id-row">
          <div className="store-id-label">
            <h4>HyeSpace ID</h4>
            <p>Use this ID in any Hye app to link your subscriptions.</p>
          </div>
          <div className="store-id-display">
            <code>{profile?.store_id}</code>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => navigator.clipboard.writeText(profile?.store_id)}
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

        {/* Subscriptions */}
        {isOpen && (
          <div className="account-panel-subs">
            <h4>Active Subscriptions</h4>

            {subsLoading ? (
              <div className="loading-state">
                <div className="spinner" />
                <p>Loading subscriptions...</p>
              </div>
            ) : activeSubs.length > 0 ? (
              <div className="account-panel-subs-list">
                {activeSubs.map((sub) => (
                  <div key={sub.id} className="account-panel-sub-item">
                    <div className="account-panel-sub-app">
                      {sub.appIcon ? (
                        <img
                          src={sub.appIcon}
                          alt={sub.appName}
                          className="account-panel-sub-icon"
                        />
                      ) : (
                        <div className="account-panel-sub-placeholder">
                          {sub.appName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h5>{sub.appName}</h5>
                        <span className="account-panel-sub-tier">
                          {sub.tierName}
                        </span>
                      </div>
                    </div>

                    <div className="account-panel-sub-details">
                      <span className="account-panel-sub-price">
                        {formatCurrency(sub.tierPrice, sub.tierCurrency)}
                        {formatInterval(sub.tierInterval)}
                      </span>
                      <span className="account-panel-sub-status">Active</span>
                    </div>

                    {sub.expires_at && (
                      <p className="account-panel-sub-expiry">
                        Renews {formatDate(sub.expires_at)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No active subscriptions yet.</p>
                <span>Subscribe to an app below to get started.</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={dismissOnboarding}
        storeId={profile?.store_id}
      />
    </section>
  );
};

export default AccountPanel;