'use client';
import React from 'react';
import CtaComponent from './CtaComponent';
import { usePathname } from 'next/navigation';

const HeaderComponent: React.FC = () => {
  const pathname = usePathname();
  const showBack = pathname !== '/';

  return (
    <header className='flex items-center justify-end p-4'>
      {
        showBack && (
          <CtaComponent        
            text="Back To Tasks"
            variant="tertiary"
            href="/"
          />
        )
      } 
    </header>
  )
};
export default HeaderComponent;