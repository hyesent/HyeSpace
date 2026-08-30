// ==================== DOWNLOAD URL HANDLER ====================

// Convert Google Drive share link to direct download link
export const getDirectDownloadUrl = (url) => {
  if (!url) return null;

  // If it's already a direct download link (GitHub Releases, etc.), return as-is
  if (
    url.includes("github.com") ||
    url.includes("objects.githubusercontent.com") ||
    url.endsWith(".apk") ||
    url.includes("supabase.co/storage") ||
    url.includes("firebasestorage.googleapis.com") ||
    url.includes("cdn.") ||
    url.includes("download.")
  ) {
    return url;
  }

  // Handle Google Drive links
  if (url.includes("drive.google.com")) {
    const patterns = [
      /\/d\/([a-zA-Z0-9_-]+)/,
      /id=([a-zA-Z0-9_-]+)/,
      /\/file\/d\/([a-zA-Z0-9_-]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return `https://drive.google.com/uc?export=download&id=${match[1]}`;
      }
    }
  }

  // Default: return the URL as-is
  return url;
};

// Check if URL is a Google Drive link
export const isGoogleDriveUrl = (url) => {
  return url.includes("drive.google.com");
};
