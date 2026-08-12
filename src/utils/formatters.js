// ==================== FORMATTERS ====================

// Format date to readable string
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Format relative time (e.g., "2 days ago")
export const timeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years}y ago`;
  if (months > 0) return `${months}mo ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
};

// Format currency
export const formatCurrency = (amount, currency = "NGN") => {
  const symbols = {
    NGN: "₦",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const symbol = symbols[currency] || currency;

  if (currency === "NGN") {
    return `${symbol}${(amount / 100).toLocaleString()}`;
  }

  return `${symbol}${amount.toLocaleString()}`;
};

// Format file size
export const formatFileSize = (sizeString) => {
  return sizeString; // Already formatted (e.g., "12.4 MB")
};

// Format download count
export const formatDownloadCount = (count) => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};

// Format interval
export const formatInterval = (interval) => {
  const map = {
    daily: "/day",
    weekly: "/week",
    monthly: "/month",
    yearly: "/year",
    quarterly: "/quarter",
    biannually: "/6 months",
  };
  return map[interval] || `/${interval}`;
};

// Truncate text
export const truncate = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + "...";
};