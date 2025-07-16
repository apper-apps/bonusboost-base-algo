import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Loading = ({ type = "default", text = "Loading..." }) => {
  const renderSkeleton = () => {
    switch (type) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-surface rounded-xl p-6 animate-pulse">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-600 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                      <div className="h-6 bg-gray-600 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-surface rounded-xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-600 rounded w-1/3 mb-4"></div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-4 bg-gray-600 rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "list":
        return (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-surface rounded-xl p-6 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-600 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-600 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-600 rounded w-2/3"></div>
                  </div>
                  <div className="w-20 h-8 bg-gray-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case "cards":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-surface rounded-xl p-6 animate-pulse">
                <div className="w-full h-32 bg-gray-600 rounded-lg mb-4"></div>
                <div className="h-5 bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-600 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        );
      
      default:
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <ApperIcon name="Loader2" className="h-8 w-8 text-primary" />
            </motion.div>
            <p className="text-gray-300 font-medium">{text}</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {renderSkeleton()}
    </div>
  );
};

export default Loading;