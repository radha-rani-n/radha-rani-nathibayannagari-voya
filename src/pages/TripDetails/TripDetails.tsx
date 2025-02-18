import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    <div>
      <p>{tripdata.trip.trip_name}</p>
      <ul>
        {tripdata.places.map((place) => (
          <li>{place.place_name}</li>
        ))}
      </ul>
    </div>
  );
};
export default TripDetails;
