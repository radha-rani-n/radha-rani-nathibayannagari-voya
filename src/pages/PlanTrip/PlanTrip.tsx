import { Input, Form, DatePicker, notification } from "antd";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "antd";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
  fromDate: z.coerce.date({
    required_error: "FromDate is required",
  }),
  toDate: z.coerce.date({
    required_error: "To date is required!",
  }),
  noOfTravellers: z.coerce
    .number({
      required_error: "Number of travellers cannot be empty!",
    })
    .nonnegative(),
});
type PlanTripSchemaType = z.infer<typeof PlanTripSchema>;
const PlanTrip = ({
  handleOk,
  handleCancel,
}: {
  handleOk: () => void;
  handleCancel: () => void;
}) => {
  const { session } = useSession();

  const API_URL = import.meta.env.VITE_API_URL;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PlanTripSchemaType>({ resolver: zodResolver(PlanTripSchema) });

  const [api, contextHolder] = notification.useNotification();

  type NotificationType = "success" | "info" | "warning" | "error";

  const openNotification = (message: string, type: NotificationType) => {
    api[type]({
      message: "Trip Plan Update",
      description: message,
      duration: 4,
    });
  };

  const handleOnFormSubmit: SubmitHandler<PlanTripSchemaType> = async (
    data
  ) => {
    const token = await session?.getToken();
    if (!token) {
      return;
    }

    const tripData = {
      trip_name: data.tripName,
      place_name: data.placeName,
      from_date: data.fromDate.toISOString().substring(0, 10),
      to_date: data.toDate.toISOString().substring(0, 10),
      no_of_travellers: data.noOfTravellers,
    };

    console.log(tripData);

    try {
      await axios.post(`${API_URL}/trips/addTrip`, tripData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      reset();
      openNotification("Trip Added Successfully!", "info");
      handleOk();
    } catch (e) {
      console.error(`Cannot add new trip data :error: ${e}`);
      openNotification("There was an error!", "error");
    }
  };

  return (
    <>
      {contextHolder}
      <Form onFinish={handleSubmit(handleOnFormSubmit)}>
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
            Submit
          </Button>
        </Form.Item>
        <Form.Item label={null}>
          <Button type="default" onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default PlanTrip;
