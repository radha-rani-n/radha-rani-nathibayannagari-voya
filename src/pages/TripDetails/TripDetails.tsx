import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TripDetails.scss";
const TripDetails = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [tripdata, setTripData] = useState(null);
  useEffect(() => {
    const getTripData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/trips/${id}`);
        setTripData(data);
      } catch (err) {
        console.error(err);
      }
    };
    getTripData();
  }, []);
  if (!tripdata) {
    return <p>Loading...</p>;
  }
  return (
    <article className="trip-data">
      <h3 className="trip-data__title">{tripdata.trip.trip_name}</h3>
      <ul className="trip-data__places">
        {tripdata.places.map((place, i) => (
          <li className="trip-data__place" key={i}>
            <img
              className="trip-data__place-img"
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photo_reference}&key=AIzaSyDD3fAb1QdZzEEn5ZJV7IlIQeUu9H8sdwU`}
            />
            <p className="trip-data__place-name">{place.place_name}</p>
          </li>
        ))}
      </ul>
    </article>
  );
};
export default TripDetails;
