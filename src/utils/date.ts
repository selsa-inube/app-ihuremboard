import { labels } from "@i18n/labels";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = labels.utils.date.months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? labels.utils.date.pm : labels.utils.date.am;

  hours = hours % 12 || 12;

  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
};

export const getDateString = (date: string | { value: string }): string => {
  return typeof date === "string" ? date : date.value;
};

export const parseFormattedDate = (dateStr: string): Date => {
  const parts = dateStr.split("/");
  if (parts.length !== 3) {
    return new Date(dateStr);
  }

  const day = parseInt(parts[0], 10);
  const monthAbbr = parts[1].toLowerCase();
  const year = parseInt(parts[2], 10);

  const monthMap: Record<string, number> = {
    ene: 0,
    feb: 1,
    mar: 2,
    abr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    ago: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dic: 11,
  };

  const month = monthMap[monthAbbr] ?? 0;
  return new Date(year, month, day);
};

export const formatRequestTime = (
  dateString: string | undefined | null,
): string => {
  if (!dateString) return labels.utils.date.unknown;

  const requestDate = parseFormattedDate(dateString);
  if (isNaN(requestDate.getTime())) {
    return labels.utils.date.unknown;
  }

  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const requestDay = new Date(
    requestDate.getFullYear(),
    requestDate.getMonth(),
    requestDate.getDate(),
  );

  const diffDays = Math.floor(
    (today.getTime() - requestDay.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return labels.utils.date.today;
  if (diffDays === 1) return labels.utils.date.yesterday;

  return labels.utils.date.daysAgo(diffDays);
};
