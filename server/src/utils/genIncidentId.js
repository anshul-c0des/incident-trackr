export function generateIncidentId() {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const year = new Date().getFullYear();
  return `FW${randomNum}${year}`;
}
