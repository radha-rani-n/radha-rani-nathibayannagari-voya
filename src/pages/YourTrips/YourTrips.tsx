import { useEffect, useState } from "react";
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
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
    return <p>Loading..</p>;
  }
  if (trips.length < 1) {
    return <h2>You don't have any planned trips</h2>;
  }
  return (
    <section className="trips">
      <h2 className="trips__title">Your planned trips</h2>

      <ul className="trips__list">
        {trips.map((trip, i: number) => (
          <li key={i} className="trips__list-item">
            <Link to={`/trips/${trip.trip_id}`} className="trips__trip-name">
              <h3>{trip.trip_name}</h3>
            </Link>
            <Link
              to={`/trips/${trip.trip_id}/edit`}
              className="trips__edit-trip"
            >
              <EditOutlined />
            </Link>

            <DeleteOutlined
              onClick={() => handleDeleteTrip(`${trip.trip_id}`)}
              className="trips__delete-trip"
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
export default YourTrips;
