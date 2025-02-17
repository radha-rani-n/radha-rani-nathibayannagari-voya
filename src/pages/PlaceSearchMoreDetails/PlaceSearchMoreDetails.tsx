import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
const PlaceSearchDetails = () => {
  //   const API_KEY = import.meta.env.WEATHER_API_KEY;
  const location = useLocation();
  const { query } = location.state;
  console.log(query);
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    const getWeatherData = async () => {
      const { data } = await axios.get(
        ` http://api.weatherapi.com/v1/current.json?key=1194aa2fcec746d8bd5221944251602
&q=${query}`
      );
      console.log(data);
      setWeatherData(data);
    };
    getWeatherData();
  }, [query]);
  if (!weatherData) {
    return <p>Loading..</p>;
  }
  return (
    <article>
      <p>{weatherData.location.name}</p>
      <p>{weatherData.location.region}</p>
      <p>Current Temparature: {weatherData.current.temp_c}</p>
    </article>
  );
};

export default PlaceSearchDetails;
