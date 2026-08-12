import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as crypto from "https://deno.land/std@0.177.0/crypto/mod.ts";

const PAYSTACK_SECRET_KEY = Deno.env.get("PAYSTACK_SECRET_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

Deno.serve(async (req) => {
  // CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, x-paystack-signature",
      },
    });
  }

  try {
    const signature = req.headers.get("x-paystack-signature");
    const body = await req.text();
    const payload = JSON.parse(body);

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Helper: calculate expiry based on interval
    const getExpiryDate = (interval) => {
      const now = new Date();
      switch (interval) {
        case "daily":
          return new Date(now.setDate(now.getDate() + 1)).toISOString();
        case "weekly":
          return new Date(now.setDate(now.getDate() + 7)).toISOString();
        case "monthly":
          return new Date(now.setMonth(now.getMonth() + 1)).toISOString();
        case "quarterly":
          return new Date(now.setMonth(now.getMonth() + 3)).toISOString();
        case "biannually":
          return new Date(now.setMonth(now.getMonth() + 6)).toISOString();
        case "yearly":
          return new Date(now.setFullYear(now.getFullYear() + 1)).toISOString();
        default:
          return new Date(now.setMonth(now.getMonth() + 1)).toISOString();
      }
    };

    // Helper: create subscription
    const createSubscription = async (data) => {
      const { metadata, reference, amount, currency } = data;

      if (!metadata?.userId || !metadata?.appId || !metadata?.tierId) {
        return { error: "Missing metadata", status: 400 };
      }

      // Check idempotency
      const { data: existing } = await supabase
        .from("subscriptions")
        .select("id")
        .eq("paystack_reference", reference)
        .single();

      if (existing) {
        return { error: "Already processed", status: 200 };
      }

      const expiresAt = getExpiryDate(metadata.interval);

      const { error: insertError } = await supabase.from("subscriptions").insert({
        user_id: metadata.userId,
        app_id: metadata.appId,
        tier_id: metadata.tierId,
        status: "active",
        paystack_reference: reference,
        amount,
        currency,
        starts_at: new Date().toISOString(),
        expires_at: expiresAt,
      });

      if (insertError) {
        return { error: insertError.message, status: 500 };
      }

      return { error: null, status: 201 };
    };

    // Manual verification call from frontend
    if (payload.event === "verify") {
      const { reference } = payload;

      const res = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          },
        }
      );
      const data = await res.json();

      if (!data.status || data.data.status !== "success") {
        return new Response(JSON.stringify({ error: "Payment not verified" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const result = await createSubscription(data.data);

      if (result.error && result.status !== 200) {
        return new Response(JSON.stringify({ error: result.error }), {
          status: result.status,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ message: result.error === "Already processed" ? "Already processed" : "Subscription activated" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Paystack webhook events
    if (signature) {
      const hash = await crypto.subtle.digest(
        "SHA-512",
        new TextEncoder().encode(body + PAYSTACK_SECRET_KEY)
      );
      const computedSignature = Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      if (computedSignature !== signature) {
        return new Response(JSON.stringify({ error: "Invalid signature" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    const event = payload;

    // Handle charge.success
    if (event.event === "charge.success") {
      const result = await createSubscription(event.data);

      if (result.error && result.status !== 200) {
        return new Response(JSON.stringify({ error: result.error }), {
          status: result.status,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // Handle subscription.disable
    if (event.event === "subscription.disable") {
      const { subscription_code } = event.data;

      const { error: updateError } = await supabase
        .from("subscriptions")
        .update({
          status: "cancelled",
          cancelled_at: new Date().toISOString(),
        })
        .eq("paystack_subscription_code", subscription_code);

      if (updateError) throw updateError;
    }

    return new Response(JSON.stringify({ message: "OK" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});