import { Link } from "react-router-dom";
import "./PopularDestinations.scss";

import { useEffect, useState } from "react";
import PopularPlaceCard from "../PopularPlaceCard/PopularPlaceCard";
const PopularDestinations = () => {
  const popularPlaces = [
    {
      name: "Kerala",
      count: 40000,
    },
    {
      name: "Paris",
      count: 35000,
    },
    {
      name: "Italy",
      count: 23000,
    },
    {
      name: "Rome",
      count: 19000,
    },
    {
      name: "Japan",
      count: 15000,
    },
    {
      name: "Barcelona",
      count: 10000,
    },
    {
      name: "London",
      count: 9800,
    },
  ];

  return (
    <section className="popular-places">
      <h2 className="popular-places__title">
        Explore Popular Travel Destinations
      </h2>
      <ul className="popular-places__list">
        {popularPlaces.map((place, i) => (
          <li key={i} className="popular-places__list-item">
            <Link
              to={`/places/${place.name}`}
              className="popular-places__list-item"
            >
              <PopularPlaceCard place={place.name} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default PopularDestinations;
