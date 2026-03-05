interface InfoCellProps {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}

/** ช่องแสดงข้อมูล Flight ใน Boarding Pass */
export default function InfoCell({ label, value, sub, highlight }: InfoCellProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className={`text-lg font-bold ${highlight ? "text-blue-600" : "text-gray-800"}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

