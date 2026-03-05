"use client";

import React, { createContext, useContext, useReducer } from "react";
import { BookingInfo, BookingState, Passenger, PassengerInfo } from "@/types/booking";

// ---------- Mock Passengers ----------
export const MOCK_PASSENGERS: Passenger[] = [
  { id: "PAX1", firstName: "Somchai", lastName: "Jaidee",   passport: "AA123456", seat: "12A", selected: false },
  { id: "PAX2", firstName: "Malee",   lastName: "Srisuwan", passport: "BB654321", seat: "12B", selected: false },
  { id: "PAX3", firstName: "Korn",    lastName: "Thongdee", passport: "CC111222", seat: "14C", selected: false },
];

// ---------- State ----------
interface State {
  bookingInfo: BookingInfo;
  passengers: Passenger[];
  selectedPassengerIds: string[];
  passengerInfoMap: Record<string, PassengerInfo>;
  hasDangerousGoods: boolean | null;
}

const initialState: State = {
  bookingInfo: { lastName: "", bookingRef: "" },
  passengers: MOCK_PASSENGERS,
  selectedPassengerIds: [],
  passengerInfoMap: {},
  hasDangerousGoods: null,
};

// ---------- Actions ----------
type Action =
  | { type: "SET_BOOKING_INFO"; payload: BookingInfo }
  | { type: "SET_BOOKING_AND_PASSENGERS"; payload: { bookingInfo: BookingInfo; passengers: Passenger[] } }
  | { type: "TOGGLE_SELECT_PASSENGER"; payload: string }
  | { type: "SELECT_ALL_PASSENGERS" }
  | { type: "CLEAR_ALL_PASSENGERS" }
  | { type: "SET_PASSENGER_INFO"; payload: { id: string; info: PassengerInfo } }
  | { type: "SET_DANGEROUS_GOODS"; payload: boolean }
  | { type: "RESET" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_BOOKING_INFO":
      return { ...state, bookingInfo: action.payload };

    case "SET_BOOKING_AND_PASSENGERS":
      return {
        ...state,
        bookingInfo: action.payload.bookingInfo,
        passengers: action.payload.passengers,
        selectedPassengerIds: [],
        passengerInfoMap: {},
        hasDangerousGoods: null,
      };

    case "TOGGLE_SELECT_PASSENGER": {
      const exists = state.selectedPassengerIds.includes(action.payload);
      return {
        ...state,
        selectedPassengerIds: exists
          ? state.selectedPassengerIds.filter((id) => id !== action.payload)
          : [...state.selectedPassengerIds, action.payload],
      };
    }

    case "SELECT_ALL_PASSENGERS":
      return {
        ...state,
        selectedPassengerIds: state.passengers.map((p) => p.id),
      };

    case "CLEAR_ALL_PASSENGERS":
      return { ...state, selectedPassengerIds: [] };

    case "SET_PASSENGER_INFO":
      return {
        ...state,
        passengerInfoMap: {
          ...state.passengerInfoMap,
          [action.payload.id]: action.payload.info,
        },
      };

    case "SET_DANGEROUS_GOODS":
      return { ...state, hasDangerousGoods: action.payload };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

// ---------- Context ----------
const BookingContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}

