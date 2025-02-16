import { Input } from "antd";
import { useRef } from "react";

import { Button } from "antd";
import axios from "axios";
// import axios from "axios";

const PlanTrip = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const formRef = useRef<HTMLFormElement>(null);
  //   const tripDatavalidation = (data:object) => {
  //     let errors={};
  //     Object.entries(data).forEach(([key,value])=>{
  //       if(!value.trim()){
  //         errors[key]="This field is required"
  //       }
  // return Object.keys(errors).length ===0;
  //     })
  //   };
  const handleOnFormSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const form = formRef.current;
    const tripData = {
      trip_name: form?.tripName.value,
      place_name: form?.placeName.value,
      from_date: form?.fromDate.value,
      to_date: form?.toDate.value,
      no_of_travellers: form?.noOfTravellers.value,
    };
    console.log(tripData);
    try {
      const postTrip = await axios.post(`${API_URL}/trips/addTrip`, tripData);
      form?.reset();
    } catch (e) {
      console.error(`Cannot add new trip data :error: ${e}`);
    }
  };

  return (
    <form ref={formRef}>
      <label>
        Trip Name:
        <Input
          type="text"
          placeholder="Enter trip name"
          size="large"
          name="tripName"
        />
      </label>
      <label>
        Place Name:
        <Input
          type="text"
          placeholder="Enter place name"
          size="large"
          name="placeName"
        />
      </label>
      <label>
        From Date:
        <Input type="date" size="large" name="fromDate" />
      </label>
      <label>
        To Date:
        <Input type="date" size="large" name="toDate" />
      </label>
      <label>
        No Of Travellers:
        <Input
          type="number"
          placeholder="Enter no. of travellers"
          size="large"
          name="noOfTravellers"
        />
      </label>
      <Button onClick={handleOnFormSubmit}>Save Trip</Button>
    </form>
  );
};
export default PlanTrip;
