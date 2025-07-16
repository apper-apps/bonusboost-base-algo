import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { bonusPageService } from "@/services/api/bonusPageService";

const PageBuilder = ({ bonus, product, onPageCreated }) => {
  const [pageData, setPageData] = useState({
    title: bonus?.title || "",
    description: bonus?.description || "",
    affiliateLink: "",
    ctaText: "Get This Bonus Now",
    backgroundColor: "#111827",
    primaryColor: "#6366F1",
    accentColor: "#10B981"
  });
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (field, value) => {
    setPageData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreatePage = async () => {
    if (!pageData.affiliateLink.trim()) {
      toast.error("Please enter your affiliate link");
      return;
    }

    setLoading(true);
    try {
      const page = await bonusPageService.createPage({
        bonusId: bonus.id,
        ...pageData,
        design: {
          backgroundColor: pageData.backgroundColor,
          primaryColor: pageData.primaryColor,
          accentColor: pageData.accentColor
        }
      });
      
      onPageCreated(page);
      toast.success("Bonus page created successfully!");
    } catch (error) {
      toast.error("Failed to create bonus page");
    } finally {
      setLoading(false);
    }
  };

  const previewUrl = bonus ? `/bonus/${bonus.id}` : "#";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <ApperIcon name="Palette" className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Page Builder</h3>
            <p className="text-sm text-gray-400">
              Customize your bonus hosting page
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <FormField
            label="Page Title"
            value={pageData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter page title"
          />

          <FormField
            label="Description"
            type="textarea"
            value={pageData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe your bonus value proposition"
            className="min-h-[100px]"
          />

          <FormField
            label="Affiliate Link"
            type="url"
            value={pageData.affiliateLink}
            onChange={(e) => handleInputChange("affiliateLink", e.target.value)}
            placeholder="https://your-affiliate-link.com"
          />

          <FormField
            label="Call-to-Action Text"
            value={pageData.ctaText}
            onChange={(e) => handleInputChange("ctaText", e.target.value)}
            placeholder="Get This Bonus Now"
          />

          <div className="grid grid-cols-3 gap-4">
            <FormField
              label="Background Color"
              type="color"
              value={pageData.backgroundColor}
              onChange={(e) => handleInputChange("backgroundColor", e.target.value)}
            />
            <FormField
              label="Primary Color"
              type="color"
              value={pageData.primaryColor}
              onChange={(e) => handleInputChange("primaryColor", e.target.value)}
            />
            <FormField
              label="Accent Color"
              type="color"
              value={pageData.accentColor}
              onChange={(e) => handleInputChange("accentColor", e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="primary"
            onClick={handleCreatePage}
            disabled={loading}
            loading={loading}
            className="flex-1"
          >
            Create Page
          </Button>
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <ApperIcon name="Eye" className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </Card>

      <Card className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-info/10 rounded-lg">
              <ApperIcon name="Monitor" className="h-5 w-5 text-info" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Live Preview</h3>
              <p className="text-sm text-gray-400">
                See how your page will look
              </p>
            </div>
          </div>
          <Badge variant="info" size="sm">Live</Badge>
        </div>

        <div className="border border-gray-600 rounded-lg overflow-hidden">
          <div 
            className="p-6 min-h-[400px]"
            style={{ backgroundColor: pageData.backgroundColor }}
          >
            <div className="text-center space-y-4">
              <div className="inline-block p-3 rounded-full bg-white/10">
                <ApperIcon name="Gift" className="h-8 w-8 text-white" />
              </div>
              
              <h1 
                className="text-2xl font-bold"
                style={{ color: pageData.primaryColor }}
              >
                {pageData.title || "Your Bonus Title"}
              </h1>
              
              <p className="text-gray-300 max-w-md mx-auto">
                {pageData.description || "Your bonus description will appear here"}
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-w-sm mx-auto">
                <h3 className="font-semibold text-white mb-2">
                  {product?.name || "Product Name"}
                </h3>
                <p className="text-sm text-gray-300 mb-3">
                  Get this exclusive bonus when you purchase through our link
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <ApperIcon name="Clock" className="h-3 w-3" />
                  <span>Limited time offer</span>
                </div>
              </div>
              
              <Button
                style={{ 
                  backgroundColor: pageData.accentColor,
                  color: "white"
                }}
                className="px-8 py-3"
              >
                {pageData.ctaText}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PageBuilder;