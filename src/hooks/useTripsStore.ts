import { create } from "zustand";
import axios from "axios";
import { ActiveSessionResource } from "@clerk/types";

const API_URL = import.meta.env.VITE_API_URL;

interface TripData {
  trip_name: string;
  place_name: string;
  from_date: Date;
  to_date: Date;
  no_of_travellers: number;
  trip_id: number;
}

interface TripState {
  trips: TripData[];
  fetchAllTrips: (session: ActiveSessionResource | null | undefined) => void;
}

const useTripsStore = create<TripState>((set) => ({
  trips: [],
  fetchAllTrips: async (session) => {
    const allTrips = await fetchAllTrips(session);
    if (allTrips === undefined) return;
    set({ trips: allTrips });
  },
}));

const fetchAllTrips = async (
  session: ActiveSessionResource | null | undefined
) => {
  const token = await session?.getToken();
  if (!token) {
    return;
  }
  try {
    const { data } = await axios.get<TripData[]>(`${API_URL}/trips`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (e) {
    console.error(`Error getting trips : ${e}`);
  }
};

export { useTripsStore };
