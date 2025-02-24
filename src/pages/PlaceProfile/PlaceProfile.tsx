import { useLocation } from "react-router-dom";
import "./PlaceProfile.scss";
import axios from "axios";
import { ArrowLeft, CirclePlus } from "lucide-react";
import { DownOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space, notification, Tooltip } from "antd";
import { useSession } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import CustomTag from "../../components/CustomTag/CustomTag";
import { CustomModal } from "../../components/CustomModal/CustomModal";
import { useCustomModal } from "../../hooks/useCustomModal";
import { PresetColorType } from "antd/es/_util/colors";
import { sample, uniqBy } from "lodash";

type PlaceType = {
  id: string;
  types: string[];
  formattedAddress: string;
  location: {
    latitude: string;
    longitude: string;
  };
  displayName: { text: string };
  photos: { name: string; authorAttributions: { photoUri: string } }[];
};

type TripType = {
  trip_id: number;
  trip_name: string;
};

const SearchBar = () => {
  const { pathname } = useLocation();

  const { session } = useSession();

  const API_URL = import.meta.env.VITE_API_URL;
  const UNSPLASH_API = import.meta.env.VITE_UNSPLASH_API_KEY;
  const [searchData, setSearchData] = useState<PlaceType[] | null>(null);
  const { open, handleCancel, handleOk, confirmLoading, setOpen } =
    useCustomModal();

  const [allTrips, setAllTrips] = useState<TripType[]>([]);
  const [placeImage, setPlaceImgae] = useState<string | null>(null);
  const [placeSummary, setPlaceSummary] = useState<string | null>(null);
  const [selectedTrips, setSelectedTrips] = useState<
    | {
        trip_name: string;
        trip_id: string;
        color: PresetColorType;
      }[]
    | null
  >([]);

  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null);
  const [api, contextHolder] = notification.useNotification();
  const [weather, setWeather] = useState(null);
  const splitPath = pathname.split("/");
  const searchText = splitPath[splitPath.length - 1];

  type NotificationType = "success" | "info" | "warning" | "error";

  const tagColors: PresetColorType[] = ["magenta", "volcano", "green", "red"];

  const openNotification = (message: string, type: NotificationType) => {
    api[type]({
      message: "Trip Plan Update",
      description: message,
      duration: 4,
    });
  };
  const onClick: MenuProps["onClick"] = ({ key }) => {
    const tripInfo = allTrips?.find((item) => item && item.trip_id === +key);
    if (tripInfo) {
      const newSelectedTrips = [
        ...(selectedTrips ?? []),
        {
          trip_name: tripInfo.trip_name,
          trip_id: `${tripInfo.trip_id}`,
          color: sample(tagColors) ?? "red",
        },
      ];

      setSelectedTrips(uniqBy(newSelectedTrips, "trip_id"));
    }
  };

  const getPlaceImage = async () => {
    try {
      const { data } = await axios.get(`https:api.unsplash.com/search/photos`, {
        params: {
          query: searchText,
          orientation: "landscape",
          client_id: UNSPLASH_API,
        },
      });
      setPlaceImgae(data.results[0].urls.regular);
    } catch (err) {
      console.error(err);
    }
  };

  const getPlaceSummary = async () => {
    const token = await session?.getToken();
    if (!token) return;
    try {
      const response = await axios.get(`${API_URL}/ai/getPlaceSummary`, {
        params: {
          placeName: searchText,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaceSummary(response.data.summary);
    } catch (err) {
      console.error(err);
    }
  };
  const getWeather = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/place/weather?q=${searchText}`
      );
      setWeather(data);
    } catch (err) {
      console.error(err);
    }
  };
  const savePlace = async () => {
    const token = await session?.getToken();
    if (!selectedPlace) return;
    const { id, displayName, photos, location } = selectedPlace;
    const photo_reference = photos && photos.length > 0 && photos[0].name;

    const data = {
      place_id: id,
      place_name: displayName.text,
      photo_reference: photo_reference,
      latitude: location.latitude,
      longitude: location.longitude,
      trip_ids: selectedTrips?.map((trip) => trip.trip_id),
    };
    try {
      await axios.post(`${API_URL}/places/updateTrips`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedTrips(null);
      setSelectedPlace(null);
      openNotification("Place added to trip Successfully!", "info");
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const updatePlaces = useCallback(async () => {
    const token = await session?.getToken();
    if (!token) {
      return;
    }
    axios
      .get(`${API_URL}/places/search`, {
        params: { q: decodeURIComponent(searchText) },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSearchData(response.data.places);
      });
  }, [session]);

  const updateTrips = useCallback(async () => {
    const token = await session?.getToken();
    if (!token) {
      return;
    }
    axios
      .get(`${API_URL}/trips`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAllTrips(response.data);
      });
  }, [session]);

  const refreshItems = useCallback(async () => {
    const token = await session?.getToken();
    if (!token) {
      return;
    }
    axios
      .get(`${API_URL}/trips`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAllTrips(response.data);
      });
  }, [session]);

  useEffect(() => {
    getPlaceImage();
    getPlaceSummary();
    getWeather();
    updatePlaces();
    updateTrips();
  }, [pathname, updatePlaces, updateTrips]);

  const handlePlaceOnClick = (placeData: PlaceType) => {
    setSelectedPlace(placeData);
    setOpen(true);
  };
  if (!searchData) {
    return <p>Loading...</p>;
  }

  const dropDownItems: MenuProps["items"] = allTrips.map((item) => {
    return {
      label: <span>{item.trip_name}</span>,
      key: item.trip_id,
    };
  });

  return (
    <>
      {contextHolder}

      <section className="place-profile">
        <Link to="/">
          <Button className="place-profile__back-btn">
            <ArrowLeft className="place-profile__back-arrow" />
          </Button>
        </Link>
        <div className="place-profile__title-image">
          {placeImage && (
            <img
              src={placeImage}
              alt="place-image"
              className="place-profile__image"
            />
          )}
          {placeSummary && (
            <span className="place-profile__summary">{placeSummary}</span>
          )}
          <h2 className="place-profile__title">
            {decodeURIComponent(searchText)}
          </h2>
          <p className="place-profile__weather">{weather}&deg;C</p>
        </div>

        <h2>Popular attraction in {decodeURIComponent(searchText)}</h2>
        <ul className="place-profile__places">
          {searchData.map((data, i: number) => (
            <li key={i} className="place-profile__place">
              {data.photos && data.photos.length > 0 && (
                <img
                  className="place-profile__place-img"
                  alt="place-image"
                  src={`https://places.googleapis.com/v1/${data.photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyDD3fAb1QdZzEEn5ZJV7IlIQeUu9H8sdwU`}
                />
              )}
              <p className="place-profile__place-name">
                {data.displayName.text}
              </p>
              <Tooltip title="Add place to a trip">
                <CirclePlus
                  onClick={() => handlePlaceOnClick(data)}
                  className="place-profile__plus-icon"
                />
              </Tooltip>
            </li>
          ))}
        </ul>
        <CustomModal
          open={open}
          handleCancel={() => {
            setSelectedPlace(null);
            setSelectedTrips(null);
            handleCancel();
          }}
          handleOk={handleOk}
          confirmLoading={confirmLoading}
          title="Add place to your trips"
        >
          <div className="place-profile__modal-form">
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
            <Button
              type={"primary"}
              onClick={savePlace}
              className="place-profile__modal__button"
            >
              Add Place
            </Button>
          </div>
          {selectedTrips && (
            <>
              {selectedTrips.map((trip) => (
                <CustomTag
                  key={trip.trip_id}
                  tagName={trip.trip_name}
                  color={trip.color}
                  onClose={() => {
                    const newTrips = selectedTrips.filter(
                      (t) => t.trip_id !== trip.trip_id
                    );
                    setSelectedTrips(newTrips);
                  }}
                />
              ))}
            </>
          )}
        </CustomModal>
      </section>
    </>
  );
};
export default SearchBar;
