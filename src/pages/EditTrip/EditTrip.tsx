import { Input, Form, DatePicker, notification } from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "antd";
import { useCallback, useEffect, useState } from "react";
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

type TripDeatils = {
  trip: {
    trip_name: string;
    place_name: string;
    from_date: string;
    to_date: string;
    no_of_travellers: number;
  };
};

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

  const [tripDeatils, setTripDetails] = useState<TripDeatils | null>(null);

  const updateTripDetails = useCallback(
    async (id: string) => {
      const token = await session?.getToken();
      if (!token) {
        return;
      }
      const { data } = await axios.get<TripDeatils>(`${API_URL}/trips/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTripDetails(data);
    },
    [API_URL, session]
  );

  useEffect(() => {
    updateTripDetails(id);
  }, [id, updateTripDetails]);

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

    try {
      await axios.put(`${API_URL}/trips/${id}`, tripData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      updateTripDetails(id);
      reset();
      openNotification("Trip Updated Successfully!", "info");
      onSubmit();
    } catch (e) {
      console.error(`Cannot add new trip data :error: ${e}`);
      openNotification("There was an error!", "error");
      onSubmit();
    }
  };

  if (tripDeatils) {
    setValue("tripName", tripDeatils.trip["trip_name"]);
    setValue("placeName", tripDeatils.trip["place_name"]);
    setValue("fromDate", dayjs(tripDeatils.trip["from_date"]));
    setValue("toDate", dayjs(tripDeatils.trip["to_date"]));
    setValue("noOfTravellers", tripDeatils.trip["no_of_travellers"]);
  }

  return (
    <div className="edit-trip">
      {contextHolder}
      <Form
        onFinish={handleSubmit(handleOnFormSubmit)}
        className="edit-trip-form"
      >
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
    </div>
  );
};
export default EditTrip;
