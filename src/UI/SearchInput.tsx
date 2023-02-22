import { ChangeEvent, FC } from "react";
import { SearchIcon } from "./icons/SearchIcon";

interface SearchInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
const SearchInput: FC<SearchInputProps> = ({ onChange, value }) => {
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
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchInput;
