import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";
import "./YourTrips.scss";
import { Link } from "react-router-dom";
import { useSession } from "@clerk/clerk-react";
import { CustomModal } from "../../components/Modal/CustomModal";
import EditTrip from "../EditTrip/EditTrip";
import { useCustomModal } from "../../hooks/useModal";
import { Button, Descriptions, notification } from "antd";
interface tripData {
  trip_name: string;
  place_name: string;
  from_date: Date;
  to_date: Date;
  no_of_travellers: number;
  trip_id: number;
}

const YourTrips = () => {
  const { isLoaded, session, isSignedIn } = useSession();
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [trips, setTrips] = useState<tripData[] | null>(null);
  const { open, confirmLoading, showModal, handleOk, handleCancel } =
    useCustomModal();
  const [api, contextHolder] = notification.useNotification();
  type NotificationType = "success" | "info" | "warning" | "error";

  const openNotification = (message: string, type: NotificationType) => {
    api[type]({
      message: "Trip Plan Update",
      description: message,
      duration: 4,
    });
  };
  function formatDate(timestamp) {
    const date = new Date(timestamp);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month < 10 ? "0" + month : month}/${
      day < 10 ? "0" + day : day
    }/${year}`;
  }
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchTrips = useCallback(async () => {
    const token = await session?.getToken();
    if (!token) {
      return;
    }
    try {
      const { data } = await axios.get(`${API_URL}/trips`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTrips(data);
    } catch (e) {
      console.error(`Error getting trips : ${e}`);
    }
  }, [API_URL, session]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);
  const handleDeleteTrip = useCallback(
    async (id: number) => {
      const token = await session?.getToken();
      if (!token) {
        return;
      }
      await axios.delete(`${API_URL}/trips/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTrips();
    },
    [API_URL, fetchTrips, session]
  );

  if (!isLoaded) {
    return null;
  }
  if (!isSignedIn) {
    return null;
  }
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
            <div className="trips__item-title">
              <h3>{trip.trip_name}</h3>

              <Link to={`/trips/${trip.trip_id}`} className="trips__trip-name">
                <Button>View More</Button>{" "}
              </Link>
            </div>
            <div className="trips__item-data">
              <p>PlaceName: {trip.place_name}</p>
              <p>FromDate: {formatDate(trip.from_date)}</p>
              <p>ToDate: {formatDate(trip.to_date)}</p>
              <p>NoOfTravellers: {trip.no_of_travellers}</p>
            </div>
            <div className="trips__buttons">
              <Button
                variant="text"
                color="default"
                onClick={() => {
                  setSelectedTripId(`${trip.trip_id}`);
                  showModal();
                }}
                className="edit-trip"
              >
                <Pencil />
              </Button>
              <Button>
                <Trash
                  onClick={() => handleDeleteTrip(+`${trip.trip_id}`)}
                  className="trips__delete-trip"
                />
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <CustomModal
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <EditTrip
          id={selectedTripId}
          openNotification={openNotification}
          contextHolder={contextHolder}
        />
      </CustomModal>
    </section>
  );
};
export default YourTrips;
