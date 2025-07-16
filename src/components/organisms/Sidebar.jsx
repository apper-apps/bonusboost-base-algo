import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavItem from "@/components/molecules/NavItem";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = () => {
  const navItems = [
    { to: "/", icon: "BarChart3", label: "Dashboard" },
    { to: "/create", icon: "Plus", label: "Create Bonus" },
    { to: "/pages", icon: "FileText", label: "My Pages" },
    { to: "/analytics", icon: "TrendingUp", label: "Analytics" },
    { to: "/settings", icon: "Settings", label: "Settings" }
  ];

  return (
    <div className="hidden lg:block w-64 bg-surface border-r border-gray-700 h-screen">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <ApperIcon name="Zap" className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">BonusBoost</span>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.to} to={item.to} icon={item.icon}>
              {item.label}
            </NavItem>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="bg-gradient-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <ApperIcon name="Crown" className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Premium</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Unlock unlimited bonuses and pages
            </p>
            <button className="w-full bg-gradient-primary text-white text-sm py-2 px-3 rounded-lg hover:shadow-glow transition-all duration-300">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;