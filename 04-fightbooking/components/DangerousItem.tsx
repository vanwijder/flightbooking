interface DangerousItemProps {
  icon: string;
  label: string;
}

/** กล่องแสดงรายการของอันตราย */
export default function DangerousItem({ icon, label }: DangerousItemProps) {
  return (
    <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
      <span className="text-xl" role="img" aria-hidden="true">{icon}</span>
      <span className="text-xs text-gray-700">{label}</span>
    </div>
  );
}

