import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Select from "@/components/atoms/Select";
import StatCard from "@/components/molecules/StatCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { analyticsService } from "@/services/api/analyticsService";
import { format } from "date-fns";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState("7days");
  const navigate = useNavigate();

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await analyticsService.getAnalytics(dateRange);
      setAnalytics(data);
    } catch (err) {
      setError("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  const chartOptions = {
    chart: {
      type: "area",
      background: "transparent",
      toolbar: { show: false },
    },
    theme: { mode: "dark" },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
      },
    },
    colors: ["#6366F1", "#10B981", "#F59E0B"],
    grid: {
      borderColor: "#374151",
      strokeDashArray: 3,
    },
    xaxis: {
      type: "datetime",
      labels: { style: { colors: "#9CA3AF" } },
    },
    yaxis: {
      labels: { style: { colors: "#9CA3AF" } },
    },
    tooltip: {
      theme: "dark",
      style: { fontSize: "12px" },
    },
    legend: {
      labels: { colors: "#9CA3AF" },
    },
  };

  if (loading) {
    return <Loading type="dashboard" text="Loading analytics..." />;
  }

  if (error) {
    return <Error message={error} onRetry={loadAnalytics} />;
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400 mt-2">
            Track your bonus page performance and conversions
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-40"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </Select>
          
          <Button variant="outline" size="sm">
            <ApperIcon name="Download" className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Views",
            value: analytics?.totalViews || 0,
            icon: "Eye",
            trend: "up",
            trendValue: "+12%",
          },
          {
            title: "Total Clicks",
            value: analytics?.totalClicks || 0,
            icon: "MousePointer",
            trend: "up",
            trendValue: "+8%",
          },
          {
            title: "Conversion Rate",
            value: `${analytics?.conversionRate || 0}%`,
            icon: "TrendingUp",
            trend: "up",
            trendValue: "+3.2%",
          },
          {
            title: "Revenue",
            value: `$${analytics?.revenue || 0}`,
            icon: "DollarSign",
            trend: "up",
            trendValue: "+24%",
          },
        ].map((stat, index) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ApperIcon name="BarChart3" className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Performance Overview</h3>
                <p className="text-sm text-gray-400">
                  Views, clicks, and conversions over time
                </p>
              </div>
            </div>
          </div>

          <div className="h-80">
            <Chart
              options={chartOptions}
              series={analytics?.chartData || []}
              type="area"
              height="100%"
            />
          </div>
        </Card>

        <Card className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <ApperIcon name="Award" className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Top Performing Pages</h3>
              <p className="text-sm text-gray-400">
                Your best converting bonus pages
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {analytics?.topPages?.map((page, index) => (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-surface/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white truncate">
                      {page.title}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {page.views} views • {page.clicks} clicks
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-semibold text-accent">
                    {page.conversionRate}%
                  </p>
                  <p className="text-xs text-gray-400">conversion</p>
                </div>
              </motion.div>
            )) || (
              <div className="text-center py-8">
                <ApperIcon name="BarChart3" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No performance data yet</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-info/10 rounded-lg">
              <ApperIcon name="Calendar" className="h-5 w-5 text-info" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              <p className="text-sm text-gray-400">
                Latest interactions with your bonus pages
              </p>
            </div>
          </div>
          
          <Button variant="outline" size="sm">
            <ApperIcon name="ExternalLink" className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Page</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Action</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Source</th>
              </tr>
            </thead>
            <tbody>
              {analytics?.recentActivity?.map((activity, index) => (
                <tr key={activity.id} className="border-b border-gray-700/50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-white truncate">
                      {activity.pageTitle}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium ${
                      activity.action === "click" ? "text-accent" : "text-info"
                    }`}>
                      {activity.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">
                    {format(new Date(activity.timestamp), "MMM d, h:mm a")}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">
                    {activity.source}
                  </td>
                </tr>
              )) || (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-400">
                    No recent activity
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;