export default function Divider({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="h-0.5 w-full bg-black/10 dark:bg-white/20"></div>
      <span className="text-sm">{label}</span>
      <div className="h-0.5 w-full bg-black/10 dark:bg-white/20"></div>
    </div>
  );
}
