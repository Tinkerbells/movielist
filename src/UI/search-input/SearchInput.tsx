import { ChangeEvent, FC } from "react";
import { FiSearch } from "react-icons/fi";
import { IconProvider } from "../icons/IconProvider";

interface SearchInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
export const SearchInput: FC<SearchInputProps> = ({ onChange, value }) => {
  return (
    <div className="flex min-w-[500px]">
      <input
        type="text"
        placeholder="Search…"
        className="input-bordered input w-full"
        onChange={onChange}
        value={value}
      />
      <button className="btn-square btn ml-1">
        <IconProvider size="1.50rem">
          <FiSearch />
        </IconProvider>
      </button>
    </div>
  );
};
