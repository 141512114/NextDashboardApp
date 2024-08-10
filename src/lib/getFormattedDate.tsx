export default function getFormattedDate(date: string) {
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(
    new Date(date),
  );
}
