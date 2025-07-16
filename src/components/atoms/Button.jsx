import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled,
  loading,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-primary text-white hover:shadow-glow transition-all duration-300",
    secondary: "bg-gradient-surface text-white hover:bg-surface transition-all duration-300",
    accent: "bg-gradient-accent text-white hover:shadow-glow-accent transition-all duration-300",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300",
    ghost: "text-gray-300 hover:text-white hover:bg-surface transition-all duration-300",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg transition-all duration-300"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {children}
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;