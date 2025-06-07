import React from 'react';
import { Check, Truck, Clock, AlertTriangle, DollarSign } from 'lucide-react';
import { SkipCardProps } from '../types/Skip';
import { formatPrice, formatHirePeriod, formatPriceBreakdown } from '../utils/formatters';

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  const priceBreakdown = formatPriceBreakdown(skip.price_before_vat, skip.vat);
  
  return (
    <div 
      className={`
        relative group cursor-pointer transition-all duration-300 transform hover:scale-[1.02]
        ${isSelected 
          ? 'ring-2 ring-blue-500 bg-gradient-to-br from-blue-950/50 to-blue-900/30' 
          : 'hover:ring-1 hover:ring-gray-600 bg-gradient-to-br from-gray-900/50 to-gray-800/30'
        }
        rounded-2xl border border-gray-700 backdrop-blur-sm overflow-hidden
      `}
      onClick={() => onSelect(skip)}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-10 bg-blue-600 rounded-full p-2">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
      
      {/* Skip image placeholder with size indicator */}
      <div className="relative h-40 bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {skip.size} Yards
        </div>
        <Truck className="w-16 h-16 text-yellow-100" />
      </div>
      
      {/* Card content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">
            {skip.size} Yard Skip
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-400">
              {priceBreakdown.total}
            </div>
            <div className="text-xs text-gray-400">
              Inc. VAT
            </div>
          </div>
        </div>
        
        {/* Key details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-300">
            <Clock className="w-4 h-4 mr-2 text-blue-400" />
            <span className="text-sm">{formatHirePeriod(skip.hire_period_days)}</span>
          </div>
          
          <div className="flex items-center text-gray-300">
            <DollarSign className="w-4 h-4 mr-2 text-blue-400" />
            <span className="text-sm">
              {priceBreakdown.beforeVat} + {priceBreakdown.vatAmount} VAT
            </span>
          </div>
          
          <div className="text-xs text-gray-400">
            {skip.area} • {skip.postcode}
          </div>
        </div>
        
        {/* Features */}
        <div className="space-y-2 mb-6">
          {skip.allows_heavy_waste && (
            <div className="flex items-center text-xs text-green-400">
              <Check className="w-3 h-3 mr-1" />
              Heavy waste allowed
            </div>
          )}
          
          {skip.allowed_on_road && (
            <div className="flex items-center text-xs text-green-400">
              <Check className="w-3 h-3 mr-1" />
              Road placement permitted
            </div>
          )}
          
          {skip.transport_cost && (
            <div className="flex items-center text-xs text-gray-400">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Transport cost: £{skip.transport_cost}
            </div>
          )}
        </div>
        
        {/* Action button */}
        <button
          className={`
            w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200
            ${isSelected
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
              : 'bg-gray-700 text-gray-200 hover:bg-gray-600 group-hover:bg-blue-600 group-hover:text-white'
            }
          `}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(skip);
          }}
        >
          {isSelected ? 'Selected' : 'Select This Skip'}
        </button>
      </div>
    </div>
  );
};

export default SkipCard;