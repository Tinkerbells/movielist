import { MovieCardType } from "@/types/movie";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { AiFillHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import { HorizontalMovieCard } from "./horizontal/HorizontalMovieCard";
import { VerticalMovieCard } from "./vertical/VerticalMovieCard";

const CardVariants = ["horizontal", "vertical"] as const;

type VariantType = (typeof CardVariants)[number];

export interface MovieCardProps {
  isAuth: boolean;
  isAddLoading: boolean;
  isRemoveLoading: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export const MovieCard: FC<MovieCardType & { variant: VariantType }> = ({
  movieId,
  title,
  releaseDate,
  overview,
  posterPath,
  isLiked,
  rating,
  variant,
}) => {
  const { data: sessionData } = useSession();
  const { refetch } = api.movie.getLiked.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  const { mutate: setLiked, isLoading: isSetLoading } =
    api.movie.setLiked.useMutation({
      onSuccess: async () => {
        await refetch();
        toast(`Movie has been added to liked`, {
          autoClose: 500,
          pauseOnHover: false,
          theme: "dark",
          icon: <AiFillHeart />,
        });
      },
    });
  const { mutate: deleteLiked, isLoading: isDeleteLoading } =
    api.movie.deleteLiked.useMutation({
      onSuccess: async () => {
        await refetch();
        toast(`Movie has been removed from liked`, {
          autoClose: 500,
          pauseOnHover: false,
          theme: "dark",
          icon: <AiFillHeart />,
        });
      },
    });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLiked) {
      void deleteLiked({
        movieId: movieId,
      });
    } else {
      void setLiked({
        posterPath: posterPath,
        title: title,
        movieId: movieId,
        releaseDate: releaseDate,
        overview: overview,
        rating: rating,
      });
    }
  };
  if (variant === "horizontal") {
    return (
      <HorizontalMovieCard
        movieId={movieId}
        title={title}
        releaseDate={releaseDate}
        overview={overview}
        posterPath={posterPath}
        isLiked={isLiked}
        rating={parseFloat(rating.toFixed(1))}
        isAuth={!!sessionData?.user}
        isAddLoading={isSetLoading}
        isRemoveLoading={isDeleteLoading}
        handleClick={handleClick}
      />
    );
  }
  return (
    <VerticalMovieCard
      movieId={movieId}
      title={title}
      releaseDate={releaseDate}
      overview={overview}
      posterPath={posterPath}
      isLiked={isLiked}
      rating={parseFloat(rating.toFixed(1))}
      isAuth={!!sessionData?.user}
      isAddLoading={isSetLoading}
      isRemoveLoading={isDeleteLoading}
      handleClick={handleClick}
    />
  );
};
