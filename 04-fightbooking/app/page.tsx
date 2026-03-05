"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking, MOCK_PASSENGERS } from "@/store/bookingStore";
import StepIndicator from "@/components/StepIndicator";
import FormField from "@/components/FormField";

export default function CheckinPage() {
  const router = useRouter();
  const { dispatch } = useBooking();

  const [lastName, setLastName] = useState("");
  const [bookingRef, setBookingRef] = useState("");

  const isFormValid = lastName.trim().length > 0 && bookingRef.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    // ไม่เช็ค API — กรอกอะไรก็ผ่านเลย
    dispatch({
      type: "SET_BOOKING_AND_PASSENGERS",
      payload: {
        bookingInfo: { lastName: lastName.trim(), bookingRef: bookingRef.trim().toUpperCase() },
        passengers: MOCK_PASSENGERS,
      },
    });

    router.push("/select-pax");
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <StepIndicator current={1} />

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8 mt-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-1">Online Check-in</h1>
        <p className="text-gray-500 text-sm mb-6">
          กรอกข้อมูลการจองเพื่อเริ่มต้นการเช็คอิน
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <FormField
            label="นามสกุล (Last Name)"
            value={lastName}
            onChange={setLastName}
            placeholder="กรอกนามสกุลของท่าน"
          />

          <FormField
            label="หมายเลขการจอง (Booking Reference)"
            value={bookingRef}
            onChange={setBookingRef}
            placeholder="เช่น ABC123"
            maxLength={6}
            uppercase
          />

          {!isFormValid && (
            <p className="text-xs text-amber-500">
              ⚠️ กรุณากรอกข้อมูลให้ครบทั้งนามสกุลและหมายเลขการจอง เพื่อเปิดใช้งานปุ่ม Continue
            </p>
          )}
          {isFormValid && (
            <p className="text-xs text-green-600">
              ✅ ข้อมูลครบถ้วน กด Continue เพื่อดำเนินการต่อ
            </p>
          )}

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition
              ${isFormValid
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed text-gray-400"
              }`}
          >
            <span>Continue</span>
            <span>→</span>
          </button>
        </form>
      </div>
    </div>
  );
}
