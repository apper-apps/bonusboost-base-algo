import { bonusPageService } from "./bonusPageService";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const analyticsService = {
  async getAnalytics(dateRange = "7days") {
    await delay(800);
    
    const pages = await bonusPageService.getAll();
    
    const totalViews = pages.reduce((sum, page) => sum + (page.views || 0), 0);
    const totalClicks = pages.reduce((sum, page) => sum + (page.clicks || 0), 0);
    const totalConversions = pages.reduce((sum, page) => sum + (page.conversions || 0), 0);
    const conversionRate = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : 0;
    const revenue = totalConversions * 47; // Average commission

    // Generate chart data
    const chartData = [
      {
        name: "Views",
        data: [
          { x: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).getTime(), y: 45 },
          { x: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).getTime(), y: 52 },
          { x: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).getTime(), y: 38 },
          { x: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).getTime(), y: 67 },
          { x: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).getTime(), y: 49 },
          { x: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).getTime(), y: 73 },
          { x: new Date().getTime(), y: 61 }
        ]
      },
      {
        name: "Clicks",
        data: [
          { x: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).getTime(), y: 12 },
          { x: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).getTime(), y: 15 },
          { x: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).getTime(), y: 9 },
          { x: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).getTime(), y: 18 },
          { x: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).getTime(), y: 13 },
          { x: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).getTime(), y: 21 },
          { x: new Date().getTime(), y: 16 }
        ]
      },
      {
        name: "Conversions",
        data: [
          { x: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).getTime(), y: 2 },
          { x: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).getTime(), y: 3 },
          { x: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).getTime(), y: 1 },
          { x: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).getTime(), y: 4 },
          { x: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).getTime(), y: 2 },
          { x: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).getTime(), y: 5 },
          { x: new Date().getTime(), y: 3 }
        ]
      }
    ];

    const topPages = pages
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5)
      .map(page => ({
        id: page.id,
        title: page.title,
        views: page.views || 0,
        clicks: page.clicks || 0,
        conversionRate: page.views > 0 ? ((page.clicks / page.views) * 100).toFixed(1) : 0
      }));

    const recentActivity = [
      {
        id: 1,
        pageTitle: "P.E.A Profit Multiplier Toolkit",
        action: "view",
        timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        source: "Direct"
      },
      {
        id: 2,
        pageTitle: "5-Day Cash Machine Course",
        action: "click",
        timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        source: "Facebook"
      },
      {
        id: 3,
        pageTitle: "Social Media Domination Pack",
        action: "view",
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        source: "Email"
      },
      {
        id: 4,
        pageTitle: "Conversion Optimization Masterclass",
        action: "click",
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        source: "Twitter"
      }
    ];

    return {
      totalViews,
      totalClicks,
      conversionRate: parseFloat(conversionRate),
      revenue,
      chartData,
      topPages,
      recentActivity
    };
  }
};