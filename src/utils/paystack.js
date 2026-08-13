// ==================== PAYSTACK ====================

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

// Initialize Paystack payment
export const initializePayment = ({ 
  email, 
  amount, 
  currency, 
  metadata, 
  planCode = null,
  onSuccess, 
  onClose 
}) => {
  
  const config = {
    key: PAYSTACK_PUBLIC_KEY,
    email,
    currency: currency || "NGN",
    ref: `hye_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    metadata: {
      ...metadata,
      interval: metadata.interval,
      billingType: planCode ? "recurring" : "one-time",
      source: "hyespace",
    },
    callback: (response) => {
      if (onSuccess) onSuccess(response);
    },
    onClose: () => {
      if (onClose) onClose();
    },
  };

  // If plan code exists, use recurring plan (no amount needed)
  if (planCode) {
    config.plan = planCode;
  } else {
    // One-time payment — amount in kobo
    config.amount = paystackAmount;
  }

  const handler = window.PaystackPop.setup(config);
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
