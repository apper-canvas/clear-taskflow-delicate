import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ProviderIcon from "@/components/ProviderIcon";

const Checkbox = forwardRef(({ 
  className, 
  checked,
  onChange,
  children,
  ...props 
}, ref) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
          ref={ref}
          {...props}
        />
        <div className={cn(
          "w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center",
          checked 
? "bg-gradient-to-r from-primary to-purple-600 border-primary shadow-md" 
            : "border-gray-300 bg-white hover:border-gray-400 group-hover:bg-gradient-to-r group-hover:from-gray-50 group-hover:to-white",
          className
        )}>
          {checked && (
<ProviderIcon
              name="Check" 
              size={14} 
              className="text-white animate-in zoom-in duration-200" 
            />
          )}
        </div>
      </div>
      {children && (
        <span className="text-gray-700 font-body select-none">
          {children}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;