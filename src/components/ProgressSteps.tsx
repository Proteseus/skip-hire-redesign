import React from 'react';
import { CheckCircle, MapPin, Trash2, Truck, Shield, Calendar, CreditCard } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  icon: React.ReactNode;
  completed: boolean;
  current: boolean;
}

const ProgressSteps: React.FC = () => {
  const steps: Step[] = [
    {
      id: 'postcode',
      label: 'Postcode',
      icon: <MapPin className="w-4 h-4" />,
      completed: true,
      current: false
    },
    {
      id: 'waste-type',
      label: 'Waste Type',
      icon: <Trash2 className="w-4 h-4" />,
      completed: true,
      current: false
    },
    {
      id: 'select-skip',
      label: 'Select Skip',
      icon: <Truck className="w-4 h-4" />,
      completed: false,
      current: true
    },
    {
      id: 'permit-check',
      label: 'Permit Check',
      icon: <Shield className="w-4 h-4" />,
      completed: false,
      current: false
    },
    {
      id: 'choose-date',
      label: 'Choose Date',
      icon: <Calendar className="w-4 h-4" />,
      completed: false,
      current: false
    },
    {
      id: 'payment',
      label: 'Payment',
      icon: <CreditCard className="w-4 h-4" />,
      completed: false,
      current: false
    }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center min-w-0">
              <div className={`
                relative flex items-center justify-center w-10 h-10 rounded-xl border-2 transition-all duration-300
                ${step.completed 
                  ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/25' 
                  : step.current 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'border-slate-600 text-slate-400 bg-slate-800/50'
                }
              `}>
                {step.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.icon
                )}
                {step.current && (
                  <div className="absolute inset-0 rounded-xl bg-blue-600 animate-pulse opacity-30"></div>
                )}
              </div>
              <div className="ml-3 hidden lg:block min-w-0">
                <p className={`text-sm font-medium truncate ${
                  step.current ? 'text-blue-400' : step.completed ? 'text-green-400' : 'text-slate-400'
                }`}>
                  {step.label}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {step.completed ? 'Completed' : step.current ? 'In Progress' : 'Pending'}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 lg:mx-4 transition-all duration-300 ${
                step.completed ? 'bg-green-500' : 'bg-slate-700'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;