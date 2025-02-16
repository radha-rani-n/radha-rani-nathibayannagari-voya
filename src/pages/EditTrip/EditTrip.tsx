import { useParams } from "react-router-dom";

import "./EditTrip.scss";
import { useState, useEffect } from "react";
import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

interface trip {
  trip_name: string;
  place_name: string;
  from_date: Date;
  to_date: Date;
  no_of_travellers: number;
}
const EditTrip = () => {
  const [trip, setTrip] = useState<trip | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/trips/${id}`);
        setTrip(data);
      } catch (err) {
        console.error(`Error getting trip data: ${err}`);
      }
    };
    fetchTrips();
  }, [id]);

  if (!trip) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <h2>Edit Trip Data</h2>
      <form>
        <label htmlFor="tripName">
          Trip Name:
          <input type="text" name="tripName" defaultValue={trip.trip_name} />
        </label>
        <label htmlFor="placeName">
          Place Name:
          <input type="text" name="placeName" defaultValue={trip.place_name} />
        </label>
        <label htmlFor="fromdate">
          From Date:
          <input type="date" name="fromDate" defaultValue={trip.from_date} />
        </label>
        <label htmlFor="toDate">
          To Date:
          <input type="date" name="toDate" defaultValue={trip.to_date} />
        </label>
        <label htmlFor="noOfTravellers">
          No. Of Travllers:
          <input
            type="number"
            name="noOfTravellers"
            defaultValue={trip.no_of_travellers}
          />
        </label>
      </form>
    </section>
  );
};

export default EditTrip;
