export function convertDateTo12HourFormat(date: Date): string {
  const hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour = hours % 12 || 12;

  if (hours === new Date().getHours()) return "Now";

  return `${hour} ${ampm}`;
}

export function convertDateToDay(date: Date): { name: string; today: boolean } {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIndex = date.getDay();
  const today = new Date();
  // const isToday = date.getDate() === today.getDate();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  return {
    name: days[dayIndex],
    today: isToday,
  };
}
