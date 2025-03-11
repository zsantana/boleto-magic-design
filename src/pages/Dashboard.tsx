
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import BoletoCard from '@/components/BoletoCard';
import StatusBadge from '@/components/StatusBadge';
import { Boleto, BoletoStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, List, Grid } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import FadeIn from '@/components/FadeIn';

const Dashboard = () => {
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [filteredBoletos, setFilteredBoletos] = useState<Boleto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<BoletoStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Load boletos from localStorage
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const storedBoletos = JSON.parse(localStorage.getItem('boletos') || '[]');
      
      // If no boletos exist, add some dummy data for demonstration
      if (storedBoletos.length === 0) {
        const dummyBoletos: Boleto[] = [
          {
            id: '1',
            barcode: '23793381286000900001192000010201202200051437',
            amount: 124.75,
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
            issuer: 'Empresa de Energia',
            description: 'Conta de Luz - Junho',
            status: 'pending',
            createdAt: new Date(),
          },
          {
            id: '2',
            barcode: '83690000006 1 44220523007 9 50892122900 7 82230170811 1',
            amount: 61.44,
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
            issuer: 'Companhia de Água',
            description: 'Conta de Água - Junho',
            status: 'pending',
            createdAt: new Date(),
          },
          {
            id: '3',
            barcode: '83680000001 2 14220523007 4 90892337842 9 82230170811 8',
            amount: 112.99,
            dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
            issuer: 'Operadora de Telefonia',
            description: 'Internet Fibra - Maio',
            status: 'paid',
            paymentDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
          {
            id: '4',
            barcode: '23791234500900001192000010201202200051437',
            amount: 90.50,
            dueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            issuer: 'Cartão de Crédito',
            description: 'Fatura - Maio',
            status: 'expired',
            createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
          },
          {
            id: '5',
            barcode: '83670000001 6 14220523007 3 90892337842 0 82230170811 4',
            amount: 150.00,
            dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
            issuer: 'Academia FitLife',
            description: 'Mensalidade - Junho',
            status: 'canceled',
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          },
        ];
        
        localStorage.setItem('boletos', JSON.stringify(dummyBoletos));
        setBoletos(dummyBoletos);
      } else {
        // Parse date strings back to Date objects
        const parsedBoletos = storedBoletos.map((boleto: any) => ({
          ...boleto,
          dueDate: new Date(boleto.dueDate),
          createdAt: new Date(boleto.createdAt),
          paymentDate: boleto.paymentDate ? new Date(boleto.paymentDate) : undefined,
        }));
        
        setBoletos(parsedBoletos);
      }
      
      setIsLoading(false);
    }, 1000);
  }, []);

  // Apply filters when boletos, status filter, or search query changes
  useEffect(() => {
    let filtered = [...boletos];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(boleto => boleto.status === statusFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        boleto =>
          boleto.description.toLowerCase().includes(query) ||
          boleto.issuer.toLowerCase().includes(query) ||
          boleto.barcode.includes(query)
      );
    }
    
    setFilteredBoletos(filtered);
  }, [boletos, statusFilter, searchQuery]);

  // Function to update boleto status
  const updateBoletoStatus = (id: string, newStatus: BoletoStatus) => {
    const updatedBoletos = boletos.map(boleto => {
      if (boleto.id === id) {
        const updatedBoleto = { 
          ...boleto, 
          status: newStatus,
          paymentDate: newStatus === 'paid' ? new Date() : boleto.paymentDate
        };
        return updatedBoleto;
      }
      return boleto;
    });
    
    setBoletos(updatedBoletos);
    localStorage.setItem('boletos', JSON.stringify(updatedBoletos));
  };

  // Count boletos by status
  const getStatusCount = (status: BoletoStatus | 'all') => {
    if (status === 'all') return boletos.length;
    return boletos.filter(boleto => boleto.status === status).length;
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  // Calculate total amount by status
  const getTotalAmount = (status: BoletoStatus | 'all') => {
    const boletosByStatus = status === 'all' 
      ? boletos 
      : boletos.filter(boleto => boleto.status === status);
    
    return boletosByStatus.reduce((total, boleto) => total + boleto.amount, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Gerencie e acompanhe seus boletos registrados
              </p>
            </div>
            
            <Button asChild className="mt-4 sm:mt-0">
              <Link to="/register">
                <Plus className="mr-2 h-4 w-4" />
                Novo Boleto
              </Link>
            </Button>
          </FadeIn>
          
          {/* Status Cards */}
          <FadeIn delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Total de Boletos</div>
                  <div className="text-2xl font-bold mb-1">{getStatusCount('all')}</div>
                  <div className="text-sm text-muted-foreground mt-auto">
                    {formatCurrency(getTotalAmount('all'))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-1">
                    <StatusBadge status="pending" withLabel={false} className="mr-2" />
                    <div className="text-sm font-medium text-muted-foreground">Pendentes</div>
                  </div>
                  <div className="text-2xl font-bold mb-1">{getStatusCount('pending')}</div>
                  <div className="text-sm text-muted-foreground mt-auto">
                    {formatCurrency(getTotalAmount('pending'))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-1">
                    <StatusBadge status="paid" withLabel={false} className="mr-2" />
                    <div className="text-sm font-medium text-muted-foreground">Pagos</div>
                  </div>
                  <div className="text-2xl font-bold mb-1">{getStatusCount('paid')}</div>
                  <div className="text-sm text-muted-foreground mt-auto">
                    {formatCurrency(getTotalAmount('paid'))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-1">
                    <StatusBadge status="expired" withLabel={false} className="mr-2" />
                    <div className="text-sm font-medium text-muted-foreground">Vencidos</div>
                  </div>
                  <div className="text-2xl font-bold mb-1">{getStatusCount('expired')}</div>
                  <div className="text-sm text-muted-foreground mt-auto">
                    {formatCurrency(getTotalAmount('expired'))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-1">
                    <StatusBadge status="canceled" withLabel={false} className="mr-2" />
                    <div className="text-sm font-medium text-muted-foreground">Cancelados</div>
                  </div>
                  <div className="text-2xl font-bold mb-1">{getStatusCount('canceled')}</div>
                  <div className="text-sm text-muted-foreground mt-auto">
                    {formatCurrency(getTotalAmount('canceled'))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
          
          {/* Filters */}
          <FadeIn delay={200}>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar boletos..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-4">
                <div className="w-48">
                  <Select
                    value={statusFilter}
                    onValueChange={(value) => setStatusFilter(value as BoletoStatus | 'all')}
                  >
                    <SelectTrigger>
                      <div className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                      <SelectItem value="paid">Pagos</SelectItem>
                      <SelectItem value="expired">Vencidos</SelectItem>
                      <SelectItem value="canceled">Cancelados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex border rounded-md overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
          
          {/* Boletos */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredBoletos.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-lg font-medium text-muted-foreground mb-4">
                Nenhum boleto encontrado
              </div>
              <Link to="/register">
                <Button>Registrar um boleto</Button>
              </Link>
            </div>
          ) : (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBoletos.map((boleto, index) => (
                  <FadeIn key={boleto.id} delay={100 * (index % 3)}>
                    <BoletoCard boleto={boleto} />
                  </FadeIn>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Descrição</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Emissor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Valor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Vencimento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {filteredBoletos.map((boleto, index) => (
                        <tr key={boleto.id} className={index % 2 === 0 ? 'bg-white' : 'bg-muted/10'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                            {boleto.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                            {boleto.issuer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                            {formatCurrency(boleto.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                            {new Date(boleto.dueDate).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={boleto.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-8 border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative w-8 h-8 mr-2">
                <div className="absolute inset-0 bg-gradient-to-tr from-boleto-blue to-boleto-indigo rounded-md" />
                <div className="absolute inset-[2px] bg-white rounded-[4px] flex items-center justify-center font-semibold text-boleto-blue">B</div>
              </div>
              <span className="text-xl font-semibold text-foreground">BoletoMagic</span>
            </div>
            
            <div className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} BoletoMagic. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
