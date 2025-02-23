import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import "./YourTrips.scss";

import { useSession } from "@clerk/clerk-react";
import { CustomModal } from "../../components/Modal/CustomModal";
import EditTrip from "../EditTrip/EditTrip";
import { useCustomModal } from "../../hooks/useCustomModal";
import { Button, notification } from "antd";
import CustomTable from "../../components/CustomTable/CustomTable";
import { useTripsStore } from "../../hooks/useTripsStore";

const YourTrips = () => {
  const { isLoaded, session, isSignedIn } = useSession();
  const trips = useTripsStore((state) => state.trips);
  const fetchAllTrips = useTripsStore((state) => state.fetchAllTrips);

  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  useEffect(() => {
    fetchAllTrips(session);
  }, [fetchAllTrips, session]);

  const { open, confirmLoading, showModal, handleOk, handleCancel } =
    useCustomModal();
  const {
    open: openDelete,
    showModal: showModalDelete,
    handleOk: handleDeleteOk,
    handleCancel: handleDeleteCancel,
  } = useCustomModal();
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

  const onEditClick = (trip) => {
    setSelectedTripId(trip.trip_id);
    showModal();
  };

  const onDeleteClick = (trip) => {
    setSelectedTripId(trip.trip_id);
    showModalDelete();
  };

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
      fetchAllTrips(session);
    },
    [API_URL, session, fetchAllTrips]
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

  const handleEditSubmit = () => {
    fetchAllTrips(session);
    handleOk();
  };

  return (
    <section className="trips">
      <h2 className="trips__title">Your planned trips</h2>
      <CustomTable
        data={trips}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />

      <CustomModal
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
        confirmLoading={confirmLoading}
        title="Edit Trip"
      >
        <EditTrip
          id={selectedTripId}
          openNotification={openNotification}
          contextHolder={contextHolder}
          onSubmit={handleEditSubmit}
        />
      </CustomModal>
      <CustomModal
        className="trips__delete-modal"
        title="Delete Trip"
        open={openDelete}
        footer={null}
        okText="Yes"
        cancelText="No"
      >
        <p className="trips__delete-confirm">Do you want to delete this trip</p>
        <div className="trips__delete-buttons">
          <Button onClick={handleDeleteCancel} className="trips__delete-no">
            No
          </Button>
          <Button
            className="trips__delete-yes"
            type="primary"
            onClick={() => {
              handleDeleteTrip(+`${selectedTripId}`);
              handleDeleteOk();
            }}
          >
            Yes
          </Button>
        </div>
      </CustomModal>
    </section>
  );
};
export default YourTrips;
