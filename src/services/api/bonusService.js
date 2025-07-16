import mockBonuses from "@/services/mockData/bonuses.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const bonusService = {
  async generateBonuses(productId) {
    await delay(3000);
    
    const bonusTemplates = [
      {
        title: "P.E.A Profit Multiplier Toolkit",
        type: "Templates",
        value: "$297",
        description: "Pre-built automation templates that amplify your P.E.A Blueprint results by 300%",
        content: {
          targetGap: "No pre-built email sequences",
          components: ["Email templates", "Landing pages", "Follow-up sequences"]
        }
      },
      {
        title: "5-Day Affiliate Cash Machine Course",
        type: "Training",
        value: "$497",
        description: "Exclusive video training that turns the commission system into a 24/7 profit machine",
        content: {
          targetGap: "Limited bonus creation tools",
          components: ["Video modules", "Workbooks", "Action plans"]
        }
      },
      {
        title: "Social Media Domination Pack",
        type: "Templates",
        value: "$197",
        description: "Ready-to-use social media templates that drive massive traffic to your affiliate offers",
        content: {
          targetGap: "No social media templates",
          components: ["Post templates", "Story templates", "Ad creatives"]
        }
      },
      {
        title: "Conversion Optimization Masterclass",
        type: "Training",
        value: "$397",
        description: "Advanced strategies to double your conversion rates using psychological triggers",
        content: {
          targetGap: "Missing conversion optimization guides",
          components: ["Video training", "Checklists", "Split-test templates"]
        }
      },
      {
        title: "High-Converting Funnel Blueprint",
        type: "Templates",
        value: "$697",
        description: "Proven funnel templates that convert cold traffic into buying customers",
        content: {
          targetGap: "No advanced funnel templates",
          components: ["Funnel templates", "Copy templates", "Design assets"]
        }
      }
    ];

    const generatedBonuses = bonusTemplates.slice(0, 3).map((template, index) => ({
      id: `bonus_${Date.now()}_${index}`,
      productId,
      ...template,
      createdAt: new Date().toISOString()
    }));

    return generatedBonuses;
  },

  async getAll() {
    await delay(300);
    return mockBonuses;
  },

  async getById(id) {
    await delay(300);
    return mockBonuses.find(bonus => bonus.Id === parseInt(id));
  },

  async create(bonus) {
    await delay(500);
    const newBonus = {
      ...bonus,
      Id: Math.max(...mockBonuses.map(b => b.Id)) + 1,
      createdAt: new Date().toISOString()
    };
    mockBonuses.push(newBonus);
    return newBonus;
  },

  async update(id, updates) {
    await delay(500);
    const index = mockBonuses.findIndex(bonus => bonus.Id === parseInt(id));
    if (index === -1) throw new Error("Bonus not found");
    
    mockBonuses[index] = { ...mockBonuses[index], ...updates };
    return mockBonuses[index];
  },

  async delete(id) {
    await delay(300);
    const index = mockBonuses.findIndex(bonus => bonus.Id === parseInt(id));
    if (index === -1) throw new Error("Bonus not found");
    
    mockBonuses.splice(index, 1);
    return true;
  }
};