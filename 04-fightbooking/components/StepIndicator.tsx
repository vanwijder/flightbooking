"use client";

const STEPS = [
  { num: 1, label: "Check-in" },
  { num: 2, label: "Select Pax" },
  { num: 3, label: "Pax Info" },
  { num: 4, label: "Dangerous\nGoods" },
  { num: 5, label: "Boarding Pass" },
];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center w-full max-w-2xl">
      {STEPS.map((step, i) => (
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
          {i < STEPS.length - 1 && (
            <div
              className={`h-0.5 flex-1 mx-1 mb-5 ${step.num < current ? "bg-blue-600" : "bg-gray-300"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

