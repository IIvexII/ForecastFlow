export function convertDateTo12HourFormat(date: Date): string {
  const hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour = hours % 12 || 12;

  if (hours === new Date().getHours()) return "Now";

  return `${hour} ${ampm}`;
}
