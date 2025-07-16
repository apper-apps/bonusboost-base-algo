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
      toast.success("Redirecting to offer...");
      // Use ctaLink if available, otherwise fallback to affiliate_link
      const redirectUrl = page.ctaLink || page.affiliate_link;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        toast.error("No redirect URL available");
      }
    } catch (error) {
      toast.error("Failed to process request");
    }
  };

  const renderYouTubeEmbed = () => {
    if (!page.youtubeEmbed) return null;
    
    try {
      // Extract video ID from various YouTube URL formats
      const videoId = extractYouTubeVideoId(page.youtubeEmbed);
      if (!videoId) {
        // If it's already an embed code, use it directly
        return (
          <div 
            className="w-full aspect-video rounded-lg overflow-hidden"
            dangerouslySetInnerHTML={{ __html: page.youtubeEmbed }}
          />
        );
      }
      
      return (
        <div className="w-full aspect-video rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    } catch (error) {
      console.error("Error rendering YouTube embed:", error);
      return (
        <div className="w-full aspect-video rounded-lg bg-gray-800 flex items-center justify-center">
          <p className="text-gray-400">Unable to load video</p>
        </div>
      );
    }
  };

  const extractYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const renderBonusExplanations = () => {
    if (!page.bonusExplanations) return null;
    
    try {
      // Try to parse as JSON first
      let explanations;
      if (typeof page.bonusExplanations === 'string') {
        try {
          explanations = JSON.parse(page.bonusExplanations);
        } catch {
          // If not JSON, treat as plain text and split by lines
          explanations = page.bonusExplanations.split('\n').filter(line => line.trim());
        }
      } else {
        explanations = page.bonusExplanations;
      }

      if (!Array.isArray(explanations)) {
        explanations = [explanations];
      }

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {explanations.map((explanation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <ApperIcon name="Gift" className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Bonus #{index + 1}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {typeof explanation === 'string' ? explanation : explanation.description || 'Bonus description'}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );
    } catch (error) {
      console.error("Error rendering bonus explanations:", error);
      return (
        <div className="text-center py-8">
          <p className="text-gray-400">Unable to load bonus details</p>
        </div>
      );
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
      style={{ backgroundColor: page.design?.backgroundColor || '#111827' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Header Section */}
          <div className="text-center space-y-6">
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
            
            {/* Headline */}
            <h1 
              className="text-4xl md:text-6xl font-bold mb-4 gradient-text"
              style={{ color: page.design?.primaryColor || '#6366F1' }}
            >
              {page.headline || page.title || 'Exclusive Bonus Offer'}
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {page.subheadline || page.description || 'Get this amazing bonus when you purchase through our exclusive link'}
            </p>
          </div>

          {/* Product Information Section */}
          <div className="max-w-4xl mx-auto">
<Card className="bg-white/5 backdrop-blur-sm border-white/10">
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
          </div>

          {/* YouTube Embed Section */}
          {page.youtubeEmbed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Play" className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-white">Watch the Demo</h3>
                  </div>
                  {renderYouTubeEmbed()}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Bonus Explanations Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                What's Included in Your Bonus Package
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Each bonus is carefully crafted to maximize your success and provide immediate value
              </p>
            </div>
            {renderBonusExplanations()}
          </motion.div>

          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center space-y-6"
          >
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-gray-400 mb-6">
                Click the button below to claim your exclusive bonus package
              </p>
            </div>
            
            <Button
              onClick={handleClaimBonus}
              size="xl"
              className="px-12 py-4 text-lg font-semibold shadow-glow-accent hover:shadow-glow-accent transform hover:scale-105 transition-all duration-300"
              style={{ 
                backgroundColor: page.design?.accentColor || '#10B981',
                color: "white"
              }}
            >
              <ApperIcon name="Gift" className="h-5 w-5 mr-2" />
              {page.cta_text || "Claim Your Bonus Now"}
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <ApperIcon name="Shield" className="h-3 w-3" />
              <span>Secure checkout • 30-day money-back guarantee</span>
            </div>
          </motion.div>
{/* How It Works Section */}
<Card className="bg-white/5 backdrop-blur-sm border-white/10 max-w-4xl mx-auto">
            <div className="text-center space-y-6">
              <h4 className="text-xl font-semibold text-white">How It Works</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                    <span className="text-lg font-bold text-white">1</span>
                  </div>
                  <h5 className="font-medium text-white">Purchase</h5>
                  <p className="text-sm text-gray-300">
                    Click the button above to purchase the main product
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                    <span className="text-lg font-bold text-white">2</span>
                  </div>
                  <h5 className="font-medium text-white">Complete</h5>
                  <p className="text-sm text-gray-300">
                    Complete your purchase on the secure checkout page
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                    <span className="text-lg font-bold text-white">3</span>
                  </div>
                  <h5 className="font-medium text-white">Receive</h5>
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