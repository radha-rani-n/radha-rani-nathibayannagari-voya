import { Input } from "antd";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "antd";
const PlanTrip = () => {
  const handleOnFormSubmit = () => {};
  return (
    <form onSubmit={handleOnFormSubmit}>
      <label>
        Trip Name:
        <Input type="text" placeholder="Enter trip name" size="large" />
      </label>
      <label>
        Place Name:
        <Input type="text" placeholder="Enter place name" size="large" />
      </label>
      <label>
        From Date:
        <Input type="date" size="large" />
      </label>
      <label>
        To Date:
        <Input type="date" size="large" />
      </label>
      <label>
        No Of Travellers:
        <Input
          type="number"
          placeholder="Enter no. of travellers"
          size="large"
        />
      </label>
      <Button>Save Trip</Button>
    </form>
  );
};
export default PlanTrip;
