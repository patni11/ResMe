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
