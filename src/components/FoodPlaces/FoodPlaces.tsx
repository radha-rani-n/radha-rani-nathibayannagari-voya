import axios from "axios";
import { useSession } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

type PlaceType = {
  id: string;
  types: string[];
  formattedAddress: string;
  location: {
    latitude: string;
    longitude: string;
  };
  displayName: { text: string };
  photos: { name: string; authorAttributions: { photoUri: string } }[];
};

const FoodPlaces = ({ searchText }: { searchText: string }) => {
  const [searchData, setSearchData] = useState<PlaceType[] | null>(null);
  const { session } = useSession();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getFoodPlaces = async () => {
      const token = await session?.getToken();
      if (!token) return;
      axios
        .get(`${API_URL}/places/search-food-places`, {
          params: { q: decodeURIComponent(searchText) },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSearchData(response.data.places);
          console.log(response.data.places);
        });
    };
    getFoodPlaces();
  }, [searchText]);

  return (
    <ul>
      {searchData?.map((place, i) => (
        <li key={i}>{place.displayName.text}</li>
      ))}
    </ul>
  );
};

export default FoodPlaces;
