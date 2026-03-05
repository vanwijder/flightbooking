"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/store/bookingStore";
import StepIndicator from "@/components/StepIndicator";

export default function PaxInfoPage() {
  const router = useRouter();
  const { state, dispatch } = useBooking();
  const { passengers, selectedPassengerIds } = state;

  const selectedPax = passengers.filter((p) => selectedPassengerIds.includes(p.id));

  // เก็บ contact ของผู้โดยสารแต่ละคน
  const [contacts, setContacts] = useState<Record<string, string>>(
    Object.fromEntries(selectedPax.map((p) => [p.id, ""]))
  );
  const [meals, setMeals] = useState<Record<string, string>>(
    Object.fromEntries(selectedPax.map((p) => [p.id, "standard"]))
  );

  const isAllFilled = selectedPax.every((p) => contacts[p.id]?.trim().length > 0);

  function handleContinue() {
    if (!isAllFilled) return;
    selectedPax.forEach((p) => {
      dispatch({
        type: "SET_PASSENGER_INFO",
        payload: {
          id: p.id,
          info: { passengerId: p.id, contact: contacts[p.id], mealPreference: meals[p.id] },
        },
      });
    });
    router.push("/dangerous-goods");
  }

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <StepIndicator current={3} />

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8 mt-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-1">Passenger Info</h1>
        <p className="text-gray-500 text-sm mb-6">กรอกข้อมูลเพิ่มเติมของผู้โดยสาร</p>

        <div className="flex flex-col gap-6">
          {selectedPax.map((pax) => (
            <div key={pax.id} className="border border-gray-200 rounded-xl p-5 bg-gray-50">
              {/* Pax Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  {pax.firstName[0]}{pax.lastName[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{pax.firstName} {pax.lastName}</p>
                  <p className="text-xs text-gray-500">Seat: <span className="text-blue-600 font-medium">{pax.seat}</span> · Passport: {pax.passport}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เบอร์โทรติดต่อ / Email
                </label>
                <input
                  type="text"
                  value={contacts[pax.id] || ""}
                  onChange={(e) => setContacts((prev) => ({ ...prev, [pax.id]: e.target.value }))}
                  placeholder="เช่น 0812345678 หรือ email@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Meal Preference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meal Preference
                </label>
                <select
                  value={meals[pax.id] || "standard"}
                  onChange={(e) => setMeals((prev) => ({ ...prev, [pax.id]: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="standard">🍱 Standard Meal</option>
                  <option value="vegetarian">🥗 Vegetarian</option>
                  <option value="halal">🥙 Halal</option>
                  <option value="kosher">✡️ Kosher</option>
                  <option value="none">🚫 No Meal</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Validation hint */}
        {!isAllFilled && (
          <p className="text-xs text-amber-500 mt-4">⚠️ กรุณากรอกข้อมูลติดต่อให้ครบทุกคน</p>
        )}

        <button
          onClick={handleContinue}
          disabled={!isAllFilled}
          className={`w-full mt-5 py-3 rounded-lg font-semibold text-white transition
            ${isAllFilled
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

