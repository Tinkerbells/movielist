interface ITMDBImageLoader {
  src: string;
  width: number;
}
export const TMDBImageLoader = ({ src }: ITMDBImageLoader) => {
  return `https://image.tmdb.org/t/p/w400/${src}`;
};
