
import React from 'react';
import { cn } from '@/lib/utils';
import { BoletoStatus } from '@/lib/types';
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  XCircle 
} from 'lucide-react';

interface StatusBadgeProps {
  status: BoletoStatus;
  className?: string;
  withLabel?: boolean;
  iconOnly?: boolean;
}

const StatusBadge = ({ 
  status, 
  className,
  withLabel = true,
  iconOnly = false
}: StatusBadgeProps) => {
  const statusConfig = {
    pending: {
      color: 'bg-boleto-yellow/15 text-boleto-yellow border-boleto-yellow/30',
      icon: <Clock className="w-4 h-4" />,
      label: 'Pendente'
    },
    paid: {
      color: 'bg-boleto-green/15 text-boleto-green border-boleto-green/30',
      icon: <CheckCircle2 className="w-4 h-4" />,
      label: 'Pago'
    },
    expired: {
      color: 'bg-boleto-orange/15 text-boleto-orange border-boleto-orange/30',
      icon: <AlertCircle className="w-4 h-4" />,
      label: 'Vencido'
    },
    canceled: {
      color: 'bg-boleto-red/15 text-boleto-red border-boleto-red/30',
      icon: <XCircle className="w-4 h-4" />,
      label: 'Cancelado'
    }
  };

  const config = statusConfig[status];

  if (iconOnly) {
    return (
      <span className={cn("text-[0.9rem]", className)}>
        {config.icon}
      </span>
    );
  }

  return (
    <span 
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.color,
        className
      )}
    >
      {config.icon}
      {withLabel && <span className="ml-1">{config.label}</span>}
    </span>
  );
};

export default StatusBadge;
