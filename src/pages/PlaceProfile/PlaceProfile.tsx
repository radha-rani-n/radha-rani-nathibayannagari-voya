import { useLocation } from "react-router-dom";
import "./PlaceProfile.scss";
import axios from "axios";
import { DownOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, Modal, Space } from "antd";
import { useSession } from "@clerk/clerk-react";

const SearchBar = () => {
  const { session } = useSession();
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
    const token = await session?.getToken();
    const trip_id = selectedTrip?.trip_id;
    const { id, displayName, photos, location } = selectedPlace;
    const photo_reference = photos && photos.length > 0 && photos[0].name;
    const data = {
      place_id: id,
      place_name: displayName.text,
      photo_reference: photo_reference,
      latitude: location.latitude,
      longitude: location.longitude,
      trip_id: trip_id,
    };
    await axios.post("http://localhost:8080/places/addPlace", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
  };

  const updatePlaces = useCallback(
    async (searchText: string) => {
      const token = await session?.getToken();
      if (!token) {
        return;
      }
      axios
        .get("http://localhost:8080/places/search", {
          params: { q: decodeURIComponent(searchText) },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          setSearchData(response.data.places);
        });
    },
    [session]
  );

  const updateTrips = useCallback(async () => {
    const token = await session?.getToken();
    if (!token) {
      return;
    }
    axios
      .get("http://localhost:8080/trips", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setItems(response.data);
      });
  }, [session]);

  const refreshItems = useCallback(async () => {
    const token = await session?.getToken();
    if (!token) {
      return;
    }
    axios
      .get("http://localhost:8080/trips", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setItems(response.data);
      });
  }, [session]);

  useEffect(() => {
    const splitPath = pathname.split("/");
    const searchText = splitPath[splitPath.length - 1];
    updatePlaces(searchText);
    updateTrips();
  }, [pathname, updatePlaces, updateTrips]);

  const handlePlaceOnClick = (placeData: any) => {
    setSelectedPlace(placeData);
    setOpen(true);
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
        {searchData.map((data, i: number) => (
          <li key={i} className="place-profile__place">
            <div className="place-profile__img-name">
              {data.photos && data.photos.length > 0 && (
                <img
                  className="place-profile__place-img"
                  src={`https://places.googleapis.com/v1/${data.photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyDD3fAb1QdZzEEn5ZJV7IlIQeUu9H8sdwU`}
                />
              )}
              <p className="place-profile__place-name">
                {data.displayName.text}
              </p>
            </div>
            <div onClick={() => handlePlaceOnClick(data)}>
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        title="Add place to trip"
        okText="submit"
        open={open}
        onCancel={handleCancel}
        footer={[]}
      >
        <Dropdown menu={{ items: dropDownItems, onClick }}>
          <a
            onClick={(e) => {
              e.preventDefault();
              refreshItems();
            }}
          >
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
    </section>
  );
};
export default SearchBar;
