import { motion } from "framer-motion";
import StatCard from "@/components/molecules/StatCard";

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      title: "Total Bonuses",
      value: stats?.totalBonuses || 0,
      icon: "Gift",
      trend: "up",
      trendValue: "+12%",
      gradient: true
    },
    {
      title: "Active Pages",
      value: stats?.activePages || 0,
      icon: "FileText",
      trend: "up",
      trendValue: "+8%"
    },
    {
      title: "Total Views",
      value: stats?.totalViews || 0,
      icon: "Eye",
      trend: "up",
      trendValue: "+24%"
    },
    {
      title: "Conversion Rate",
      value: `${stats?.conversionRate || 0}%`,
      icon: "TrendingUp",
      trend: "up",
      trendValue: "+3.2%"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;