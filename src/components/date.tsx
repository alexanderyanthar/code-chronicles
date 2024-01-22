import { parseISO, format } from "date-fns";

interface DateProps {
  dateString: string;
}

export default function Date({ dateString }: DateProps) {
  const date = format(parseISO(dateString), "LLLL d, yyyy");
  return <time dateTime={dateString}>{date}</time>;
}
