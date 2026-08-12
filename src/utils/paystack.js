// ==================== PAYSTACK ====================

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

// Initialize Paystack payment
export const initializePayment = ({ email, amount, currency, metadata, onSuccess, onClose }) => {
  const handler = window.PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email,
    amount, // In kobo (NGN) or cents (USD)
    currency: currency || "NGN",
    ref: `hye_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    metadata: {
      ...metadata,
      interval: metadata.interval,
      source: "hyespace",
    },
    callback: (response) => {
      if (onSuccess) onSuccess(response);
    },
    onClose: () => {
      if (onClose) onClose();
    },
  });

  handler.openIframe();
};

// Verify payment with backend (Supabase Edge Function)
export const verifyPayment = async (reference) => {
  const { supabase } = await import("../lib/supabase");

  const { data, error } = await supabase.functions.invoke("paystack-webhook", {
    body: { reference, event: "verify" },
  });

  if (error) throw error;
  return data;
};