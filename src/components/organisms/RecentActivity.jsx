import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const RecentActivity = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "bonus_created": return "Gift";
      case "page_created": return "FileText";
      case "page_viewed": return "Eye";
      case "click_tracked": return "MousePointer";
      default: return "Activity";
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "bonus_created": return "accent";
      case "page_created": return "primary";
      case "page_viewed": return "info";
      case "click_tracked": return "success";
      default: return "gray";
    }
  };

  if (activities.length === 0) {
    return (
      <Card className="text-center py-12">
        <ApperIcon name="Activity" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-300 mb-2">
          No Recent Activity
        </h3>
        <p className="text-gray-400">
          Your recent activities will appear here
        </p>
      </Card>
    );
  }

  return (
    <Card className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-info/10 rounded-lg">
          <ApperIcon name="Activity" className="h-5 w-5 text-info" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <p className="text-sm text-gray-400">
            Latest updates from your account
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
          >
            <div className="p-2 bg-surface rounded-lg">
              <ApperIcon 
                name={getActivityIcon(activity.type)} 
                className="h-4 w-4 text-gray-400" 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {activity.description}
              </p>
              <p className="text-xs text-gray-400">
                {format(new Date(activity.timestamp), "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
            
            <Badge 
              variant={getActivityColor(activity.type)} 
              size="sm"
            >
              {activity.type.replace("_", " ")}
            </Badge>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivity;