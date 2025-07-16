import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import MobileNav from "@/components/organisms/MobileNav";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">BonusBoost</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link to="/create" className="text-gray-300 hover:text-white transition-colors">
                Create Bonus
              </Link>
              <Link to="/pages" className="text-gray-300 hover:text-white transition-colors">
                My Pages
              </Link>
              <Link to="/analytics" className="text-gray-300 hover:text-white transition-colors">
                Analytics
              </Link>
              <Link to="/settings" className="text-gray-300 hover:text-white transition-colors">
                Settings
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="accent" size="sm" className="hidden lg:flex">
                <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                New Bonus
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <ApperIcon name="Menu" className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};

export default Header;