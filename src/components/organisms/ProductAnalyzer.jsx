import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import LoadingSpinner from "@/components/molecules/LoadingSpinner";
import ApperIcon from "@/components/ApperIcon";
import { productService } from "@/services/api/productService";

const ProductAnalyzer = ({ onAnalysisComplete }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      toast.error("Please enter a product URL");
      return;
    }

    setLoading(true);
    try {
      const result = await productService.analyzeProduct(url);
      setAnalysis(result);
      onAnalysisComplete(result);
      toast.success("Product analyzed successfully!");
    } catch (error) {
      toast.error("Failed to analyze product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <ApperIcon name="Search" className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Product Analysis</h3>
          <p className="text-sm text-gray-400">
            Enter a product URL to analyze and generate bonuses
          </p>
        </div>
      </div>

      <FormField
        label="Product URL"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/product"
        className="mb-4"
      />

      <Button
        onClick={handleAnalyze}
        disabled={loading}
        loading={loading}
        className="w-full"
      >
        {loading ? "Analyzing..." : "Analyze Product"}
      </Button>

      {loading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner text="Analyzing product features..." />
        </div>
      )}

      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-surface/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Product: {analysis.name}</h4>
            <p className="text-sm text-gray-300 mb-3">{analysis.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-accent mb-2">Key Features</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  {analysis.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ApperIcon name="Check" className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-warning mb-2">Identified Gaps</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  {analysis.gaps.map((gap, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ApperIcon name="AlertTriangle" className="h-3 w-3 text-warning mt-0.5 flex-shrink-0" />
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </Card>
  );
};

export default ProductAnalyzer;