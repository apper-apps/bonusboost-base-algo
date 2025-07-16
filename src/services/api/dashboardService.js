import { bonusService } from "./bonusService";
import { bonusPageService } from "./bonusPageService";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const dashboardService = {
  async getStats() {
    await delay(500);
    
    const [bonuses, pages] = await Promise.all([
      bonusService.getAll(),
      bonusPageService.getAll()
    ]);

    const totalViews = pages.reduce((sum, page) => sum + (page.views || 0), 0);
    const totalClicks = pages.reduce((sum, page) => sum + (page.clicks || 0), 0);
    const conversionRate = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : 0;

    return {
      totalBonuses: bonuses.length,
      activePages: pages.filter(p => p.status === "active").length,
      totalViews,
      conversionRate: parseFloat(conversionRate)
    };
  },

  async getRecentActivity() {
    await delay(300);
    
    const activities = [
      {
        id: 1,
        type: "bonus_created",
        description: "Created new bonus: P.E.A Profit Multiplier Toolkit",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        type: "page_created",
        description: "Published bonus page: 5-Day Cash Machine Course",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        type: "page_viewed",
        description: "Bonus page viewed 15 times",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 4,
        type: "click_tracked",
        description: "Affiliate link clicked 3 times",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
      }
    ];

    return activities;
  }
};