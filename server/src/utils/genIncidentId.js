export function generateIncidentId() {
  // Generates unique incident id: FW + random 5 digit number + current year
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const year = new Date().getFullYear();
  return `FW${randomNum}${year}`;
}
