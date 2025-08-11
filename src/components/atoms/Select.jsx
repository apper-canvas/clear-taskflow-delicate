import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Select = forwardRef(({ 
  className, 
  children,
  error,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 font-body text-gray-900 bg-white";
  
  const stateStyles = error 
    ? "border-error focus:ring-error focus:border-error" 
    : "border-gray-300 focus:ring-primary focus:border-primary hover:border-gray-400";

  return (
    <select
      className={cn(
        baseStyles,
        stateStyles,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export default Select;