const IconWithTooltip = ({
  tooltipText,
  children,
}: {
  tooltipText: string;
  children: React.ReactNode;
}) => {
  return (
    // 'group' hace que el componente sea un grupo de referencia para el hover
    <div className="relative inline-block group">
      {children}

      {/* El Tooltip */}
      <div
        className="
        absolute left-1/2 bottom-full 
        transform -translate-x-1/2 
        mb-2 px-3 py-1 
        bg-gray-800 text-white 
        text-xs rounded-lg 
        whitespace-nowrap 
        opacity-0 pointer-events-none 
        transition-opacity duration-300 
        group-hover:opacity-100
      "
      >
        {tooltipText}
        {/* Flecha del Tooltip */}
        <div className="absolute left-1/2 top-full transform -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
      </div>
    </div>
  );
};

export default IconWithTooltip;
