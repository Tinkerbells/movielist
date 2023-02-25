import { FC } from "react";
import { IconContext } from "react-icons";

interface IconProviderProps {
  children: React.ReactNode;
  size?: string;
  className?: string;
  style?: string;
}
const IconProvider: FC<IconProviderProps> = ({ children, size, className }) => {
  return (
    <IconContext.Provider value={{ size: size, className: className }}>
      <div>{children}</div>
    </IconContext.Provider>
  );
};

export default IconProvider;
