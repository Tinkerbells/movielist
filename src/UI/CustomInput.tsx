import { FC, InputHTMLAttributes } from "react";
interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}
const CustomInput: FC<CustomInputProps> = ({ name, label, ...rest }) => {
  return (
    <div className="input-wrapper flex w-full flex-col gap-1">
      <label htmlFor={name} className="text-lg">
        {label}
      </label>
      <input id={name} {...rest} />
    </div>
  );
};

export default CustomInput;
