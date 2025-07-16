import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const LandingPage = () => {
  const features = [
    {
      icon: "Zap",
      title: "Lightning-Fast Bonus Creation",
      description: "Create professional, high-converting bonuses in under 60 minutes with our AI-powered templates and automation tools."
    },
    {
      icon: "Globe",
      title: "Shareable Bonus Pages",
      description: "Generate stunning, mobile-optimized bonus pages that you can share across any platform or embed directly into your campaigns."
    },
    {
      icon: "Target",
      title: "Conversion-Optimized Design",
      description: "Every bonus page is designed with proven conversion principles to maximize your affiliate commissions and audience engagement."
    },
    {
      icon: "Rocket",
      title: "Instant Publishing",
      description: "Publish your bonus pages instantly with our one-click hosting solution. No technical skills required."
    },
    {
      icon: "BarChart3",
      title: "Performance Analytics",
      description: "Track views, engagement, and conversions with detailed analytics to optimize your bonus strategy."
    },
    {
      icon: "Users",
      title: "Audience Building",
      description: "Capture leads and build your email list with integrated opt-in forms and lead magnets."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Affiliate Marketing Expert",
      text: "BonusBoost transformed my affiliate business overnight. I'm now creating bonuses that consistently outperform the main product offers!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Digital Marketer",
      text: "The time I save with BonusBoost allows me to focus on what matters - promoting and selling. My conversion rates increased by 340%!",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Online Entrepreneur",
      text: "I was skeptical at first, but BonusBoost delivers. My bonus pages now look more professional than most vendor sales pages.",
      rating: 5
    }
  ];

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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold gradient-text">BonusBoost</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <Button variant="primary" size="sm">
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6"
              variants={fadeInUp}
            >
              <span className="gradient-text">Dominate Affiliate Marketing</span>
              <br />
              <span className="text-white">with Bonuses That</span>
              <br />
              <span className="gradient-text-accent">Outshine Any Product!</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto"
              variants={fadeInUp}
            >
              Create High-Value Bonuses and Shareable Bonus Pages in Under 60 Minutes with BonusBoost
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              variants={fadeInUp}
            >
              <Button variant="primary" size="xl" className="glow-primary">
                <ApperIcon name="Rocket" size={20} className="mr-2" />
                Get Started Now
              </Button>
              <Button variant="outline" size="xl">
                <ApperIcon name="Play" size={20} className="mr-2" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              className="relative mx-auto max-w-4xl"
              variants={fadeInUp}
            >
              <div className="relative bg-gradient-surface rounded-2xl p-8 shadow-premium-lg border border-gray-700">
                <div className="text-center">
                  <ApperIcon name="Monitor" size={200} className="mx-auto text-primary opacity-50" />
                  <p className="text-gray-400 mt-4">BonusBoost Dashboard Preview</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="gradient-text">Everything You Need</span>
              <br />
              <span className="text-white">to Crush Your Competition</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stop losing commissions to competitors with better bonuses. BonusBoost gives you the unfair advantage you need.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-4">
                      <ApperIcon name={feature.icon} size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Join </span>
              <span className="gradient-text-accent">10,000+ Affiliates</span>
              <br />
              <span className="text-white">Already Crushing It</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <ApperIcon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {[
              { number: "10,000+", label: "Active Users" },
              { number: "50,000+", label: "Bonuses Created" },
              { number: "340%", label: "Avg. Conversion Increase" },
              { number: "60min", label: "Average Creation Time" }
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Ready to </span>
              <span className="gradient-text-accent">Dominate</span>
              <span className="text-white"> Your Niche?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of affiliates who are already using BonusBoost to create irresistible bonuses that convert like crazy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="xl" className="glow-primary">
                <ApperIcon name="Rocket" size={20} className="mr-2" />
                Start Your Free Trial
              </Button>
              <Button variant="outline" size="xl">
                <ApperIcon name="MessageCircle" size={20} className="mr-2" />
                Talk to Sales
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

export default LandingPage;