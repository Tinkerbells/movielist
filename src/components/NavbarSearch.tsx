import SearchInput from "@/UI/SearchInput";
import React, { ChangeEvent, useState } from "react";

const NavbarSearch = () => {
  const [search, setSearch] = useState<string>("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  console.log(search);
  return <SearchInput value={search} onChange={handleChange} />;
};

export default NavbarSearch;
