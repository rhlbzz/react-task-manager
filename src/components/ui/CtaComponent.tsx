'use client';
import React from 'react';
import styles from '../../styles/components/CtaComponent.module.scss';
import { useRouter } from 'next/navigation';


interface CtaComponentProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  href?: string;
  action?: string;
  className?: string;
  onClickCallback?: () => void;
}

const CtaComponent: React.FC<CtaComponentProps> = ({ text, variant = 'primary', href = '', action = '', className = '', onClickCallback}) => {
  
  const router = useRouter();

  const handleClick = () => {
    if (href) router.push(href);
    else if (onClickCallback) onClickCallback();
  };

  return (
  <button 
    onClick={handleClick} 
    className={`pointer-events-auto hover:cursor-pointer ${className} ${styles[variant.toLowerCase()]}`}
    type={action ? 'button' : 'submit'}
  >{text}</button>
  );
};
export default CtaComponent;