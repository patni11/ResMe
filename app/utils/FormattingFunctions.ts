export function getFormattedDate(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.getFullYear().toString();
  const month = months[date.getMonth()];

  return `${month} ${year}`;
}

type DecimalValue = {
  $numberDecimal: string;
};

type PossibleNumber = Number | DecimalValue;

export function parseDecimal(value: PossibleNumber): number {
  if ("$numberDecimal" in value) {
    return parseFloat(value.$numberDecimal);
  } else {
    return value as number;
  }
}

export function timeAgo(dateParam: Date | string): string | null {
  if (!dateParam) {
    return null;
  }

  const date: Date =
    typeof dateParam === "object" ? dateParam : new Date(dateParam);
  const today: Date = new Date();
  const seconds: number = Math.round((today.getTime() - date.getTime()) / 1000);
  const minutes: number = Math.round(seconds / 60);
  const hours: number = Math.round(minutes / 60);
  const days: number = Math.round(hours / 24);
  const years: number = Math.round(days / 365);

  if (seconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes} minute(s) ago`;
  } else if (hours < 24) {
    return `${hours} hour(s) ago`;
  } else if (days < 365) {
    return `${days} day(s) ago`;
  } else {
    return `${years} year(s) ago`;
  }
}
