export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  passport: string;
  seat: string;
  selected: boolean;
}

export interface BookingInfo {
  lastName: string;
  bookingRef: string;
}

export interface PassengerInfo {
  passengerId: string;
  contact: string;
  mealPreference: string;
}

export interface FlightInfo {
  from: string;
  fromName: string;
  to: string;
  toName: string;
  flightNo: string;
  date: string;
  boardingTime: string;
  gate: string;
}

export interface ApiBookingResponse {
  bookingRef: string;
  lastName: string;
  passengers: Passenger[];
  flight: FlightInfo;
}

export interface BookingState {
  bookingInfo: BookingInfo;
  passengers: Passenger[];
  selectedPassengerIds: string[];
  passengerInfoMap: Record<string, PassengerInfo>;
  hasDangerousGoods: boolean | null;

  setBookingInfo: (info: BookingInfo) => void;
  setPassengers: (passengers: Passenger[]) => void;
  toggleSelectPassenger: (id: string) => void;
  selectAllPassengers: () => void;
  clearAllPassengers: () => void;
  setPassengerInfo: (id: string, info: PassengerInfo) => void;
  setHasDangerousGoods: (value: boolean) => void;
  reset: () => void;
}
