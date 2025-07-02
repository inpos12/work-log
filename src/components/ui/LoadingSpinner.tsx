// components/ui/LoadingSpinner.tsx
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
  </div>
);

// components/ui/ErrorMessage.tsx
export const ErrorMessage = ({ message }: { message: string }) => (
  <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
    {message}
  </div>
);
