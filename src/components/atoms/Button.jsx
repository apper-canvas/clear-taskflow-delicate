import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg";
  
  const variants = {
primary: "bg-gradient-to-r from-primary to-purple-600 text-white hover:brightness-110 focus:ring-primary shadow-md hover:shadow-lg transform hover:scale-[1.02]",
    secondary: "bg-gradient-to-r from-secondary to-purple-600 text-white hover:brightness-110 focus:ring-secondary shadow-md hover:shadow-lg transform hover:scale-[1.02]",
    accent: "bg-gradient-to-r from-accent to-purple-600 text-white hover:brightness-110 focus:ring-accent shadow-md hover:shadow-lg transform hover:scale-[1.02]",
    outline: "border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary focus:ring-primary bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:brightness-110 focus:ring-error shadow-md hover:shadow-lg transform hover:scale-[1.02]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;