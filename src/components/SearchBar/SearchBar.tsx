import { Input } from "antd";
import "./SearchBar.scss";
import axios from "axios";
import { useState } from "react";
import SearchResult from "../../pages/SearchResult/SearchResult";
const SearchBar = () => {
  //   const API_URL = import.meta.env.VITE_API_URL;
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.get("http://localhost:8080/places/search", {
      params: { q: `${searchText}` },
    });

    setSearchData(data.results);
  };

  return (
    <>
      <form className="search" onSubmit={handleFormSubmit}>
        <Input.Search
          placeholder="Enter place name"
          size="large"
          //   enterButton="Search"
          className="search__bar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
      {searchData && <SearchResult results={searchData} query={searchText} />}
    </>
  );
};
export default SearchBar;
