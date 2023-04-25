import { ChangeEvent, FC, SyntheticEvent } from "react";
import { FiSearch } from "react-icons/fi";
import { IconProvider } from "../icons/IconProvider";

interface SearchInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSumbit: (event: SyntheticEvent) => void;
  value: string;
}
export const SearchInput: FC<SearchInputProps> = ({
  onChange,
  onSumbit,
  value,
}) => {
  return (
    <form className="flex min-w-[500px]" onSubmit={onSumbit}>
      <input
        type="text"
        placeholder="Search…"
        className="input-bordered input w-full"
        onChange={onChange}
        value={value}
      />
      <button className="btn-square btn ml-1" type="submit">
        <IconProvider size="1.50rem">
          <FiSearch />
        </IconProvider>
      </button>
    </form>
  );
};
