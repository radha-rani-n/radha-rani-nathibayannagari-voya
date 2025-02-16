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
  id: number;
}

const YourTrips = () => {
  const [trips, setTrips] = useState<tripData[] | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/trips`);
        setTrips(data);
      } catch (e) {
        console.error(`Error getting trips : ${e}`);
      }
    };
    fetchTrips();
  }, [trips]);
  if (!trips) {
    return <>Loading..</>;
  }
  return (
    <section>
      <h2>Your planned trips</h2>
      <ul>
        {trips.map((trip, i: number) => (
          <li key={i}>
            <div>
              {trip.trip_name}
              {trip.id}
            </div>
            <Link to={`/trips/${trip.id}/edit`}>
              <button>edit</button>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default YourTrips;
