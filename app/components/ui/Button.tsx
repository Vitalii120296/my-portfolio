import React from 'react';

type Variants = 'primary' | 'secondary' | 'wide';

type Props = {
  children: React.ReactNode;
  variant: Variants;
  disabled?: boolean;
  onClick?: () => void;
};

const variantStyles: Record<Variants, string> = {
  primary:
    ' bg-white text-black border border-transparent hover:bg-white/80 rounded-full',
  secondary:
    'bg-background text-foreground border border-border hover:bg-white/5 rounded-full',
  wide: 'bg-white text-black border border-transparent w-full hover:bg-white/80 rounded-md'
};

export const Button: React.FC<Props> = ({
  children,
  variant,
  disabled = false,
  onClick
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-6  items-center justify-center whitespace-nowrap leading-5 py-2 
          transition-all duration-300 active:scale-110 font-medium ${variantStyles[variant]} ${disabled && 'bg-white/30!'}`}
    >
      {children}
    </button>
  );
};
