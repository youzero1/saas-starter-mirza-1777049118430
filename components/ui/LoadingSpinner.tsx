export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-sm text-gray-400">Loading...</p>
    </div>
  );
}
