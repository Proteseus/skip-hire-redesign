import React from 'react';
import { Check, Clock, MapPin, Shield, Truck, AlertTriangle, CheckCircle } from 'lucide-react';
import { SkipCardProps } from '../types/Skip';
import { formatPriceBreakdown, formatHirePeriod } from '../utils/formatters';

const SkipComparisonCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  const priceBreakdown = formatPriceBreakdown(skip.price_before_vat, skip.vat);
  
  const getSizeDescription = (size: number) => {
    if (size <= 4) return 'Perfect for small projects';
    if (size <= 8) return 'Ideal for medium projects';
    if (size <= 12) return 'Great for large projects';
    return 'Perfect for major projects';
  };

  return (
    <div
      className={`
        relative group cursor-pointer transition-all duration-300 transform hover:scale-[1.02]
        ${isSelected 
          ? 'ring-2 ring-blue-500 bg-gradient-to-br from-blue-500/10 to-blue-600/5 shadow-xl shadow-blue-500/20' 
          : 'hover:ring-1 hover:ring-slate-600 bg-gradient-to-br from-slate-800/50 to-slate-700/30 hover:shadow-xl'
        }
        rounded-2xl border backdrop-blur-sm overflow-hidden h-full
        ${isSelected ? 'border-blue-500/30' : 'border-slate-600/50'}
      `}
      onClick={() => onSelect(skip)}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-10 bg-blue-600 rounded-full p-2 shadow-lg">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
      
      {/* Header with size and visual representation */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center mb-2">
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center mr-3
                ${isSelected ? 'bg-blue-500' : 'bg-slate-700'}
              `}>
                <Truck className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {skip.size} Yard
                </h3>
                <p className="text-slate-400 text-sm">
                  {getSizeDescription(skip.size)}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${isSelected ? 'text-blue-400' : 'text-white'}`}>
              {priceBreakdown.total}
            </div>
            <div className="text-xs text-slate-400">Inc. VAT</div>
          </div>
        </div>

        {/* Visual size indicator */}
        <div className="relative mb-4">
          <div className="flex items-end space-x-1 h-12">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={`
                  flex-1 rounded-t transition-all duration-300
                  ${i < Math.min(skip.size / 4, 5)
                    ? isSelected 
                      ? 'bg-gradient-to-t from-blue-500 to-blue-400'
                      : 'bg-gradient-to-t from-slate-600 to-slate-500'
                    : 'bg-slate-800'
                  }
                `}
                style={{ 
                  height: `${Math.min((i + 1) * (skip.size / 20) * 48, 48)}px` 
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="px-6 pb-6">
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-slate-300">
            <Clock className="w-4 h-4 mr-3 text-slate-400" />
            <span className="text-sm">{formatHirePeriod(skip.hire_period_days)}</span>
          </div>
          
          <div className="flex items-center text-slate-300">
            <MapPin className="w-4 h-4 mr-3 text-slate-400" />
            <span className="text-sm">{skip.area} • {skip.postcode}</span>
          </div>
          
          <div className="text-xs text-slate-400 ml-7">
            {priceBreakdown.beforeVat} + {priceBreakdown.vatAmount} VAT
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-xs">
            {skip.allows_heavy_waste ? (
              <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
            ) : (
              <AlertTriangle className="w-3 h-3 mr-2 text-amber-400" />
            )}
            <span className={skip.allows_heavy_waste ? 'text-green-400' : 'text-amber-400'}>
              {skip.allows_heavy_waste ? 'Heavy waste allowed' : 'Light waste only'}
            </span>
          </div>
          
          <div className="flex items-center text-xs">
            {skip.allowed_on_road ? (
              <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
            ) : (
              <AlertTriangle className="w-3 h-3 mr-2 text-amber-400" />
            )}
            <span className={skip.allowed_on_road ? 'text-green-400' : 'text-amber-400'}>
              {skip.allowed_on_road ? 'Road placement OK' : 'Private land only'}
            </span>
          </div>
          
          {skip.transport_cost && (
            <div className="flex items-center text-xs text-slate-400">
              <Shield className="w-3 h-3 mr-2" />
              Transport: £{skip.transport_cost}
            </div>
          )}
        </div>

        {/* Action button */}
        <button
          className={`
            w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200
            ${isSelected
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 transform scale-[0.98]' 
              : 'bg-slate-700/50 text-slate-200 hover:bg-slate-600 group-hover:bg-blue-600 group-hover:text-white border border-slate-600'
            }
          `}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(skip);
          }}
        >
          {isSelected ? (
            <div className="flex items-center justify-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Selected
            </div>
          ) : (
            'Select This Skip'
          )}
        </button>
      </div>
    </div>
  );
};

export default SkipComparisonCard;