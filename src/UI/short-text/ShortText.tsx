import { FC, HTMLAttributes } from "react";

interface ShortTextProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  maxLength: number;
}
export const ShortText: FC<ShortTextProps> = ({ text, maxLength, ...rest }) => {
  return (
    <p {...rest}>
      {text.slice(0, maxLength) + (text.length > maxLength ? "..." : "")}
    </p>
  );
};
