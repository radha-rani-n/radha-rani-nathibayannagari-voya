import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TripDetails.scss";
const TripDetails = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [tripData, setTripData] = useState(null);
  function formatDate(timestamp) {
    const date = new Date(timestamp);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month < 10 ? "0" + month : month}/${
      day < 10 ? "0" + day : day
    }/${year}`;
  }
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
  if (!tripData) {
    return <p>Loading...</p>;
  }
  return (
    <article className="trip-data">
      <h3 className="trip-data__title">{tripData.trip.trip_name}</h3>

      <div
        title={tripData.trip.trip_name}
        variant="borderless"
        style={{ width: 300 }}
        className="trip-data__card"
      >
        <h4>Place Name: {tripData.trip.place_name}</h4>
        <p>From Date: {formatDate(tripData.trip.from_date)}</p>
        <p>To Date:{formatDate(tripData.trip.to_date)}</p>
        <p>No. Of Travellers: {tripData.trip.no_of_travellers}</p>
      </div>
      <ul className="trip-data__places">
        {tripData.places.map((place, i) => (
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
