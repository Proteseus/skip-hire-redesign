import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-400 rounded-full animate-spin animation-delay-75"></div>
      </div>
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Loading Skip Options</h3>
        <p className="text-slate-400 text-sm max-w-md">
          We're finding the best skip sizes and prices for your location...
        </p>
      </div>
      <div className="flex space-x-1 mt-6">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-100"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-200"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;