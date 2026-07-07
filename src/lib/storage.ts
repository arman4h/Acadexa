const SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

export async function uploadPdf(file: File): Promise<string> {
  if (!SCRIPT_URL) {
    throw new Error("Google Apps Script URL is not configured. Set VITE_GOOGLE_APPS_SCRIPT_URL in .env");
  }

  const arrayBuffer = await file.arrayBuffer();
  const base64 = btoa(
    new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), "")
  );

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ fileName: file.name, file: base64 }),
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data.url;
}
