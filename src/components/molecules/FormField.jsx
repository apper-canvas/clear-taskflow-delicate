import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  children, 
  error, 
  required = false, 
  className,
  ...props 
}) => {
return (
    <div className={cn("space-y-3", className)} {...props}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 font-display mb-2">
          {label}
          {required && <span className="text-error ml-1.5">*</span>}
        </label>
      )}
{children}
      {error && (
        <p className="text-sm text-error font-body mt-2 leading-relaxed">{error}</p>
      )}
    </div>
  );
};

export default FormField;