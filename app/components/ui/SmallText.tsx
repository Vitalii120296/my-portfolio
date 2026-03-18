import React from 'react';

type Props = {
  value: string;
  className?: string;
};

export const SmallText: React.FC<Props> = ({ value, className = '' }) => {
  return (
    <span
      className={`block mb-3 text-xs tracking-wide uppercase text-neutral-400/55 ${className}`}
    >
      {value}
    </span>
  );
};
