import { useEffect, useState } from "react";
import axios from "axios";
import "./YourTrips.scss";
import { Link } from "react-router-dom";
interface tripData {
  trip_name: string;
  place_name: string;
  from_date: Date;
  to_date: Date;
  no_of_travellers: number;
  trip_id: number;
}

const YourTrips = () => {
  const [trips, setTrips] = useState<tripData[] | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchTrips = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/trips`);
      setTrips(data);
    } catch (e) {
      console.error(`Error getting trips : ${e}`);
    }
  };
  useEffect(() => {
    fetchTrips();
  }, [API_URL]);
  const handleDeleteTrip = async (id: number) => {
    await axios.delete(`${API_URL}/trips/${id}`);
    fetchTrips();
  };

  if (!trips) {
    return <>Loading..</>;
  }
  return (
    <section>
      <h2>Your planned trips</h2>
      <ul>
        {trips.map((trip, i: number) => (
          <li key={i}>
            <Link to={`/trips/${trip.trip_id}`}>
              <div>{trip.trip_name}</div>
            </Link>
            <Link to={`/trips/${trip.trip_id}/edit`}>
              <button>edit</button>
            </Link>
            <button onClick={() => handleDeleteTrip(`${trip.trip_id}`)}>
              Delete Trip
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default YourTrips;
