export const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  minutes = minutes - hours * 60;
  return `${hours}h ${minutes}m`;
};
