import axios from "axios";
import "./PopularPlaceCard.scss";
import { useEffect, useState } from "react";
const PopularPlaceCard = ({ place }) => {
  console.log(place);
  const [placeImage, setPlaceImage] = useState();
  const UNSPLASH_API = import.meta.env.VITE_UNSPLASH_API_KEY;
  console.log(UNSPLASH_API);
  useEffect(() => {
    const getPlaceImage = async () => {
      try {
        const { data } = await axios.get(
          `https:api.unsplash.com/search/photos`,
          {
            params: {
              query: place,
              orientation: "landscape",
              client_id: UNSPLASH_API,
            },
          }
        );
        setPlaceImage(data.results[0].urls.regular);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    getPlaceImage();
  }, []);

  return (
    <article className="place-card">
      <h4 className="place-card__title">{place}</h4>
      <img src={placeImage} alt={place} className="place-card__image" />
    </article>
  );
};

export default PopularPlaceCard;
