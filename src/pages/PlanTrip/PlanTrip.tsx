import { Input } from "antd";

import { Button } from "antd";
import { useState } from "react";
const PlanTrip = () => {
  const [tripName, setTripName] = useState(null);
  const [placeName, setPlaceName] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [travellerCount, setTravellerCount] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleOnFormSubmit = () => {};

  const handleTripName = () => {};
  const handlePlaceName = () => {};

  const handleFromDate = () => {};

  const handleToDate = () => {};
  const handleTravellers = () => {};
  return (
    <form onSubmit={handleOnFormSubmit}>
      <label>
        Trip Name:
        <Input
          type="text"
          placeholder="Enter trip name"
          size="large"
          onChange={handleTripName}
        />
      </label>
      <label>
        Place Name:
        <Input
          type="text"
          placeholder="Enter place name"
          size="large"
          onChange={handlePlaceName}
        />
      </label>
      <label>
        From Date:
        <Input type="date" size="large" onChange={handleFromDate} />
      </label>
      <label>
        To Date:
        <Input type="date" size="large" onChange={handleToDate} />
      </label>
      <label>
        No Of Travellers:
        <Input
          type="number"
          placeholder="Enter no. of travellers"
          size="large"
          onChange={handleTravellers}
        />
      </label>
      <Button>Save Trip</Button>
    </form>
  );
};
export default PlanTrip;
