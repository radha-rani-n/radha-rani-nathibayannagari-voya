import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapContainer.scss";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

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
          unsplash_image_url={place.unsplash_image_url}
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
  unsplash_image_url,
}: {
  lat: number;
  long: number;
  photoReference: string;
  unsplash_image_url: string;
}) => {
  return (
    <Marker position={[lat, long]}>
      <Popup>
        <img
          className="map-pop-up"
          src={unsplash_image_url}
          // src={`https://places.googleapis.com/v1/${photoReference}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyDD3fAb1QdZzEEn5ZJV7IlIQeUu9H8sdwU`}
          alt="place-image"
        />
      </Popup>
    </Marker>
  );
};

export default MapComponent;
