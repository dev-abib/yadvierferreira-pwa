"use client";

export default function ProfileSection({
  label,
  onEdit,
  children,
}: {
  label: string;
  onEdit?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-white/30 text-[11px] font-semibold uppercase tracking-wider">
          {label}
        </p>
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-primary-yellow text-xs font-semibold cursor-pointer hover:text-primary-yellow/80 transition-colors"
          >
            Edit
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
