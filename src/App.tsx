import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Filter, Search, Star, Zap } from 'lucide-react';
import ProgressSteps from './components/ProgressSteps';
import SkipSelector from './components/SkipSelector';
import LoadingSpinner from './components/LoadingSpinner';
import { useSkips } from './hooks/useSkips';
import { Skip } from './types/Skip';

function App() {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'size' | 'period'>('price');
  const { skips, loading, error } = useSkips('NR32', 'Lowestoft');

  const filteredAndSortedSkips = skips
    .filter(skip => 
      skip.size.toString().includes(searchTerm) || 
      skip.area.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return (a.price_before_vat * (1 + a.vat / 100)) - (b.price_before_vat * (1 + b.vat / 100));
        case 'size':
          return a.size - b.size;
        case 'period':
          return a.hire_period_days - b.hire_period_days;
        default:
          return 0;
      }
    });

  const handleSkipSelect = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  const handleContinue = () => {
    if (selectedSkip) {
      console.log('Proceeding with skip:', selectedSkip);
      // Here you would navigate to the next step
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <button className="flex items-center text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Waste Type
            </button>
            <div className="text-slate-400 text-sm">
              Step 3 of 6
            </div>
          </div>
          <ProgressSteps />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Choose Your Perfect Skip Size
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Select Your Skip
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Compare skip sizes and find the perfect solution for your waste disposal needs in Lowestoft
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by size or area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'size' | 'period')}
              className="pl-10 pr-8 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none min-w-[160px]"
            >
              <option value="price">Sort by Price</option>
              <option value="size">Sort by Size</option>
              <option value="period">Sort by Period</option>
            </select>
          </div>
        </div>

        {/* Skip Selection */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-400 text-lg mb-4">Error loading skip options</div>
            <p className="text-slate-400">{error}</p>
          </div>
        ) : (
          <SkipSelector
            skips={filteredAndSortedSkips}
            selectedSkip={selectedSkip}
            onSkipSelect={handleSkipSelect}
          />
        )}
      </div>

      {/* Floating Pricing Bar */}
      {selectedSkip && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50 p-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                <Star className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {selectedSkip.size} Yard Skip Selected
                </h3>
                <p className="text-slate-400 text-sm">
                  {selectedSkip.hire_period_days} day hire • {selectedSkip.area}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-400">
                  £{(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)).toFixed(0)}
                </div>
                <div className="text-slate-400 text-xs">
                  Including VAT
                </div>
              </div>
              <button
                onClick={handleContinue}
                className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-600/25"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;