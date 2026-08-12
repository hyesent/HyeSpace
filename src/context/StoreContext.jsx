import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

// ==================== CONTEXT ====================

const StoreContext = createContext(null);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};

// ==================== PROVIDER ====================

export const StoreProvider = ({ children }) => {
  // ---------- Theme ----------
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("hyespace-theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("hyespace-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // ---------- Auth ----------
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setProfile(null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
    setProfile(data);
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  // ---------- Subscriptions ----------
  const [subscriptions, setSubscriptions] = useState([]);
  const [subsLoading, setSubsLoading] = useState(false);

  const fetchSubscriptions = useCallback(async () => {
    if (!user) return;
    setSubsLoading(true);
    const { data } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setSubscriptions(data || []);
    setSubsLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) fetchSubscriptions();
    else setSubscriptions([]);
  }, [user, fetchSubscriptions]);

  // ---------- Wishlist ----------
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("hyespace-wishlist") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("hyespace-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (appId) => {
    setWishlist((prev) =>
      prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]
    );
  };

  const isWishlisted = (appId) => wishlist.includes(appId);

  // ---------- Downloads ----------
  const [downloadCounts, setDownloadCounts] = useState(() => {
    return JSON.parse(localStorage.getItem("hyespace-downloads") || "{}");
  });

  useEffect(() => {
    localStorage.setItem("hyespace-downloads", JSON.stringify(downloadCounts));
  }, [downloadCounts]);

  const incrementDownload = (appId) => {
    setDownloadCounts((prev) => ({
      ...prev,
      [appId]: (prev[appId] || 0) + 1,
    }));
  };

  // ---------- Ratings ----------
  const [ratings, setRatings] = useState(() => {
    return JSON.parse(localStorage.getItem("hyespace-ratings") || "{}");
  });

  useEffect(() => {
    localStorage.setItem("hyespace-ratings", JSON.stringify(ratings));
  }, [ratings]);

  const setRating = (appId, rating) => {
    setRatings((prev) => ({ ...prev, [appId]: rating }));
  };

  // ---------- Toast ----------
  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 3000);
  };

  // ---------- Onboarding ----------
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem("hyespace-onboarding-seen");
  });

  const dismissOnboarding = () => {
    localStorage.setItem("hyespace-onboarding-seen", "true");
    setShowOnboarding(false);
  };

  // ==================== VALUE ====================

  const value = {
    theme,
    toggleTheme,
    user,
    profile,
    authLoading,
    signInWithGoogle,
    signOut,
    subscriptions,
    subsLoading,
    fetchSubscriptions,
    wishlist,
    toggleWishlist,
    isWishlisted,
    downloadCounts,
    incrementDownload,
    ratings,
    setRating,
    toast,
    showToast,
    showOnboarding,
    dismissOnboarding,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export default StoreContext;