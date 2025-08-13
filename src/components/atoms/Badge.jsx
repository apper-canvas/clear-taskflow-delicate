import { cn } from "@/utils/cn";

const Badge = ({ 
  className, 
  variant = "primary", 
  size = "md", 
  children,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full transition-all duration-200";
  
  const variants = {
primary: "bg-gradient-to-r from-primary/10 to-purple-100 text-primary border border-primary/20",
    secondary: "bg-gradient-to-r from-secondary/10 to-purple-100 text-secondary border border-secondary/20",
    accent: "bg-gradient-to-r from-accent/10 to-purple-100 text-accent border border-accent/20",
    success: "bg-gradient-to-r from-success/10 to-emerald-100 text-success border border-success/20",
    warning: "bg-gradient-to-r from-warning/10 to-yellow-100 text-warning border border-warning/20",
    error: "bg-gradient-to-r from-error/10 to-red-100 text-error border border-error/20",
    gray: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300"
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base"
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