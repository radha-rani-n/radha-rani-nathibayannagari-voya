import { Input } from "antd";

const SearchBar = () => {
  return (
    <>
      <section className="search-bar">
        <Input.Search
          type="text"
          placeholder="Enter place name"
          size="large"
          //   enterButton="Search"
        />
      </section>
    </>
  );
};
export default SearchBar;
