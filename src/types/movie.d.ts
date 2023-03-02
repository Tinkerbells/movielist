import { RouterOutputs } from "@/utils/api";

interface IMovieLiked {
  isLiked?: boolean;
}

type MovieType = Omit<RouterOutputs["movie"]["getLiked"][0], "id" | "userId">;

export type MovieListItemType = MovieType & IMovieLiked;
