import { ChangeEvent, FC } from "react";
import { SearchIcon } from "./icons/SearchIcon";

interface SearchInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
const SearchInput: FC<SearchInputProps> = ({ onChange, value }) => {
  return (
    <div className="form-control ">
      <div className="input-group">
        <input
          type="text"
          placeholder="Search…"
          className="input-bordered input"
          onChange={onChange}
          value={value}
        />
        <button className="btn-square btn ml-0">
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
