import Image from "next/image";
import { FC, useState } from "react";
interface CustomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}
export const CustomImage: FC<CustomImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onLoadingComplete={() => setIsLoading(false)}
    />
  );
};
