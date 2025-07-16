import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import salesPageService from "@/services/api/salesPageService";
import chargeService from "@/services/api/chargeService";

const SalesPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [pricingTiers, setPricingTiers] = useState([]);

  useEffect(() => {
    const loadSalesData = async () => {
      try {
        setLoading(true);
        const [salesResponse, pricingResponse] = await Promise.all([
          salesPageService.getAll(),
          chargeService.getAll()
        ]);
        
        if (salesResponse.length > 0) {
          setSalesData(salesResponse[0]);
        }
        setPricingTiers(pricingResponse);
      } catch (err) {
        console.error("Error loading sales data:", err);
        setError("Failed to load sales page data");
      } finally {
        setLoading(false);
      }
    };

    loadSalesData();
  }, []);

  const handlePurchase = async (tier) => {
    if (!user) {
      toast.info("Please login to purchase");
      navigate("/login");
      return;
    }

    try {
      toast.success(`Processing purchase for ${tier.description}...`);
      // In a real implementation, this would integrate with a payment processor
      console.log("Purchase initiated for:", tier);
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("Purchase failed. Please try again.");
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="loading flex items-center justify-center p-6">
          <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4"></path>
            <path d="m16.2 7.8 2.9-2.9"></path>
            <path d="M18 12h4"></path>
            <path d="m16.2 16.2 2.9 2.9"></path>
            <path d="M12 18v4"></path>
            <path d="m4.9 19.1 2.9-2.9"></path>
            <path d="M2 12h4"></path>
            <path d="m4.9 4.9 2.9 2.9"></path>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold gradient-text">BonusBoost</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">Back to Home</Button>
              </Link>
              {user ? (
                <Link to="/dashboard">
                  <Button variant="primary" size="sm">Dashboard</Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="primary" size="sm">Login</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Are You </span>
              <span className="gradient-text-accent">Tired of Losing</span>
              <br />
              <span className="text-white">Commissions to Competitors</span>
              <br />
              <span className="gradient-text">With Better Bonuses?</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Finally, a proven system that transforms struggling affiliate marketers into commission-dominating machines in just 60 minutes...
            </p>

            <div className="bg-gradient-surface border border-gray-700 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">The Harsh Reality Most Affiliates Face:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <ApperIcon name="X" size={20} className="text-red-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">Spending weeks creating mediocre bonuses that nobody wants</span>
                  </div>
                  <div className="flex items-start">
                    <ApperIcon name="X" size={20} className="text-red-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">Watching competitors with better bonuses steal your commissions</span>
                  </div>
                  <div className="flex items-start">
                    <ApperIcon name="X" size={20} className="text-red-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">Feeling overwhelmed by the technical side of creating professional pages</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <ApperIcon name="X" size={20} className="text-red-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">Struggling to stand out in crowded affiliate campaigns</span>
                  </div>
                  <div className="flex items-start">
                    <ApperIcon name="X" size={20} className="text-red-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">Missing out on thousands in potential commissions every month</span>
                  </div>
                  <div className="flex items-start">
                    <ApperIcon name="X" size={20} className="text-red-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">Feeling like you're always one step behind the "big players"</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Agitation Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">What If I Told You That </span>
              <span className="gradient-text-accent">ONE Simple Change</span>
              <br />
              <span className="text-white">Could Transform Your Entire Business?</span>
            </h2>
            
            <div className="bg-gradient-surface border border-gray-700 rounded-2xl p-8 text-left max-w-4xl mx-auto">
              <p className="text-lg text-gray-300 mb-6">
                <strong className="text-white">Here's the truth:</strong> The difference between affiliates making $500/month and those making $50,000/month isn't talent, experience, or even the products they promote...
              </p>
              
              <p className="text-lg text-gray-300 mb-6">
                <strong className="text-accent">It's their bonuses.</strong>
              </p>
              
              <p className="text-lg text-gray-300 mb-6">
                While you're struggling to create decent bonuses, top affiliates are using professional, high-converting bonus pages that make prospects feel like they'd be CRAZY not to buy through their link.
              </p>
              
              <p className="text-lg text-gray-300">
                And now, for the first time ever, you can have access to the exact same system they use...
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="gradient-text">Introducing BonusBoost:</span>
              <br />
              <span className="text-white">The Only System You Need to</span>
              <br />
              <span className="gradient-text-accent">Dominate Any Affiliate Campaign</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto">
              BonusBoost is the AI-powered system that creates professional, high-converting bonuses and bonus pages in under 60 minutes - giving you the unfair advantage you need to outperform even the most experienced affiliates.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {[
              {
                icon: "Zap",
                title: "60-Minute Bonus Creation",
                description: "Create professional bonuses that would normally take weeks, in just one hour."
              },
              {
                icon: "Target",
                title: "Conversion-Optimized Pages",
                description: "Every page is designed using proven psychological triggers that maximize conversions."
              },
              {
                icon: "Rocket",
                title: "Instant Publishing",
                description: "One-click publishing means your bonus pages are live and ready to convert immediately."
              },
              {
                icon: "BarChart3",
                title: "Performance Analytics",
                description: "Track exactly which bonuses are bringing in the most commissions."
              },
              {
                icon: "Users",
                title: "List Building Integration",
                description: "Build your email list while promoting affiliate products for maximum long-term value."
              },
              {
                icon: "Shield",
                title: "Professional Credibility",
                description: "Look like a 7-figure affiliate marketer, even if you're just starting out."
              }
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={feature.icon} size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Real Results From Real Affiliates</span>
              <br />
              <span className="gradient-text-accent">Who Transformed Their Business</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {[
              {
                name: "Sarah Mitchell",
                role: "Former Struggling Affiliate",
                result: "$47K in commissions last month",
                text: "I was making maybe $500/month before BonusBoost. Last month I made $47,000 in commissions. This system literally changed my life.",
                image: "👩‍💼"
              },
              {
                name: "Mike Rodriguez",
                role: "Part-time Affiliate Marketer",
                result: "340% increase in conversions",
                text: "My conversion rate went from 2% to 8.8% overnight. I'm now the #1 affiliate for three different products in my niche.",
                image: "👨‍💻"
              },
              {
                name: "Jennifer Chen",
                role: "New Affiliate Marketer",
                result: "First $10K month in 30 days",
                text: "I had zero experience with affiliate marketing. BonusBoost made me look like a pro from day one. Hit my first $10K month in just 30 days.",
                image: "👩‍🎓"
              },
              {
                name: "David Thompson",
                role: "Experienced Marketer",
                result: "Doubled income in 2 months",
                text: "I thought I knew everything about affiliate marketing. BonusBoost showed me I was leaving money on the table. Doubled my income in 2 months.",
                image: "👨‍💼"
              },
              {
                name: "Lisa Johnson",
                role: "Former 9-5 Employee",
                result: "Quit job, now full-time affiliate",
                text: "BonusBoost gave me the confidence to quit my job. I'm now making more in a week than I used to make in a month.",
                image: "👩‍🚀"
              },
              {
                name: "Robert Kim",
                role: "Retired Teacher",
                result: "Supplemental income turned career",
                text: "Started as supplemental income for retirement. Now I'm making more than I ever did teaching, working half the hours.",
                image: "👨‍🏫"
              }
            ].map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{testimonial.image}</div>
                    <div className="text-2xl font-bold text-accent mb-1">{testimonial.result}</div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.text}"</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="bg-gradient-surface border border-gray-700 rounded-2xl p-8 text-center"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="text-white">But Here's the Thing...</span>
              <br />
              <span className="gradient-text-accent">Time Is Running Out</span>
            </h2>
            
            <p className="text-lg text-gray-300 mb-6">
              Every day you wait is another day your competitors are stealing commissions that should be yours. While you're struggling with mediocre bonuses, they're using professional systems like BonusBoost to dominate every campaign.
            </p>
            
            <p className="text-lg text-gray-300 mb-6">
              <strong className="text-accent">The question isn't whether you can afford BonusBoost...</strong>
            </p>
            
            <p className="text-xl font-bold text-white">
              The question is: Can you afford to keep losing commissions to competitors who have it?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Choose Your </span>
              <span className="gradient-text-accent">Commission-Dominating</span>
              <br />
              <span className="text-white">Package</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Each package is designed to transform your affiliate business, no matter what level you're at.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {/* Starter Package */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full relative">
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-400 mb-2">STARTER</div>
                  <div className="text-4xl font-bold text-white mb-2">$67</div>
                  <div className="text-sm text-gray-400">One-time payment</div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-lg font-semibold text-accent mb-2">10 Product Pages/Month</div>
                  <div className="text-sm text-gray-400">For Life</div>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">10 professional bonus pages monthly</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">AI-powered copywriting</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">Mobile-optimized pages</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">Basic analytics</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">Email support</span>
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-400 mb-2">Perfect for:</div>
                  <div className="text-white">New affiliates testing the waters</div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={() => handlePurchase({ description: "Starter Package", price: 67, limitsOfUse: "10 product pages per month for life" })}
                >
                  Get Started Now
                </Button>
              </Card>
            </motion.div>

            {/* Professional Package */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full relative border-2 border-accent">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-400 mb-2">PROFESSIONAL</div>
                  <div className="text-4xl font-bold text-white mb-2">$99</div>
                  <div className="text-sm text-gray-400">One-time payment</div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-lg font-semibold text-accent mb-2">20 Product Pages/Month</div>
                  <div className="text-sm text-gray-400">For Life</div>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">20 professional bonus pages monthly</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">AI-powered copywriting</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">Mobile-optimized pages</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">Advanced analytics & tracking</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">Priority email support</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">Custom branding options</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">A/B testing capabilities</span>
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-400 mb-2">Perfect for:</div>
                  <div className="text-white">Serious affiliates ready to scale</div>
                </div>
                
                <Button 
                  variant="accent" 
                  size="lg" 
                  className="w-full glow-accent"
                  onClick={() => handlePurchase({ description: "Professional Package", price: 99, limitsOfUse: "20 product pages per month for life" })}
                >
                  Start Dominating Now
                </Button>
              </Card>
            </motion.div>

            {/* Enterprise Package */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full relative">
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-400 mb-2">ENTERPRISE</div>
                  <div className="text-4xl font-bold text-white mb-2">$197</div>
                  <div className="text-sm text-gray-400">One-time payment</div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-lg font-semibold text-accent mb-2">UNLIMITED</div>
                  <div className="text-sm text-gray-400">Forever</div>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">Unlimited bonus pages</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">AI-powered copywriting</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">Mobile-optimized pages</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">Advanced analytics & tracking</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">Priority email support</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">Full custom branding</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">Advanced A/B testing</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">White-label rights</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-accent mr-3" />
                    <span className="text-gray-300">1-on-1 strategy session</span>
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-400 mb-2">Perfect for:</div>
                  <div className="text-white">Elite affiliates & agencies</div>
                </div>
                
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full glow-primary"
                  onClick={() => handlePurchase({ description: "Enterprise Package", price: 197, limitsOfUse: "Unlimited product pages for life" })}
                >
                  Go Unlimited Now
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Value Justification Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="bg-gradient-surface border border-gray-700 rounded-2xl p-8"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
              <span className="text-white">Let's Do Some </span>
              <span className="gradient-text-accent">Quick Math</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">WITHOUT BonusBoost:</h3>
                <div className="space-y-2 text-gray-300">
                  <div>• 20+ hours creating one decent bonus</div>
                  <div>• $50-100/hour for professional design</div>
                  <div>• $200-500 for copywriting</div>
                  <div>• Technical headaches and frustration</div>
                  <div>• Missed opportunities = Lost commissions</div>
                </div>
                <div className="mt-4 p-4 bg-red-900/20 border border-red-500 rounded-lg">
                  <div className="text-red-400 font-bold">Total Cost: $500-1000+ per bonus</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-4">WITH BonusBoost:</h3>
                <div className="space-y-2 text-gray-300">
                  <div>• 60 minutes for professional bonus page</div>
                  <div>• AI-powered copywriting included</div>
                  <div>• Professional design templates</div>
                  <div>• Zero technical knowledge required</div>
                  <div>• Immediate results and conversions</div>
                </div>
                <div className="mt-4 p-4 bg-green-900/20 border border-green-500 rounded-lg">
                  <div className="text-green-400 font-bold">Total Cost: $67-197 one-time</div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-lg text-gray-300 mb-4">
                <strong className="text-accent">BonusBoost pays for itself with just ONE successful campaign.</strong>
              </p>
              <p className="text-white">
                If you make even one extra commission this month, you've already made your money back.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Your </span>
              <span className="gradient-text-accent">Commission-Dominating</span>
              <br />
              <span className="text-white">Future Starts Now</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Every second you hesitate is another commission lost to a competitor with better bonuses. Don't let another day pass watching others succeed while you struggle.
            </p>
            
            <div className="bg-gradient-surface border border-gray-700 rounded-2xl p-8 mb-8">
              <p className="text-lg text-gray-300 mb-4">
                <strong className="text-white">Remember:</strong> The affiliates making 6-7 figures aren't necessarily smarter or more experienced than you...
              </p>
              <p className="text-xl font-bold text-accent">
                They just have better bonuses.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="accent" 
                size="xl" 
                className="glow-accent"
                onClick={() => handlePurchase({ description: "Professional Package", price: 99, limitsOfUse: "20 product pages per month for life" })}
              >
                <ApperIcon name="Rocket" size={20} className="mr-2" />
                Start Dominating Now - $99
              </Button>
              <Button 
                variant="primary" 
                size="xl" 
                className="glow-primary"
                onClick={() => handlePurchase({ description: "Enterprise Package", price: 197, limitsOfUse: "Unlimited product pages for life" })}
              >
                <ApperIcon name="Crown" size={20} className="mr-2" />
                Go Unlimited - $197
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text mb-4">BonusBoost</div>
            <p className="text-gray-400">
              © 2024 BonusBoost. All rights reserved. Terms of Service | Privacy Policy
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SalesPage;