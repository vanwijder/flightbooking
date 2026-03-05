interface FormFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
  uppercase?: boolean;
  type?: string;
}

/** กล่อง input พร้อม label — ใช้ซ้ำในหน้า Check-in */
export default function FormField({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  uppercase = false,
  type = "text",
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(uppercase ? e.target.value.toUpperCase() : e.target.value)
        }
        className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition
          ${uppercase ? "uppercase tracking-widest" : ""}`}
      />
    </div>
  );
}

