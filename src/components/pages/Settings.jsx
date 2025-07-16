import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import ApiSettings from "@/components/organisms/ApiSettings";
import ApperIcon from "@/components/ApperIcon";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    website: "https://example.com",
    timezone: "UTC-5"
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-2">
            Manage your account preferences and API configuration
          </p>
        </div>
        
        <Button
          onClick={() => navigate("/")}
          variant="outline"
        >
          <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ApperIcon name="User" className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Profile Settings</h3>
                <p className="text-sm text-gray-400">
                  Update your personal information
                </p>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <FormField
                label="Full Name"
                value={profile.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
              />

              <FormField
                label="Email Address"
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
              />

              <FormField
                label="Website"
                type="url"
                value={profile.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://your-website.com"
              />

              <FormField
                label="Timezone"
                type="select"
                value={profile.timezone}
                onChange={(e) => handleInputChange("timezone", e.target.value)}
              >
                <option value="UTC-8">Pacific Time (UTC-8)</option>
                <option value="UTC-7">Mountain Time (UTC-7)</option>
                <option value="UTC-6">Central Time (UTC-6)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC+0">UTC</option>
              </FormField>

              <Button
                type="submit"
                loading={loading}
                disabled={loading}
                className="w-full"
              >
                Update Profile
              </Button>
            </form>
          </Card>

          <Card className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <ApperIcon name="AlertTriangle" className="h-5 w-5 text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Danger Zone</h3>
                <p className="text-sm text-gray-400">
                  Irreversible actions
                </p>
              </div>
            </div>

            <Button
              variant="danger"
              className="w-full"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete your account?")) {
                  toast.error("Account deletion is not implemented in this demo");
                }
              }}
            >
              <ApperIcon name="Trash2" className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ApiSettings />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;