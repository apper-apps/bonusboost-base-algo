import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  description = "Get started by creating your first item", 
  icon = "Package",
  actionLabel = "Create New",
  onAction,
  showAction = true
}) => {
  return (
    <Card className="text-center py-16">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary/10 rounded-full mb-6">
          <ApperIcon name={icon} className="h-10 w-10 text-primary" />
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-3">
          {title}
        </h3>
        
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          {description}
        </p>
        
        {showAction && onAction && (
          <Button
            onClick={onAction}
            variant="accent"
            className="px-6 py-3"
          >
            <ApperIcon name="Plus" className="h-5 w-5 mr-2" />
            {actionLabel}
          </Button>
        )}
      </motion.div>
    </Card>
  );
};

export default Empty;