import QRCode from "qrcode";

// Generate QR code data URL from a string
export const generateQR = async (text) => {
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      width: 200,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });
    return dataUrl;
  } catch (error) {
    console.error("QR generation failed:", error);
    return null;
  }
};