import { Input } from "antd";
import { useLocation } from "react-router-dom";
import "./PlaceProfile.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchResult from "./PlaceProfile";
const SearchBar = () => {
  //   const API_URL = import.meta.env.VITE_API_URL;

  const [searchData, setSearchData] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const splitPath = pathname.split("/");
    const searchText = splitPath[splitPath.length - 1];
    axios
      .get("http://localhost:8080/places/search", {
        params: { q: `${searchText}` },
      })
      .then((response) => {
        setSearchData(response.data.results);
        console.log(searchData);
      });
  }, [pathname]);
  if (!searchData) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <ul>
        {searchData.map((data, i) => (
          <li key={i}>{data.name}</li>
        ))}
      </ul>
    </>
  );
};
export default SearchBar;
