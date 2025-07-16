import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const NavItem = ({ to, icon, children, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group",
          isActive 
            ? "bg-primary/20 text-primary border-l-4 border-primary" 
            : "text-gray-300 hover:text-white hover:bg-surface"
        )
      }
    >
      {({ isActive }) => (
        <>
          <ApperIcon 
            name={icon} 
            className={cn(
              "h-5 w-5 transition-all duration-300",
              isActive ? "text-primary" : "text-gray-400 group-hover:text-white"
            )} 
          />
          <span className="font-medium">{children}</span>
        </>
      )}
    </NavLink>
  );
};

export default NavItem;