
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { BoletoFormData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  barcode: z.string().min(1, { message: 'Código de barras é obrigatório' }),
  amount: z.string().min(1, { message: 'Valor é obrigatório' }),
  dueDate: z.date({
    required_error: 'Data de vencimento é obrigatória',
  }),
  issuer: z.string().min(1, { message: 'Emissor é obrigatório' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória' }),
});

interface BoletoFormProps {
  onSubmit: (data: BoletoFormData) => void;
  isLoading?: boolean;
}

const BoletoForm = ({ onSubmit, isLoading = false }: BoletoFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      barcode: '',
      amount: '',
      issuer: '',
      description: '',
    },
  });
  
  const { toast } = useToast();

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const numericAmount = parseFloat(values.amount.replace(/\D/g, '')) / 100;
    
    const data: BoletoFormData = {
      barcode: values.barcode,
      amount: numericAmount,
      dueDate: values.dueDate,
      issuer: values.issuer,
      description: values.description,
    };
    
    onSubmit(data);
    
    toast({
      title: 'Boleto registrado com sucesso!',
      description: `O boleto para ${values.issuer} foi registrado.`,
    });
    
    form.reset();
  };

  // Format currency input
  const formatCurrency = (value: string) => {
    // Remove any non-digit character
    const numericValue = value.replace(/\D/g, '');
    
    // Convert to cents
    const cents = parseInt(numericValue, 10) || 0;
    
    // Format to Brazilian currency
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(cents / 100);
  };

  const handleCurrencyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the caret position
    const caret = e.target.selectionStart;
    const element = e.target;
    const value = e.target.value;
    
    // Skip if this is a backspace
    if (/^.*[\b]$/.test(value)) return;
    
    // Get only digits
    const rawValue = value.replace(/\D/g, '');
    
    // Format the value as currency
    const formattedValue = formatCurrency(rawValue);
    
    // Update the value in React Hook Form
    form.setValue('amount', formattedValue);
    
    // Restore caret position after formatting
    window.requestAnimationFrame(() => {
      element.selectionStart = caret;
      element.selectionEnd = caret;
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="barcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de Barras</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o código de barras" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <Input
                    placeholder="R$ 0,00"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleCurrencyInput(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Vencimento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      locale={ptBR}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="issuer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emissor</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do emissor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descrição ou finalidade do boleto"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrar Boleto"}
        </Button>
      </form>
    </Form>
  );
};

export default BoletoForm;
