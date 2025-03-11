
export type BoletoStatus = 'pending' | 'paid' | 'expired' | 'canceled';

export interface Boleto {
  id: string;
  barcode: string;
  amount: number;
  dueDate: Date;
  issuer: string;
  description: string;
  status: BoletoStatus;
  paymentDate?: Date;
  createdAt: Date;
}

export type BoletoFormData = Omit<Boleto, 'id' | 'status' | 'paymentDate' | 'createdAt'>;
