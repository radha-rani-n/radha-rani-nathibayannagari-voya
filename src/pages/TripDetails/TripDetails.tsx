import axios from "axios";
import { Trash, CalendarDays } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./TripDetails.scss";
import { useSession } from "@clerk/clerk-react";
import MapComponent from "../../components/MapContainer/MapContainer";
import { Tooltip } from "antd";
const TripDetails = () => {
  const { session } = useSession();
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

  const getTripData = useCallback(async () => {
    const token = await session?.getToken();
    if (!token) {
      return;
    }
    try {
      const { data } = await axios.get(`${API_URL}/trips/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setTripData(data);
    } catch (err) {
      console.error(err);
    }
  }, [API_URL, session, id]);

  useEffect(() => {
    getTripData();
  }, [API_URL, id, session, getTripData]);

  const handleDeletePlace = useCallback(
    async (tripId: number, placeId: string) => {
      const token = await session?.getToken();
      if (!token) {
        return;
      }
      await axios.delete(`${API_URL}/places/${id}`, {
        params: { placeId: placeId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTripData();
    },
    [API_URL, session]
  );

  if (!tripData) {
    return <p>Loading...</p>;
  }
  return (
    <div className="trip-data">
      <div className="trip-data__container">
        <article className="trip-data__details">
          <div className="trip-data__card">
            <div className="trip-data__border">
              <div className="trip-data__border-inside">
                <h3 className="trip-data__title">
                  Trip to {tripData.trip.trip_name}
                </h3>

                <h4>Place Name: {tripData.trip.place_name}</h4>
                <p className="trip-data__date">
                  <CalendarDays />
                  {formatDate(tripData.trip.from_date)} -{" "}
                  {formatDate(tripData.trip.to_date)}
                </p>
                {/* <p>To Date:{formatDate(tripData.trip.to_date)}</p> */}
                <p>No. Of Travellers: {tripData.trip.no_of_travellers}</p>
              </div>
            </div>
          </div>{" "}
        </article>
        {tripData.places.length > 0 && (
          <ul className="trip-data__places">
            {tripData.places.map((place, i) => (
              <li className="trip-data__place" key={i}>
                <img
                  className="trip-data__place-img"
                  src={`https://places.googleapis.com/v1/${place.photo_reference}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyDD3fAb1QdZzEEn5ZJV7IlIQeUu9H8sdwU`}
                />
                <p className="trip-data__place-name">{place.place_name}</p>
                <Tooltip title="Delete Place">
                  <Trash
                    className="trip-data__delete-icon"
                    onClick={() =>
                      handleDeletePlace(tripData.trip.trip_id, place.place_id)
                    }
                  />
                </Tooltip>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ height: "450px" }} className="trip-data__map">
        {tripData.places.length > 0 && <MapComponent tripData={tripData} />}
      </div>
    </div>
  );
};
export default TripDetails;
