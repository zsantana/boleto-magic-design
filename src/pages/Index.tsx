
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { Clock, FileText, BarChart, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import FadeIn from '@/components/FadeIn';

const Index = () => {
  const features = [
    {
      icon: <FileText className="h-6 w-6 text-white" />,
      title: 'Registro Simplificado',
      description: 'Registre seus boletos em poucos cliques, sem complicações ou burocracia.',
      color: 'bg-gradient-to-br from-boleto-blue to-boleto-indigo'
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: 'Alertas de Vencimento',
      description: 'Receba notificações antes do vencimento para nunca perder um prazo de pagamento.',
      color: 'bg-gradient-to-br from-boleto-green to-boleto-blue'
    },
    {
      icon: <BarChart className="h-6 w-6 text-white" />,
      title: 'Relatórios Detalhados',
      description: 'Visualize relatórios completos sobre seus gastos e pagamentos realizados.',
      color: 'bg-gradient-to-br from-boleto-indigo to-boleto-blue'
    },
    {
      icon: <CreditCard className="h-6 w-6 text-white" />,
      title: 'Organização Financeira',
      description: 'Mantenha suas finanças organizadas com uma visão clara de todos os boletos.',
      color: 'bg-gradient-to-br from-boleto-blue to-boleto-green'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Funcionalidades Principais
                </h2>
              </FadeIn>
              <FadeIn delay={100}>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Conheça todos os recursos que facilitarão a gestão dos seus boletos bancários.
                </p>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FadeIn key={index} delay={100 * (index + 1)}>
                  <div className="bg-white border border-border/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                    <div className={`${feature.color} rounded-full p-3 inline-flex items-center justify-center mb-4 shadow-md`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-accent/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-1/2 h-1/2 opacity-20 blur-3xl bg-primary rounded-full pointer-events-none"/>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-1/2 h-1/2 opacity-20 blur-3xl bg-primary rounded-full pointer-events-none"/>
          
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Comece a organizar seus boletos agora mesmo
                </h2>
              </FadeIn>
              
              <FadeIn delay={100}>
                <p className="text-lg text-muted-foreground mb-8">
                  Mantenha-se organizado e evite atrasos com nossa plataforma intuitiva.
                  Registre seus boletos e tenha controle total sobre seus pagamentos.
                </p>
              </FadeIn>
              
              <FadeIn delay={200}>
                <Button size="lg" asChild>
                  <Link to="/register" className="px-8">
                    Registrar um boleto
                  </Link>
                </Button>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-10 border-t border-border">
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

export default Index;
