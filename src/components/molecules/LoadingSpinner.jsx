import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <ApperIcon name="Loader2" className={`${sizes[size]} text-primary`} />
      </motion.div>
      {text && <p className="text-sm text-gray-300">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;