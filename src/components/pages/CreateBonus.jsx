import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProductAnalyzer from "@/components/organisms/ProductAnalyzer";
import BonusGenerator from "@/components/organisms/BonusGenerator";
import PageBuilder from "@/components/organisms/PageBuilder";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const CreateBonus = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [product, setProduct] = useState(null);
  const [bonuses, setBonuses] = useState([]);
  const [selectedBonus, setSelectedBonus] = useState(null);
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: "Analyze Product", icon: "Search" },
    { id: 2, title: "Generate Bonuses", icon: "Gift" },
    { id: 3, title: "Build Pages", icon: "Palette" }
  ];

  const handleProductAnalysis = (analysisResult) => {
    setProduct(analysisResult);
    setCurrentStep(2);
  };

  const handleBonusGeneration = (generatedBonuses) => {
    setBonuses(generatedBonuses);
    if (generatedBonuses.length > 0) {
      setSelectedBonus(generatedBonuses[0]);
      setCurrentStep(3);
    }
  };

  const handlePageCreated = (page) => {
    navigate("/pages", { state: { newPage: page } });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProductAnalyzer onAnalysisComplete={handleProductAnalysis} />
        );
      case 2:
        return (
          <BonusGenerator
            product={product}
            onBonusesGenerated={handleBonusGeneration}
          />
        );
      case 3:
        return (
          <PageBuilder
            bonus={selectedBonus}
            product={product}
            onPageCreated={handlePageCreated}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Create Bonus</h1>
          <p className="text-gray-400 mt-2">
            Generate AI-powered bonuses that outshine any product
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

      <div className="flex justify-center">
        <div className="flex items-center gap-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.id
                    ? "bg-primary border-primary text-white"
                    : "border-gray-600 text-gray-400"
                }`}
              >
                {currentStep > step.id ? (
                  <ApperIcon name="Check" className="h-5 w-5" />
                ) : (
                  <ApperIcon name={step.icon} className="h-5 w-5" />
                )}
              </div>
              
              <div className="ml-3 hidden sm:block">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? "text-primary" : "text-gray-400"
                }`}>
                  Step {step.id}
                </p>
                <p className={`text-xs ${
                  currentStep >= step.id ? "text-white" : "text-gray-500"
                }`}>
                  {step.title}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-4 ${
                  currentStep > step.id ? "bg-primary" : "bg-gray-600"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderStepContent()}
      </motion.div>

      {bonuses.length > 0 && currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface/50 rounded-lg p-4"
        >
          <h4 className="font-medium text-white mb-3">Available Bonuses</h4>
          <div className="flex flex-wrap gap-2">
            {bonuses.map((bonus) => (
              <Button
                key={bonus.id}
                variant={selectedBonus?.id === bonus.id ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedBonus(bonus)}
              >
                {bonus.title}
              </Button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CreateBonus;