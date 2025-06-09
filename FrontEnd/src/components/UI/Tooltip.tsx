import { ReactNode } from 'react';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  children: ReactNode;
  message: string;
  position?: TooltipPosition;
}

export default function Tooltip({
  children,
  message,
  position = 'top',
}: TooltipProps) {
  const baseStyles =
    'absolute z-10 w-max max-w-xs px-2 py-1 text-sm text-black bg-white border border-gray-300 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200';

  const positions: Record<TooltipPosition, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-1.5',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5',
    left: 'top-1/2 right-full -translate-y-1/2 mr-1.5',
    right: 'top-1/2 left-full -translate-y-1/2 ml-1.5',
  };

  return (
    <div className="relative inline-block group">
      {children}
      <div className={`${baseStyles} ${positions[position]}`}>
        {message}
      </div>
    </div>
  );
}

