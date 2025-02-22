import { Input, Form, DatePicker, notification } from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "antd";
import { useEffect } from "react";
import "./EditTrip.scss";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs, { type Dayjs } from "dayjs";
import { useSession } from "@clerk/clerk-react";

const dateFormat = "YYYY-MM-DD";

const PlanTripSchema = z.object({
  tripName: z.string({
    required_error: "TripName is reqired",
  }),
  placeName: z
    .string({
      required_error: "PlaceName is required",
    })
    .regex(new RegExp("[a-zA-Z]+"), "Place name is not of format [a-zA-Z]+"),
  fromDate: z.custom<Dayjs>((val) => val instanceof dayjs, "Invalid date"),
  toDate: z.custom<Dayjs>((val) => val instanceof dayjs, "Invalid date"),
  noOfTravellers: z.coerce
    .number({
      required_error: "Number of travellers cannot be empty!",
    })
    .nonnegative(),
});
type PlanTripSchemaType = z.infer<typeof PlanTripSchema>;
const EditTrip = ({
  id,
  openNotification,
  contextHolder,
  onSubmit,
}: {
  id: string;
  openNotification: (message: string, type: any) => void;
  contextHolder: any;
  onSubmit: () => void;
}) => {
  const { session } = useSession();
  const API_URL = import.meta.env.VITE_API_URL;

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PlanTripSchemaType>({
    resolver: zodResolver(PlanTripSchema),
  });
  useEffect(() => {
    session?.getToken().then((token) => {
      axios
        .get(`${API_URL}/trips/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          setValue("tripName", data.trip["trip_name"]);
          setValue("placeName", data.trip["place_name"]);
          setValue("fromDate", dayjs(data.trip["from_date"]));
          setValue("toDate", dayjs(data.trip["to_date"]));
          setValue("noOfTravellers", data.trip["no_of_travellers"]);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, [id, API_URL, session, setValue]);

  const handleOnFormSubmit: SubmitHandler<PlanTripSchemaType> = async (
    data
  ) => {
    const token = await session?.getToken();
    const tripData = {
      trip_name: data.tripName,
      place_name: data.placeName,
      from_date: data.fromDate.toISOString().substring(0, 10),
      to_date: data.toDate.toISOString().substring(0, 10),
      no_of_travellers: data.noOfTravellers,
    };

    console.log(tripData);
    try {
      await axios.put(`${API_URL}/trips/${id}`, tripData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      reset();
      openNotification("Trip Updated Successfully!", "info");
      onSubmit();
    } catch (e) {
      console.error(`Cannot add new trip data :error: ${e}`);
      openNotification("There was an error!", "error");
      onSubmit();
    }
  };

  return (
    <>
      {contextHolder}
      <Form onFinish={handleSubmit(handleOnFormSubmit)} className="edit-trip">
        <Form.Item label="Trip Name:">
          <Controller
            name="tripName"
            control={control}
            render={({ field }) => <Input {...field}></Input>}
          />
        </Form.Item>
        {errors.tripName && (
          <span
            style={{
              color: "red",
            }}
          >
            {errors.tripName.message}
          </span>
        )}
        <Form.Item label="Place Name:">
          <Controller
            name="placeName"
            control={control}
            render={({ field }) => <Input {...field}></Input>}
          />
        </Form.Item>
        {errors.placeName && (
          <span
            style={{
              color: "red",
            }}
          >
            {errors.placeName.message}
          </span>
        )}
        <Form.Item label="From Date:">
          <Controller
            name="fromDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                onChange={(date) => field.onChange(date)}
                format={dateFormat}
              ></DatePicker>
            )}
          />
        </Form.Item>
        {errors.fromDate && (
          <span
            style={{
              color: "red",
            }}
          >
            {errors.fromDate.message}
          </span>
        )}
        <Form.Item label="To Date:">
          <Controller
            name="toDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                onChange={(date) => field.onChange(date)}
              ></DatePicker>
            )}
          />
        </Form.Item>
        {errors.toDate && (
          <span
            style={{
              color: "red",
            }}
          >
            {errors.toDate.message}
          </span>
        )}
        <Form.Item label="No of Travellers:">
          <Controller
            name="noOfTravellers"
            control={control}
            render={({ field }) => <Input {...field}></Input>}
          />
        </Form.Item>
        {errors.noOfTravellers && (
          <span
            style={{
              color: "red",
            }}
          >
            {errors.noOfTravellers.message}
          </span>
        )}

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Save Trip
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default EditTrip;
