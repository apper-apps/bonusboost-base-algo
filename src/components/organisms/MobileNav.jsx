import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const MobileNav = ({ isOpen, onClose }) => {
  const navItems = [
    { to: "/", icon: "BarChart3", label: "Dashboard" },
    { to: "/create", icon: "Plus", label: "Create Bonus" },
    { to: "/pages", icon: "FileText", label: "My Pages" },
    { to: "/analytics", icon: "TrendingUp", label: "Analytics" },
    { to: "/settings", icon: "Settings", label: "Settings" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-background border-l border-gray-700 z-50 lg:hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <ApperIcon name="Zap" className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold gradient-text">BonusBoost</span>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <ApperIcon name="X" className="h-5 w-5" />
                </Button>
              </div>

              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-surface transition-all duration-300"
                  >
                    <ApperIcon name={item.icon} className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <Button variant="accent" className="w-full">
                  <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                  New Bonus
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;