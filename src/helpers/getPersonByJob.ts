import { Crew } from "@/types/tmdb";
export const getPersonByJob = (crew: Crew[], job: string) => {
  const person = crew.find((person) => person.job.toLowerCase() === job);
  return { name: person?.name, profile: person?.profile_path };
};
