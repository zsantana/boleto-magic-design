
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'right' | 'none';
}

const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 600, 
  className = '',
  direction = 'up'
}: FadeInProps) => {
  const getAnimationClass = () => {
    switch (direction) {
      case 'up':
        return 'animate-slide-up';
      case 'right':
        return 'animate-fade-in-right';
      default:
        return 'animate-fade-in';
    }
  };

  const animationClass = getAnimationClass();
  const delayStyle = { animationDelay: `${delay}ms`, animationDuration: `${duration}ms` };

  return (
    <div 
      className={cn(animationClass, className)} 
      style={delayStyle}
    >
      {children}
    </div>
  );
};

export default FadeIn;
