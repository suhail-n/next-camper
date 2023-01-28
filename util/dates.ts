import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function convertDate(
  date: number | string,
  language = "en-US",
  options: any = { year: "numeric", month: "long", day: "numeric" }
) {
  return new Date(date).toLocaleDateString(language, options);
}


export function fromNow(date: number | string | Date): string {
  return dayjs(date).fromNow();
}