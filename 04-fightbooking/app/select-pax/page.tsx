"use client";

import { useRouter } from "next/navigation";
import { useBooking } from "@/store/bookingStore";
import StepIndicator from "@/components/StepIndicator";

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
        <p className="text-gray-500 text-sm mb-6">
          เลือกผู้โดยสารที่ต้องการเช็คอิน
        </p>

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
        <div className="flex flex-col gap-3 mb-6">
          {passengers.map((pax) => {
            const isSelected = selectedPassengerIds.includes(pax.id);
            return (
              <div
                key={pax.id}
                onClick={() => toggleOne(pax.id)}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition
                  ${isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                  }`}
              >
                {/* Checkbox */}
                <div
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0
                    ${isSelected ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}
                >
                  {isSelected && <span className="text-white text-xs font-bold">✓</span>}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                  {pax.firstName[0]}{pax.lastName[0]}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {pax.firstName} {pax.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Passport: {pax.passport} · Seat: <span className="font-medium text-blue-600">{pax.seat}</span>
                  </p>
                </div>

                {/* Selected Badge */}
                {isSelected && (
                  <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                    Selected
                  </span>
                )}
              </div>
            );
          })}
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

