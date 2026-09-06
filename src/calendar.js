export const parseDate = (value) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return date.getFullYear() === Number(match[1]) && date.getMonth() === Number(match[2]) - 1 && date.getDate() === Number(match[3]) ? date : null;
};

export const dateValue = (date) => [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((part, index) => String(part).padStart(index ? 2 : 4, '0')).join('-');

export const calendarDays = (year, month) => {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  return Array.from({ length: 42 }, (_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + index));
};

export const parseTime = (value) => {
  const match = /^(\d{2}):(\d{2})$/.exec(value || '');
  return match && Number(match[1]) < 24 && Number(match[2]) < 60 ? { hour: Number(match[1]), minute: Number(match[2]) } : null;
};

export const timeValue = ({ hour, minute }) => `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

export const wrapNumber = (value, limit) => ((value % limit) + limit) % limit;
