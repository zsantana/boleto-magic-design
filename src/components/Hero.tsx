
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-background to-accent/20 pt-28 pb-16 md:pt-40 md:pb-24">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[80%] h-[80%] opacity-30 blur-3xl bg-gradient-to-br from-primary/30 to-accent/10 rounded-full animate-spin-slow pointer-events-none"/>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[60%] h-[60%] opacity-30 blur-3xl bg-gradient-to-tr from-primary/30 to-accent/10 rounded-full animate-spin-slow pointer-events-none"/>
      
      <div className="relative container mx-auto px-6 md:px-12 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <FadeIn
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6"
              delay={100}
            >
              <span className="relative flex w-2 h-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/80 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Simplifique sua gestão financeira
            </FadeIn>
          </div>
          
          <FadeIn delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight tracking-tight text-foreground mb-6">
              Gerencie seus boletos de maneira <span className="text-primary">simples</span> e <span className="text-primary">eficaz</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={300} className="max-w-2xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Plataforma moderna para registrar, organizar e acompanhar seus boletos
              bancários. Mantenha suas finanças em ordem com facilidade e agilidade.
            </p>
          </FadeIn>
          
          <FadeIn delay={400} className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/register" className="px-8">
                Começar agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild>
              <Link to="/dashboard" className="px-8">
                Ver dashboard
              </Link>
            </Button>
          </FadeIn>
        </div>
        
        <FadeIn 
          delay={600} 
          className="max-w-4xl mx-auto mt-16 glass-card rounded-2xl border border-primary/10 overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-boleto-blue/5 to-primary/5 pointer-events-none"></div>
          <div className="p-1 sm:p-2">
            <img 
              src="https://placehold.co/1200x675/EEF2FF/FFFFFF?text=Dashboard+preview" 
              alt="Dashboard Preview" 
              className="rounded-xl w-full h-auto shadow-sm"
            />
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Hero;
