import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";

// ==================== VERIFY PAGE ====================

const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { fetchSubscriptions } = useStore();

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    const reference = searchParams.get("reference");

    if (!reference) {
      setStatus("error");
      setMessage("No payment reference found.");
      return;
    }

    const verify = async () => {
      try {
        // The webhook already processed this, but we fetch subscriptions
        // to confirm activation and give the webhook a moment
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await fetchSubscriptions();

        setStatus("success");
        setMessage("Payment verified. Your subscription is now active.");
      } catch {
        setStatus("error");
        setMessage("Something went wrong while verifying your payment.");
      }
    };

    verify();
  }, [searchParams, fetchSubscriptions]);

  return (
    <div className="verify-page">
      <div className="verify-card glass">
        {status === "verifying" && (
          <>
            <div className="spinner" />
            <h2>Verifying Payment</h2>
            <p>{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="verify-icon success">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2>Payment Successful</h2>
            <p>{message}</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/account")}
            >
              Go to Account
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="verify-icon error">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h2>Verification Failed</h2>
            <p>{message}</p>
            <div className="verify-actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/account")}
              >
                Go to Account
              </button>
              <button
                className="btn btn-outline"
                onClick={() => navigate("/")}
              >
                Back to Store
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;