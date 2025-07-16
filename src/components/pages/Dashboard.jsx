import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import DashboardStats from "@/components/organisms/DashboardStats";
import RecentActivity from "@/components/organisms/RecentActivity";
import Analytics from "@/components/pages/Analytics";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import { dashboardService } from "@/services/api/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [statsData, activitiesData] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getRecentActivity()
      ]);
      
      setStats(statsData);
      setActivities(activitiesData);
    } catch (err) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading type="dashboard" text="Loading dashboard..." />;
  }

  if (error) {
    return <Error message={error} onRetry={loadDashboardData} />;
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-2">
            Welcome back! Here's what's happening with your bonuses.
          </p>
</div>
        
        <Button
          onClick={() => navigate("/create-bonus")}
          variant="accent"
          className="px-6 py-3"
        >
          <ApperIcon name="Plus" className="h-5 w-5 mr-2" />
          Create New Bonus
        </Button>
      </motion.div>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ApperIcon name="Zap" className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
                  <p className="text-sm text-gray-400">
                    Get started with common tasks
                  </p>
                </div>
              </div>
            </div>

<div className="space-y-3">
              <Button
                onClick={() => navigate("/create-bonus")}
                variant="outline"
                className="w-full justify-start"
              >
                <ApperIcon name="Plus" className="h-4 w-4 mr-3" />
                Create New Bonus
              </Button>
              
              <Button
                onClick={() => navigate("/pages")}
                variant="outline"
                className="w-full justify-start"
              >
                <ApperIcon name="FileText" className="h-4 w-4 mr-3" />
                View My Pages
              </Button>
              
              <Button
                onClick={() => navigate("/analytics")}
                variant="outline"
                className="w-full justify-start"
              >
                <ApperIcon name="BarChart3" className="h-4 w-4 mr-3" />
                View Analytics
              </Button>
              
              <Button
                onClick={() => navigate("/settings")}
                variant="outline"
                className="w-full justify-start"
              >
                <ApperIcon name="Settings" className="h-4 w-4 mr-3" />
                Configure API Keys
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <RecentActivity activities={activities} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-gradient-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <ApperIcon name="Sparkles" className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Ready to boost your conversions?
                </h3>
                <p className="text-gray-400">
                  Create your first AI-powered bonus in minutes
                </p>
              </div>
</div>
            <Button
              onClick={() => navigate("/create-bonus")}
              variant="primary"
              className="px-6 py-3"
            >
              Get Started
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;