import { useLocation } from "react-router-dom";
import "./PlaceProfile.scss";
import axios from "axios";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import PlanTripButton from "../../components/PlanTripButton/PlanTripButton";
import { Button, Dropdown, Modal, Space } from "antd";

const SearchBar = () => {
  //   const API_URL = import.meta.env.VITE_API_URL;

  const [searchData, setSearchData] = useState(null);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<{}[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<{
    trip_name: string;
    trip_id: string;
  } | null>(null);

  const [selectedPlace, setSelectedPlace] = useState(null);

  const onClick: MenuProps["onClick"] = ({ key }) => {
    console.log(items);
    const tripInfo = items?.find(
      (item) => item && item.trip_id === Number(key)
    );
    setSelectedTrip({
      trip_name: tripInfo.trip_name,
      trip_id: tripInfo.trip_id,
    });
  };

  const handleCancel = () => {
    setSelectedPlace(null);
    setSelectedTrip(null);
    setOpen(false);
  };

  const savePlace = async () => {
    const trip_id = selectedTrip?.trip_id;
    const { place_id, name, photos } = selectedPlace;
    const photo_reference =
      photos && photos.length > 0 && photos[0].photo_reference;
    const data = {
      place_id: place_id,
      place_name: name,
      photo_reference: photo_reference,
      trip_id: trip_id,
    };
    await axios.post("http://localhost:8080/places/addPlace", data);
    console.log(data);
  };

  useEffect(() => {
    const splitPath = pathname.split("/");
    const searchText = splitPath[splitPath.length - 1];
    axios
      .get("http://localhost:8080/places/search", {
        params: { q: `${searchText}` },
      })
      .then((response) => {
        setSearchData(response.data.results);
        console.log(response.data.results);
      });

    axios.get("http://localhost:8080/trips").then((response) => {
      setItems(response.data);
    });
  }, [pathname]);

  const handlePlaceOnClick = (placeData: any) => {
    setSelectedPlace(placeData);
    setOpen(true);
    // axios.patch(`http://localhost:8080/`);
  };
  if (!searchData) {
    return <p>Loading...</p>;
  }

  const dropDownItems: MenuProps["items"] = items.map((item: any) => {
    return {
      label: <span>{item.trip_name}</span>,
      key: item.trip_id,
    };
  });

  return (
    <section className="place-profile">
      <ul className="place-profile__places">
        {searchData.map(
          (data, i: number) =>
            i < 4 && (
              <li key={i} className="place-profile__place">
                <div className="place-profile__img-name">
                  <img
                    className="place-profile__place-img"
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
                      data.photos && data.photos[0].photo_reference
                    }&key=AIzaSyDD3fAb1QdZzEEn5ZJV7IlIQeUu9H8sdwU`}
                  />
                  <p className="place-profile__place-name">{data.name}</p>
                </div>
                <div onClick={() => handlePlaceOnClick(data)}>
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
              </li>
            )
        )}
      </ul>

      <Modal
        title="Add place to trip"
        okText="submit"
        open={open}
        onCancel={handleCancel}
        footer={[]}
      >
        {" "}
        <Dropdown menu={{ items: dropDownItems, onClick }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Select A Trip
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        {selectedTrip && <span>{selectedTrip.trip_name}</span>}
        <Button type={"primary"} onClick={savePlace}>
          Add Place
        </Button>
      </Modal>
      <div className="plan-trip-button">
        <PlanTripButton
          refreshItems={() => {
            axios.get("http://localhost:8080/trips").then((response) => {
              setItems(response.data);
            });
          }}
        />
      </div>
    </section>
  );
};
export default SearchBar;
