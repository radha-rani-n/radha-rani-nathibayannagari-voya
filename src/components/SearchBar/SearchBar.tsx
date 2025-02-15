import { Input } from "antd";
import "./SearchBar.scss";
import axios from "axios";
import { useState } from "react";
const SearchBar = () => {
  //   const API_URL = import.meta.env.VITE_API_URL;
  const [searchText, setSearchText] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.get("http://localhost:8080/places/search", {
      params: { q: `${searchText}` },
    });

    console.log(data.results);
  };

  return (
    <>
      <form className="search" onSubmit={handleFormSubmit}>
        <Input.Search
          type="text"
          placeholder="Enter place name"
          size="large"
          //   enterButton="Search"
          className="search__bar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
    </>
  );
};
export default SearchBar;
