import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { bonusPageService } from "@/services/api/bonusPageService";

const BonusPageView = () => {
  const { id } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPage();
  }, [id]);

  const loadPage = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const pageData = await bonusPageService.getById(id);
      setPage(pageData);
      // Track page view
      await bonusPageService.trackView(id);
    } catch (err) {
      setError("Failed to load bonus page");
    } finally {
      setLoading(false);
    }
  };

  const handleClaimBonus = async () => {
    try {
      await bonusPageService.trackClick(id);
      toast.success("Redirecting to product page...");
      // Redirect to affiliate link
      window.location.href = page.affiliateLink;
    } catch (error) {
      toast.error("Failed to process request");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loading text="Loading bonus page..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Error message={error} onRetry={loadPage} />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="text-center py-12">
          <ApperIcon name="FileX" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
          <p className="text-gray-400">The bonus page you're looking for doesn't exist.</p>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: page.design.backgroundColor }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block p-4 bg-white/10 rounded-full backdrop-blur-sm"
            >
              <ApperIcon name="Gift" className="h-16 w-16 text-white" />
            </motion.div>
            
            <Badge variant="accent" size="lg" className="mb-4">
              🎁 Exclusive Bonus
            </Badge>
            
            <h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: page.design.primaryColor }}
            >
              {page.title}
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {page.description}
            </p>
          </div>

          <Card className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm border-white/10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ApperIcon name="Package" className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-white">
                    Main Product: {page.productName || "Featured Product"}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Get this exclusive bonus when you purchase through our link
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <ApperIcon name="Clock" className="h-4 w-4 text-warning" />
                  <span className="text-sm font-medium text-warning">
                    Limited Time Offer
                  </span>
                </div>
                <p className="text-sm text-gray-300">
                  This bonus is only available for a limited time. 
                  Purchase the main product now to unlock this exclusive bonus.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-white">What You'll Get:</h4>
                <ul className="text-left space-y-2">
                  <li className="flex items-start gap-2">
                    <ApperIcon name="Check" className="h-4 w-4 text-accent mt-0.5" />
                    <span className="text-sm text-gray-300">
                      Complete bonus package worth $297
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ApperIcon name="Check" className="h-4 w-4 text-accent mt-0.5" />
                    <span className="text-sm text-gray-300">
                      Step-by-step implementation guide
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ApperIcon name="Check" className="h-4 w-4 text-accent mt-0.5" />
                    <span className="text-sm text-gray-300">
                      Exclusive templates and resources
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ApperIcon name="Check" className="h-4 w-4 text-accent mt-0.5" />
                    <span className="text-sm text-gray-300">
                      Lifetime access and updates
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <Button
              onClick={handleClaimBonus}
              size="xl"
              className="px-12 py-4 text-lg font-semibold shadow-glow-accent hover:shadow-glow-accent"
              style={{ 
                backgroundColor: page.design.accentColor,
                color: "white"
              }}
            >
              <ApperIcon name="Gift" className="h-5 w-5 mr-2" />
              {page.ctaText || "Claim Your Bonus Now"}
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <ApperIcon name="Shield" className="h-3 w-3" />
              <span>Secure checkout • 30-day money-back guarantee</span>
            </div>
          </motion.div>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <div className="text-center space-y-3">
              <h4 className="font-semibold text-white">How It Works</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Click the button above to purchase the main product
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Complete your purchase on the secure checkout page
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Receive your exclusive bonus within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BonusPageView;