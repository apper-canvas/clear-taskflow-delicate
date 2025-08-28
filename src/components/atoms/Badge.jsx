import { cn } from "@/utils/cn";

const Badge = ({ 
  className, 
  variant = "primary", 
  size = "md", 
  children,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center font-semibold rounded-full transition-all duration-300 shadow-sm";
const variants = {
    primary: "bg-gradient-to-r from-primary/10 to-purple-100 text-primary border border-primary/20 hover:from-primary/20 hover:to-purple-200",
    secondary: "bg-gradient-to-r from-secondary/10 to-purple-100 text-secondary border border-secondary/20 hover:from-secondary/20 hover:to-purple-200",
    accent: "bg-gradient-to-r from-accent/10 to-purple-100 text-accent border border-accent/20 hover:from-accent/20 hover:to-purple-200",
    success: "bg-gradient-to-r from-success/10 to-emerald-100 text-success border border-success/20 hover:from-success/20 hover:to-emerald-200",
    warning: "bg-gradient-to-r from-warning/10 to-yellow-100 text-warning border border-warning/20 hover:from-warning/20 hover:to-yellow-200",
    error: "bg-gradient-to-r from-error/10 to-red-100 text-error border border-error/20 hover:from-error/20 hover:to-red-200",
    gray: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300 hover:from-gray-200 hover:to-gray-300"
  };

const sizes = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;