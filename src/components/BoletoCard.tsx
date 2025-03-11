
import React from 'react';
import { Boleto } from '@/lib/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  CreditCard, 
  FileText, 
  Building
} from 'lucide-react';
import StatusBadge from './StatusBadge';

interface BoletoCardProps {
  boleto: Boleto;
  className?: string;
}

const BoletoCard = ({ boleto, className }: BoletoCardProps) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div 
      className={cn(
        'bg-white rounded-xl overflow-hidden shadow-md border border-border/50 transition-all duration-300',
        'hover:shadow-lg hover:border-primary/20 glass-card-hover',
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-5 flex-grow">
          <div className="flex items-start justify-between mb-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                <Building className="w-4 h-4" />
                <span className="text-sm font-medium truncate max-w-[180px]">{boleto.issuer}</span>
              </div>
              
              <h3 className="font-medium text-lg text-foreground truncate max-w-[220px]">
                {boleto.description}
              </h3>
            </div>
            <StatusBadge status={boleto.status} />
          </div>
          
          <div className="mt-2 space-y-3">
            <div className="flex items-center text-muted-foreground">
              <CreditCard className="w-4 h-4 mr-2" />
              <span className="text-sm">{formatter.format(boleto.amount)}</span>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                Vence em {format(new Date(boleto.dueDate), "dd 'de' MMMM", { locale: ptBR })}
              </span>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <FileText className="w-4 h-4 mr-2" />
              <span className="text-sm truncate max-w-[250px]">{boleto.barcode}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-accent/40 py-3 px-5 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Criado em {format(new Date(boleto.createdAt), "dd/MM/yyyy")}
            </div>
            
            {boleto.status === 'paid' && boleto.paymentDate && (
              <div className="text-sm text-muted-foreground">
                Pago em {format(new Date(boleto.paymentDate), "dd/MM/yyyy")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoletoCard;
