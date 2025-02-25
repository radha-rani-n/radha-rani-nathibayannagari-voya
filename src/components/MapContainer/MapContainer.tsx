import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapContainer.scss";
const MapComponent = ({ tripData }: { tripData: any }) => {
  const searchCenter: [number, number] = [
    +tripData.places[0].latitude,
    +tripData.places[0].longitude,
  ];
  const markers: [number, number][] = tripData.places.map((place) => [
    +place.latitude,
    +place.longitude,
  ]);

  const bounds = Leaflet.latLngBounds(markers);
  return (
    <MapContainer
      style={{ height: "100%", minHeight: "100%" }}
      center={searchCenter}
      scrollWheelZoom={false}
      bounds={bounds}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {tripData.places.map((place, i) => (
        <MarkerComponent
          lat={+place.latitude}
          long={+place.longitude}
          photoReference={place.photo_reference}
          key={i}
        />
      ))}
    </MapContainer>
  );
};

const MarkerComponent = ({
  lat,
  long,
  photoReference,
}: {
  lat: number;
  long: number;
  photoReference: string;
}) => {
  return (
    <Marker position={[lat, long]}>
      <Popup>
        <img
          className="map-pop-up"
          src={`https://places.googleapis.com/v1/${photoReference}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyDD3fAb1QdZzEEn5ZJV7IlIQeUu9H8sdwU`}
          alt="place-image"
        />
      </Popup>
    </Marker>
  );
};

export default MapComponent;
