const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-white">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
      <div className="absolute inset-2 border-4 border-blue-300 border-dashed rounded-full animate-spin-slower" />
    </div>
  </div>
);

export default LoadingSpinner;
