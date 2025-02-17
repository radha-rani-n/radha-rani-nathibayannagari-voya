import { AutoComplete } from "antd";
import "./SearchAuto.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
type FetchPlacesType = { value: string }[];

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const navigate = useNavigate();
  const onSearch = (searchText: string) => {
    if (searchText.length > 0) {
      axios
        .get(`${API_URL}/places/auto-complete?input=${searchText}`)
        .then((response) => {
          const searchData = response.data.map((res) => {
            return { value: res.description };
          });
          setOptions(searchData);
        });
    } else {
      setOptions([]);
    }
  };

  const onSelect = (data: string) => {
    navigate(`/places/${data}`);
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <>
      <AutoComplete
        value={value}
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        placeholder="control mode"
        className="search-bar"
      />
    </>
  );
};
export default SearchBar;
