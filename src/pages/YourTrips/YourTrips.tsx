import { useEffect } from "react";
import axios from "axios";
import "./YourTrips.scss";

const YourTrips = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await axios.get(`API_URL`);
      } catch (e) {
        console.error(`Error getting trips : ${e}`);
      }
    };
    fetchTrips();
  });
  return (
    <section>
      <h2>Your planned trips</h2>
    </section>
  );
};
export default YourTrips;
