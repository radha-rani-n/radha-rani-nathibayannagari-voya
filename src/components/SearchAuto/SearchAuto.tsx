import { AutoComplete, ConfigProvider, Input } from "antd";
import "./SearchAuto.scss";
import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@clerk/clerk-react";
import qs from "qs";

const API_URL = import.meta.env.VITE_API_URL;

const SearchBar = () => {
  const { session } = useSession();
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const navigate = useNavigate();

  const updateOptions = useCallback(
    async (searchText: string) => {
      const token = await session?.getToken();
      if (!token) {
        return;
      }
      axios
        .get(`${API_URL}/places/auto-complete`, {
          params: {
            input: searchText,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const searchData = response.data.map((res) => {
            return {
              value: res.placePrediction.text.text,
            };
          });
          setOptions(searchData);
        });
    },
    [session]
  );

  const onSearch = (searchText: string) => {
    if (searchText.length > 0) {
      updateOptions(searchText);
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
    // <ConfigProvider
    //   theme={{
    //     token: {
    //       borderRadius: 20,
    //       padding: 20,
    //       controlHeight: 40,
    //       colorBorder: "#db3069",
    //       colorTextPlaceholder: "#db3069",
    //     },
    //   }}
    // >
    <AutoComplete
      value={value}
      options={options}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
      className="search-bar"
    >
      <Input.Search
        size="large"
        placeholder="Enter a City or Country"
        enterButton
      />
    </AutoComplete>
    // </ConfigProvider>
  );
};
export default SearchBar;
