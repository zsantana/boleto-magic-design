
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import BoletoForm from '@/components/BoletoForm';
import { Boleto, BoletoFormData } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import FadeIn from '@/components/FadeIn';

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (data: BoletoFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create new boleto with generated ID and default status
      const newBoleto: Boleto = {
        ...data,
        id: uuidv4(),
        status: 'pending',
        createdAt: new Date(),
      };
      
      // Get existing boletos from localStorage or create empty array
      const existingBoletos = JSON.parse(localStorage.getItem('boletos') || '[]');
      
      // Add new boleto to array
      const updatedBoletos = [...existingBoletos, newBoleto];
      
      // Save to localStorage
      localStorage.setItem('boletos', JSON.stringify(updatedBoletos));
      
      // Reset state and redirect
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2">
                Registrar Boleto
              </h1>
            </FadeIn>
            
            <FadeIn delay={100}>
              <p className="text-center text-muted-foreground mb-8">
                Preencha os dados do boleto para registrá-lo em seu dashboard
              </p>
            </FadeIn>
            
            <FadeIn 
              delay={200} 
              className="bg-white shadow-sm rounded-xl p-6 md:p-8 border border-border/50"
            >
              <BoletoForm onSubmit={handleSubmit} isLoading={isSubmitting} />
            </FadeIn>
          </div>
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

export default Register;
