import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  children, 
  hover = true,
  ...props 
}, ref) => {
  const CardComponent = hover ? motion.div : "div";
  
  return (
    <CardComponent
      ref={ref}
      whileHover={hover ? { scale: 1.02 } : undefined}
      className={cn(
        "rounded-xl bg-gradient-surface p-6 shadow-premium border border-gray-700 transition-all duration-300",
        hover && "hover:shadow-premium-lg hover:border-gray-600",
        className
      )}
      {...props}
    >
      {children}
    </CardComponent>
  );
});

Card.displayName = "Card";

export default Card;