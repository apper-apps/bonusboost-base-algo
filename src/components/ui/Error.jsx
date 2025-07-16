import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  showRetry = true,
  icon = "AlertTriangle"
}) => {
  return (
    <Card className="text-center py-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-4">
          <ApperIcon name={icon} className="h-8 w-8 text-red-400" />
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          {message}
        </p>
        
        {showRetry && onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
          >
            <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </motion.div>
    </Card>
  );
};

export default Error;