"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/store/bookingStore";
import StepIndicator from "@/components/StepIndicator";

const DANGEROUS_ITEMS = [
  { icon: "🔋", label: "แบตเตอรี่ลิเธียม (Lithium Batteries)" },
  { icon: "🔥", label: "วัตถุไวไฟ (Flammable Liquids/Gases)" },
  { icon: "💣", label: "วัตถุระเบิด (Explosives)" },
  { icon: "☢️", label: "สารกัมมันตรังสี (Radioactive Materials)" },
  { icon: "🧪", label: "สารกัดกร่อน (Corrosive Substances)" },
  { icon: "🔫", label: "อาวุธ / มีด (Weapons / Sharp Objects)" },
];

export default function DangerousGoodsPage() {
  const router = useRouter();
  const { dispatch } = useBooking();
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);

  function handleContinue() {
    if (answer === null) return;
    if (answer === "yes") {
      dispatch({ type: "SET_DANGEROUS_GOODS", payload: true });
      alert("⛔ ไม่สามารถดำเนินการต่อได้\nกรุณาติดต่อเจ้าหน้าที่สายการบิน");
      return;
    }
    dispatch({ type: "SET_DANGEROUS_GOODS", payload: false });
    router.push("/boarding-pass");
  }

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <StepIndicator current={4} />

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8 mt-6">
        {/* Warning Banner */}
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-300 rounded-xl p-4 mb-6">
          <span className="text-3xl">⚠️</span>
          <div>
            <p className="font-bold text-amber-700">Dangerous Goods Declaration</p>
            <p className="text-sm text-amber-600">โปรดอ่านและตอบคำถามด้านล่างอย่างตรงไปตรงมา</p>
          </div>
        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-4">
          ท่านมีสิ่งของต้องห้ามต่อไปนี้อยู่ในสัมภาระหรือไม่?
        </h1>

        {/* Dangerous Items List */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {DANGEROUS_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Yes / No Choice */}
        <p className="text-sm font-semibold text-gray-700 mb-3">
          กรุณาเลือกคำตอบ:
        </p>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setAnswer("yes")}
            className={`flex-1 py-3 rounded-xl border-2 font-semibold transition
              ${answer === "yes"
                ? "border-red-500 bg-red-50 text-red-600"
                : "border-gray-200 text-gray-600 hover:border-red-300 hover:bg-red-50"
              }`}
          >
            ✅ มี (Yes)
          </button>
          <button
            onClick={() => setAnswer("no")}
            className={`flex-1 py-3 rounded-xl border-2 font-semibold transition
              ${answer === "no"
                ? "border-green-500 bg-green-50 text-green-600"
                : "border-gray-200 text-gray-600 hover:border-green-300 hover:bg-green-50"
              }`}
          >
            ❌ ไม่มี (No)
          </button>
        </div>

        {answer === "yes" && (
          <div className="bg-red-100 border border-red-300 rounded-xl p-4 mb-4 text-sm text-red-700">
            ⛔ ท่านไม่สามารถดำเนินการ Check-in ออนไลน์ได้ กรุณาติดต่อเจ้าหน้าที่สายการบินที่เคาน์เตอร์
          </div>
        )}

        <button
          onClick={handleContinue}
          disabled={answer === null}
          className={`w-full py-3 rounded-lg font-semibold text-white transition
            ${answer !== null
              ? answer === "no"
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-red-500 hover:bg-red-600 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed text-gray-400"
            }`}
        >
          {answer === "no" ? "Continue →" : answer === "yes" ? "ติดต่อเจ้าหน้าที่" : "Continue →"}
        </button>
      </div>
    </div>
  );
}

