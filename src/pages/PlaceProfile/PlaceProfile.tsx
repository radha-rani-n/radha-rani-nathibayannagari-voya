import { useLocation } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import PlanTripButton from "../../components/PlanTripButton/PlanTripButton";
// import { PlacesClient } from "@googlemaps/places";
const SearchBar = () => {
  //   const API_URL = import.meta.env.VITE_API_URL;

  const [searchData, setSearchData] = useState(null);
  const { pathname } = useLocation();
  // const placesClient = new PlacesClient();
  useEffect(() => {
    const splitPath = pathname.split("/");
    const searchText = splitPath[splitPath.length - 1];
    axios
      .get("http://localhost:8080/places/search", {
        params: { q: `${searchText}` },
      })
      .then((response) => {
        setSearchData(response.data.results);
        console.log(response.data.results);
      });
  }, [pathname]);

  // const getPhotoByPlace = async (placeId: string, photoReference: string) => {
  //   const name = `places / ${placeId} / photos / ${photoReference} / media`;
  //   // const request = { name };
  //   // const response = await placesClient.getPhotoMedia(request);
  //   console.log(response);
  // };
  if (!searchData) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <ul>
        {searchData.map((data, i: number) => (
          <li key={i}>
            <h3>{data.name}</h3>
            <img
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
                data.photos && data.photos[0].photo_reference
              }&key=AIzaSyDD3fAb1QdZzEEn5ZJV7IlIQeUu9H8sdwU`}
            />
          </li>
        ))}
      </ul>
      <PlanTripButton />
    </>
  );
};
export default SearchBar;
