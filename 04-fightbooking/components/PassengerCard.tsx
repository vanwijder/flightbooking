import { Passenger } from "@/types/booking";

interface PassengerCardProps {
  pax: Passenger;
  isSelected: boolean;
  onClick: () => void;
}

/** การ์ดแสดงข้อมูลผู้โดยสาร — ใช้ในหน้า Select Pax */
export default function PassengerCard({ pax, isSelected, onClick }: PassengerCardProps) {
  return (
    <div
      role="button"
      aria-pressed={isSelected}
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition select-none
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
          Passport: {pax.passport} · Seat:{" "}
          <span className="font-medium text-blue-600">{pax.seat}</span>
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
}

