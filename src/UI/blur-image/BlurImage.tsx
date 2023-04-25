import Image, { ImageLoader } from "next/image";
import { FC, useState } from "react";

interface BlurImageProps {
  src: string;
  alt: string;
  loader: ImageLoader;
  width?: number;
  height?: number;
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const BlurImage: FC<BlurImageProps> = ({
  src,
  alt,
  loader,
  width,
  height,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Image
      alt={alt}
      src={src}
      width={width || 500}
      height={height || 500}
      loader={loader}
      className={cn(
        "duration-700 ease-in-out",
        isLoading ? "scale-110 blur-2xl grayscale" : "rounded-box"
      )}
      onLoadingComplete={() => setIsLoading(false)}
    />
  );
};
