"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/store/bookingStore";

export default function CheckinPage() {
  const router = useRouter();
  const { dispatch } = useBooking();

  const [lastName, setLastName] = useState("");
  const [bookingRef, setBookingRef] = useState("");

  const isFormValid = lastName.trim().length > 0 && bookingRef.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;
    dispatch({ type: "SET_BOOKING_INFO", payload: { lastName, bookingRef } });
    router.push("/select-pax");
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Step Indicator */}
      <StepIndicator current={1} />

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8 mt-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-1">Online Check-in</h1>
        <p className="text-gray-500 text-sm mb-6">
          กรอกข้อมูลเพื่อเริ่มต้นการเช็คอิน
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              นามสกุล (Last Name)
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="กรอกนามสกุลของท่าน"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Booking Reference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              หมายเลขการจอง (Booking Reference)
            </label>
            <input
              type="text"
              value={bookingRef}
              onChange={(e) => setBookingRef(e.target.value.toUpperCase())}
              placeholder="เช่น ABC123"
              maxLength={6}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Status Message */}
          {!isFormValid && (
            <p className="text-xs text-amber-500">
              ⚠️ กรุณากรอกข้อมูลให้ครบทุกช่อง เพื่อเปิดใช้งานปุ่ม Continue
            </p>
          )}
          {isFormValid && (
            <p className="text-xs text-green-600">
              ✅ ข้อมูลครบถ้วน พร้อมดำเนินการ
            </p>
          )}

          {/* Continue Button — Disabled จนกว่าจะกรอกครบ */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded-lg font-semibold text-white transition
              ${isFormValid
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed text-gray-400"
              }`}
          >
            Continue →
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------- Step Indicator Component ----------
function StepIndicator({ current }: { current: number }) {
  const steps = [
    { num: 1, label: "Check-in" },
    { num: 2, label: "Select Pax" },
    { num: 3, label: "Pax Info" },
    { num: 4, label: "Dangerous\nGoods" },
    { num: 5, label: "Boarding Pass" },
  ];

  return (
    <div className="flex items-center gap-0 w-full max-w-2xl">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition
                ${step.num < current ? "bg-blue-600 border-blue-600 text-white" : ""}
                ${step.num === current ? "bg-blue-600 border-blue-600 text-white ring-4 ring-blue-200" : ""}
                ${step.num > current ? "bg-white border-gray-300 text-gray-400" : ""}
              `}
            >
              {step.num < current ? "✓" : step.num}
            </div>
            <span
              className={`text-xs mt-1 text-center leading-tight whitespace-pre-line
                ${step.num === current ? "text-blue-700 font-semibold" : "text-gray-400"}`}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-0.5 flex-1 mx-1 mb-5 ${step.num < current ? "bg-blue-600" : "bg-gray-300"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

