export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>
      <p className="text-sm text-gray-400 font-medium">Loading...</p>
    </div>
  );
}
