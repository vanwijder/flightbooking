"use client";

import { useRouter } from "next/navigation";
import { useBooking } from "@/store/bookingStore";
import StepIndicator from "@/components/StepIndicator";
import PassengerCard from "@/components/PassengerCard";

export default function SelectPaxPage() {
  const router = useRouter();
  const { state, dispatch } = useBooking();
  const { passengers, selectedPassengerIds } = state;

  const isAllSelected = selectedPassengerIds.length === passengers.length;
  const hasSelected = selectedPassengerIds.length > 0;

  function toggleAll() {
    if (isAllSelected) {
      dispatch({ type: "CLEAR_ALL_PASSENGERS" });
    } else {
      dispatch({ type: "SELECT_ALL_PASSENGERS" });
    }
  }

  function toggleOne(id: string) {
    dispatch({ type: "TOGGLE_SELECT_PASSENGER", payload: id });
  }

  function handleContinue() {
    if (hasSelected) router.push("/pax-info");
  }

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <StepIndicator current={2} />

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8 mt-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-1">Select Passenger</h1>
        <p className="text-gray-500 text-sm mb-6">เลือกผู้โดยสารที่ต้องการเช็คอิน</p>

        {/* Select All / Clear Button */}
        <div className="flex justify-end mb-3">
          <button
            onClick={toggleAll}
            className={`text-sm font-medium px-4 py-1.5 rounded-full border transition
              ${isAllSelected
                ? "border-red-400 text-red-500 hover:bg-red-50"
                : "border-blue-500 text-blue-600 hover:bg-blue-50"
              }`}
          >
            {isAllSelected ? "Clear All" : "Select All"}
          </button>
        </div>

        {/* Passenger List */}
        <div className="flex flex-col gap-3 mb-4">
          {passengers.map((pax) => (
            <PassengerCard
              key={pax.id}
              pax={pax}
              isSelected={selectedPassengerIds.includes(pax.id)}
              onClick={() => toggleOne(pax.id)}
            />
          ))}
        </div>

        {/* Selected count */}
        <p className="text-sm text-gray-500 mb-4">
          เลือกแล้ว{" "}
          <span className="font-bold text-blue-600">{selectedPassengerIds.length}</span>
          /{passengers.length} คน
        </p>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!hasSelected}
          className={`w-full py-3 rounded-lg font-semibold text-white transition
            ${hasSelected
              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed text-gray-400"
            }`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

