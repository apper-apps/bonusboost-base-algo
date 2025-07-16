import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import LoadingSpinner from "@/components/molecules/LoadingSpinner";
import ApperIcon from "@/components/ApperIcon";
import { bonusService } from "@/services/api/bonusService";

const BonusGenerator = ({ product, onBonusesGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [bonuses, setBonuses] = useState([]);
  const [selectedBonuses, setSelectedBonuses] = useState([]);

  useEffect(() => {
    if (product) {
      generateBonuses();
    }
  }, [product]);

  const generateBonuses = async () => {
    if (!product) return;

    setLoading(true);
    try {
      const generatedBonuses = await bonusService.generateBonuses(product.id);
      setBonuses(generatedBonuses);
      onBonusesGenerated(generatedBonuses);
      toast.success(`Generated ${generatedBonuses.length} bonus ideas!`);
    } catch (error) {
      toast.error("Failed to generate bonuses");
    } finally {
      setLoading(false);
    }
  };

  const toggleBonusSelection = (bonusId) => {
    setSelectedBonuses(prev =>
      prev.includes(bonusId)
        ? prev.filter(id => id !== bonusId)
        : [...prev, bonusId]
    );
  };

  const handleCreatePages = () => {
    const selected = bonuses.filter(bonus => selectedBonuses.includes(bonus.id));
    if (selected.length === 0) {
      toast.error("Please select at least one bonus");
      return;
    }
    onBonusesGenerated(selected);
    toast.success(`Creating pages for ${selected.length} bonuses...`);
  };

  if (loading) {
    return (
      <Card className="flex justify-center py-12">
        <LoadingSpinner text="Generating high-value bonuses..." />
      </Card>
    );
  }

  if (!product) {
    return (
      <Card className="text-center py-12">
        <ApperIcon name="Gift" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-300 mb-2">
          Ready to Generate Bonuses
        </h3>
        <p className="text-gray-400">
          Analyze a product first to generate targeted bonuses
        </p>
      </Card>
    );
  }

  return (
    <Card className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <ApperIcon name="Gift" className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Generated Bonuses</h3>
            <p className="text-sm text-gray-400">
              {bonuses.length} high-value bonuses created
            </p>
          </div>
        </div>
        
        <Button
          variant="accent"
          onClick={generateBonuses}
          disabled={loading}
          size="sm"
        >
          <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
          Regenerate
        </Button>
      </div>

      <div className="space-y-4">
        {bonuses.map((bonus, index) => (
          <motion.div
            key={bonus.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
              selectedBonuses.includes(bonus.id)
                ? "border-primary bg-primary/5"
                : "border-gray-600 hover:border-gray-500"
            }`}
            onClick={() => toggleBonusSelection(bonus.id)}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-1 w-4 h-4 rounded border-2 flex items-center justify-center ${
                selectedBonuses.includes(bonus.id)
                  ? "bg-primary border-primary"
                  : "border-gray-500"
              }`}>
                {selectedBonuses.includes(bonus.id) && (
                  <ApperIcon name="Check" className="h-3 w-3 text-white" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-white">{bonus.title}</h4>
                  <Badge variant="accent" size="sm">{bonus.type}</Badge>
                  <Badge variant="secondary" size="sm">{bonus.value}</Badge>
                </div>
                
                <p className="text-sm text-gray-300 mb-3">{bonus.description}</p>
                
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <ApperIcon name="Target" className="h-3 w-3" />
                  <span>Addresses: {bonus.content.targetGap}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {bonuses.length > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <span className="text-sm text-gray-400">
            {selectedBonuses.length} of {bonuses.length} bonuses selected
          </span>
          <Button
            variant="primary"
            onClick={handleCreatePages}
            disabled={selectedBonuses.length === 0}
          >
            Create Pages ({selectedBonuses.length})
          </Button>
        </div>
      )}
    </Card>
  );
};

export default BonusGenerator;