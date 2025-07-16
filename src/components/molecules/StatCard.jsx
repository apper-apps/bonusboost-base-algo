import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  className,
  gradient = false 
}) => {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      {gradient && (
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
      )}
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ApperIcon name={icon} className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">{title}</p>
              <p className="text-2xl font-bold text-white">{value}</p>
            </div>
          </div>
          
          {trend && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend === "up" ? "text-success" : "text-error"
            )}>
              <ApperIcon 
                name={trend === "up" ? "TrendingUp" : "TrendingDown"} 
                className="h-4 w-4" 
              />
              <span>{trendValue}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;