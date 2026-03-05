"use client";

import { useRouter } from "next/navigation";
import { useBooking } from "@/store/bookingStore";
import StepIndicator from "@/components/StepIndicator";
import InfoCell from "@/components/InfoCell";

export default function BoardingPassPage() {
  const router = useRouter();
  const { state, dispatch } = useBooking();
  const { passengers, selectedPassengerIds, bookingInfo, passengerInfoMap } = state;

  const selectedPax = passengers.filter((p) => selectedPassengerIds.includes(p.id));

  function handleReset() {
    dispatch({ type: "RESET" });
    router.push("/");
  }

  if (selectedPax.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <p className="text-gray-500 mb-4">ไม่พบข้อมูลการเช็คอิน</p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          กลับหน้าแรก
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <StepIndicator current={5} />

      {/* Success Banner */}
      <div className="flex items-center gap-3 bg-green-50 border border-green-400 rounded-2xl px-6 py-4 mt-6 w-full max-w-2xl">
        <span className="text-4xl">🎉</span>
        <div>
          <p className="text-xl font-bold text-green-700">Check-in สำเร็จ!</p>
          <p className="text-sm text-green-600">
            Boarding Reference: <span className="font-bold">{bookingInfo.bookingRef || "N/A"}</span>
          </p>
        </div>
      </div>

      {/* Boarding Pass Cards */}
      <div className="flex flex-col gap-6 w-full max-w-2xl mt-6">
        {selectedPax.map((pax) => {
          const info = passengerInfoMap[pax.id];
          return (
            <div
              key={pax.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              {/* Header Stripe */}
              <div className="bg-blue-700 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">✈️</span>
                  <div>
                    <p className="text-xs text-blue-200 uppercase tracking-wider">FightBooking Airlines</p>
                    <p className="text-lg font-bold">Boarding Pass</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-blue-200">Booking Ref</p>
                  <p className="text-xl font-mono font-bold tracking-widest">
                    {bookingInfo.bookingRef || "------"}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5 flex flex-col gap-4">
                {/* Passenger Name */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 font-bold text-xl flex items-center justify-center">
                    {pax.firstName[0]}{pax.lastName[0]}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Passenger Name</p>
                    <p className="text-xl font-bold text-gray-800">
                      {pax.firstName.toUpperCase()} {pax.lastName.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">Passport: {pax.passport}</p>
                  </div>
                </div>

                {/* Flight Info Grid */}
                <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-xl p-4">
                  <InfoCell label="From" value="BKK" sub="Bangkok" />
                  <InfoCell label="To" value="NRT" sub="Tokyo" />
                  <InfoCell label="Flight" value="FB 7707" sub="4 Mar 2026" />
                  <InfoCell label="Seat" value={pax.seat} sub="Economy" highlight />
                  <InfoCell label="Gate" value="C14" sub="Closes 14:30" />
                  <InfoCell label="Boarding" value="14:00" sub="On Time" />
                </div>

                {/* Extra Info */}
                {info && (
                  <div className="flex gap-4 text-sm text-gray-600 bg-blue-50 rounded-xl p-3">
                    <span>📞 {info.contact}</span>
                    <span>🍱 {mealLabel(info.mealPreference)}</span>
                  </div>
                )}

                {/* Barcode Mockup */}
                <div className="flex flex-col items-center py-3 border-t border-dashed border-gray-200 mt-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 60 }).map((_, i) => (
                      <div
                        key={i}
                        style={{ height: i % 5 === 0 ? 40 : 28 }}
                        className={`w-1 rounded-sm ${i % 3 === 0 ? "bg-gray-800" : "bg-gray-200"}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1 font-mono tracking-widest">
                    {bookingInfo.bookingRef}-{pax.id}
                  </p>
                </div>
              </div>

              {/* Print button per pass */}
              <div className="px-6 pb-5">
                <button
                  onClick={() => window.print()}
                  className="w-full border-2 border-blue-600 text-blue-600 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition"
                >
                  🖨️ Print Boarding Pass
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Check-in Button */}
      <button
        onClick={handleReset}
        className="mt-8 bg-gray-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
      >
        ← เริ่มการเช็คอินใหม่
      </button>
    </div>
  );
}

function mealLabel(val: string) {
  const map: Record<string, string> = {
    standard: "Standard Meal",
    vegetarian: "Vegetarian",
    halal: "Halal",
    kosher: "Kosher",
    none: "No Meal",
  };
  return map[val] ?? val;
}

