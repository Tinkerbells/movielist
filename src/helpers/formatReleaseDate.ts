import dayjs from "dayjs";

export const formatReleaseDate = (date: string) => {
  return dayjs(date).format("MMM DD, YYYY");
};
