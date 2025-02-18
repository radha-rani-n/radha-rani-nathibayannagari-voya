import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "antd";
import "./TripDetails.scss";
const TripDetails = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [tripData, setTripData] = useState(null);
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
      {/* <h3 className="trip-data__title">{tripData.trip.trip_name}</h3> */}

      <Card
        title={tripData.trip.trip_name}
        variant="borderless"
        style={{ width: 300 }}
      >
        <h4>Place Name: {tripData.trip.place_name}</h4>
        <p>From Date: {tripData.trip.from_date}</p>
        <p>To Date: {tripData.trip.to_date}</p>
        <p>No. Of Travellers: {tripData.trip.no_of_travellers}</p>
      </Card>
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
