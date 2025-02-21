import { useLocation } from "react-router-dom";
import "./PlaceProfile.scss";
import axios from "axios";

import { DownOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, Modal, Space, notification } from "antd";
import { useSession } from "@clerk/clerk-react";

const SearchBar = () => {
  const { session } = useSession();

  // const API_URL = import.meta.env.VITE_API_URL;
  const UNSPLASH_API = import.meta.env.VITE_UNSPLASH_API_KEY;
  const [searchData, setSearchData] = useState(null);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<{}[]>([]);
  const [searchText, setSearchText] = useState("");
  const [placeImage, setPlaceImgae] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState<{
    trip_name: string;
    trip_id: string;
  } | null>(null);

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  type NotificationType = "success" | "info" | "warning" | "error";

  const openNotification = (message: string, type: NotificationType) => {
    api[type]({
      message: "Trip Plan Update",
      description: message,
      duration: 4,
    });
  };
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

  const getPlaceImage = async (searchText) => {
    try {
      const { data } = await axios.get(
        `https:api.unsplash.com/search/photos?query=${searchText}&client_id=${UNSPLASH_API}`
      );
      setPlaceImgae(data.results[0].urls.regular);
    } catch (err) {
      console.error(err);
    }
  };

  const savePlace = async () => {
    const token = await session?.getToken();
    const trip_id = selectedTrip?.trip_id;
    const { id, displayName, photos, location } = selectedPlace;
    const photo_reference = photos && photos.length > 0 && photos[0].name;
    console.log(id);
    const data = {
      place_id: id,
      place_name: displayName.text,
      photo_reference: photo_reference,
      latitude: location.latitude,
      longitude: location.longitude,
      trip_id: trip_id,
    };
    try {
      await axios.post("http://localhost:8080/places/addPlace", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      openNotification("Place added to trip Successfully!", "info");
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
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
    setSearchText(splitPath[splitPath.length - 1]);
    getPlaceImage(searchText);
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
    <>
      {" "}
      {contextHolder}
      <section className="place-profile">
        <div className="place-profile__title-image">
          <img
            src={placeImage}
            alt="place-image"
            className="place-profile__image"
          />
          <h2 className="place-profile__title">
            Popular Tourist Attractions in {decodeURIComponent(searchText)}
          </h2>
        </div>
        <ul className="place-profile__places">
          {searchData.map((data, i: number) => (
            <li key={i} className="place-profile__place">
              {data.photos && data.photos.length > 0 && (
                <img
                  className="place-profile__place-img"
                  src={`https://places.googleapis.com/v1/${data.photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyDD3fAb1QdZzEEn5ZJV7IlIQeUu9H8sdwU`}
                />
              )}
              <p className="place-profile__place-name">
                {data.displayName.text}
              </p>

              <svg
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                onClick={() => handlePlaceOnClick(data)}
                className="place-profile__plus-icon"
              >
                <path
                  d="m14.121 19.337c-.467.453-.942.912-1.424 1.38-.194.189-.446.283-.697.283s-.503-.094-.697-.283c-4.958-4.813-9.303-8.815-9.303-12.54 0-3.348 2.582-5.177 5.234-5.177 1.831 0 3.636.867 4.766 2.563 1.125-1.688 2.935-2.554 4.771-2.554 2.649 0 5.229 1.815 5.229 5.168 0 .681-.144 1.37-.411 2.072-.375-.361-.798-.673-1.258-.925.113-.393.169-.773.169-1.147 0-2.52-1.933-3.668-3.729-3.668-1.969 0-3.204 1.355-4.159 2.694-.141.197-.369.314-.612.314-.243-.001-.471-.119-.611-.317-.953-1.347-2.165-2.699-4.155-2.7-.985 0-1.937.346-2.61.95-.735.658-1.124 1.602-1.124 2.727 0 2.738 3.046 5.842 8.5 11.127.346-.336.682-.663 1.007-.981.327.383.701.724 1.114 1.014zm3.38-9.335c2.58 0 4.499 2.107 4.499 4.499 0 2.58-2.105 4.499-4.499 4.499-2.586 0-4.5-2.112-4.5-4.499 0-2.406 1.934-4.499 4.5-4.499zm.5 3.999v-1.5c0-.265-.235-.5-.5-.5-.266 0-.5.235-.5.5v1.5h-1.5c-.266 0-.5.235-.5.5s.234.5.5.5h1.5v1.5c0 .265.234.5.5.5.265 0 .5-.235.5-.5v-1.5h1.499c.266 0 .5-.235.5-.5s-.234-.5-.5-.5z"
                  fill="white"
                  fillRule="nonzero"
                />
              </svg>
            </li>
          ))}
        </ul>

        <Modal
          title="Add place to trip"
          okText="submit"
          open={open}
          onCancel={handleCancel}
          footer={[]}
          className="modal"
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

          {selectedTrip && (
            <span className="modal__selected-item">
              {selectedTrip.trip_name}
            </span>
          )}
          <Button
            type={"primary"}
            onClick={savePlace}
            className="modal__button"
          >
            Add Place
          </Button>
        </Modal>
      </section>
    </>
  );
};
export default SearchBar;
