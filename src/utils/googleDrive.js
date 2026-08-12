// ==================== GOOGLE DRIVE ====================

// Convert Google Drive share link to direct download link
export const getDirectDownloadUrl = (shareUrl) => {
  if (!shareUrl) return null;

  // Extract file ID from various Google Drive URL formats
  const patterns = [
    /\/d\/([a-zA-Z0-9_-]+)/,           // /d/FILE_ID/
    /id=([a-zA-Z0-9_-]+)/,             // ?id=FILE_ID
    /\/file\/d\/([a-zA-Z0-9_-]+)/,     // /file/d/FILE_ID/
  ];

  let fileId = null;
  for (const pattern of patterns) {
    const match = shareUrl.match(pattern);
    if (match) {
      fileId = match[1];
      break;
    }
  }

  if (!fileId) return null;

  return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

// Check if URL is a Google Drive link
export const isGoogleDriveUrl = (url) => {
  return url.includes("drive.google.com");
};