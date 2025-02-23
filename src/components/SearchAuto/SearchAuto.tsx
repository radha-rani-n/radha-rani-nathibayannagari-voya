import { AutoComplete, Input } from "antd";
import Route from "../../assets/illustrations/Journey.gif";
import "./SearchAuto.scss";
import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@clerk/clerk-react";

const API_URL = import.meta.env.VITE_API_URL;

const SearchBar = () => {
  const { session, isSignedIn } = useSession();

  if (!isSignedIn) {
    // redirect to sign in page
  }

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
    <section className="search-page">
      <div className="search">
        <img src={Route} alt="" />
        <img src={Route} alt="" />
        <AutoComplete
          value={value}
          options={options}
          onSelect={onSelect}
          onSearch={onSearch}
          onChange={onChange}
          className="search__bar"
        >
          <Input.Search
            size="large"
            placeholder="Enter a City or Country"
            enterButton
            className="search__bar-input"
          />
        </AutoComplete>
      </div>
    </section>
  );
};
export default SearchBar;
