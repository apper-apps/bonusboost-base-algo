import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import LoadingSpinner from "@/components/molecules/LoadingSpinner";
import ApperIcon from "@/components/ApperIcon";
import { bonusService } from "@/services/api/bonusService";
import { videoTrainingScriptService } from "@/services/api/videoTrainingScriptService";

const BonusGenerator = ({ product, onBonusesGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [bonuses, setBonuses] = useState([]);
  const [selectedBonuses, setSelectedBonuses] = useState([]);

  useEffect(() => {
    if (product) {
      generateBonuses();
    }
  }, [product]);

const generateVideoTrainingScript = (bonus) => {
    const scriptTemplates = {
      "Templates": `
**Video Training Script: Maximizing Your ${bonus.title}**

INTRO (0-30 seconds):
"Welcome to your exclusive video training for the ${bonus.title}! This bonus is specifically designed to amplify your results from the main product by addressing ${bonus.content.targetGap}. By the end of this training, you'll know exactly how to implement these templates for maximum impact."

MAIN CONTENT (30 seconds - 8 minutes):
"Let's dive into the three core components of your ${bonus.title}:

1. **${bonus.content.components[0]}** - I'll show you exactly how to customize these for your specific product promotion
2. **${bonus.content.components[1]}** - Step-by-step implementation guide with real examples
3. **${bonus.content.components[2]}** - Advanced strategies to maximize your conversion rates

[SCREEN SHARE DEMONSTRATION]
I'm going to walk you through each template, showing you exactly where to make changes and how to adapt them for your specific product..."

CLOSING (8-10 minutes):
"Remember, these templates are designed to work hand-in-hand with your main product. The key is consistent implementation. Your next step is to download the templates and start customizing them for your first campaign."`,

      "Training": `
**Video Training Script: ${bonus.title} Implementation Guide**

INTRO (0-45 seconds):
"Welcome to your exclusive ${bonus.title}! This training is specifically designed to complement your main product and help you overcome ${bonus.content.targetGap}. What you're about to learn will transform how you approach affiliate marketing."

MAIN CONTENT (45 seconds - 12 minutes):
"This training covers three critical areas:

MODULE 1: **${bonus.content.components[0]}** (Minutes 1-4)
- Core principles and strategies
- Real-world examples and case studies
- Common mistakes to avoid

MODULE 2: **${bonus.content.components[1]}** (Minutes 4-8)
- Implementation roadmap
- Tools and resources you'll need
- Step-by-step action plan

MODULE 3: **${bonus.content.components[2]}** (Minutes 8-12)
- Advanced optimization techniques
- Scaling strategies
- Performance tracking methods

[LIVE DEMONSTRATION]
Let me show you exactly how to implement these strategies..."

CLOSING (12-15 minutes):
"Your main product gave you the foundation, and this training gives you the advanced strategies to scale. Take action on what you've learned today, and I'll see you in the next module."`
    };

    return scriptTemplates[bonus.type] || scriptTemplates["Templates"];
  };

  const generateBonuses = async () => {
    if (!product) return;

    setLoading(true);
    try {
      const generatedBonuses = await bonusService.generateBonuses(product.id);
      
      // Generate video training scripts for each bonus
      const bonusesWithTraining = generatedBonuses.map(bonus => ({
        ...bonus,
        videoTrainingScript: generateVideoTrainingScript(bonus),
        hasVideoTraining: true
      }));
      
      setBonuses(bonusesWithTraining);
      onBonusesGenerated(bonusesWithTraining);
      toast.success(`Generated ${bonusesWithTraining.length} bonus ideas with video training scripts!`);
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
        <LoadingSpinner text="Generating high-value bonuses and video training scripts..." />
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
<h3 className="text-lg font-semibold text-white">Generated Bonuses & Video Training</h3>
            <p className="text-sm text-gray-400">
              {bonuses.length} high-value bonuses with video training scripts
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
                  {bonus.hasVideoTraining && (
                    <Badge variant="primary" size="sm">
                      <ApperIcon name="Video" className="h-3 w-3 mr-1" />
                      Video Training
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-gray-300 mb-3">{bonus.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <ApperIcon name="Target" className="h-3 w-3" />
                    <span>Addresses: {bonus.content.targetGap}</span>
                  </div>
                  
                  {bonus.hasVideoTraining && (
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <ApperIcon name="Play" className="h-3 w-3" />
                      <span>Includes comprehensive video training script</span>
                    </div>
                  )}
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