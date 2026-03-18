type Props = {
  value: string;
};

export const Tooltip: React.FC<Props> = ({ value }) => {
  return (
    <div className="absolute px-3 py-2 mb-2 text-xs text-white transition-all duration-300 scale-0 -translate-x-1/2 bg-black rounded-md opacity-0 bottom-full left-1/2 whitespace-nowrap">
      {value}
      <div className="absolute w-2 h-2 rotate-45 -translate-x-1/2 bg-black left-1/2 -bottom-1"></div>
    </div>
  );
};
