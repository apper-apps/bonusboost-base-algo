import mockBonusPages from "@/services/mockData/bonusPages.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const bonusPageService = {
  async createPage(pageData) {
    await delay(1000);
    
    const newPage = {
      ...pageData,
      id: `page_${Date.now()}`,
      url: `${window.location.origin}/bonus/page_${Date.now()}`,
      status: "active",
      views: 0,
      clicks: 0,
      conversions: 0,
      createdAt: new Date().toISOString()
    };

    mockBonusPages.push(newPage);
    return newPage;
  },

  async getAll() {
    await delay(300);
    return mockBonusPages;
  },

  async getById(id) {
    await delay(300);
    return mockBonusPages.find(page => page.Id === parseInt(id) || page.id === id);
  },

  async update(id, updates) {
    await delay(500);
    const index = mockBonusPages.findIndex(page => page.Id === parseInt(id) || page.id === id);
    if (index === -1) throw new Error("Page not found");
    
    mockBonusPages[index] = { ...mockBonusPages[index], ...updates };
    return mockBonusPages[index];
  },

  async delete(id) {
    await delay(300);
    const index = mockBonusPages.findIndex(page => page.Id === parseInt(id) || page.id === id);
    if (index === -1) throw new Error("Page not found");
    
    mockBonusPages.splice(index, 1);
    return true;
  },

  async trackView(id) {
    await delay(100);
    const page = mockBonusPages.find(p => p.Id === parseInt(id) || p.id === id);
    if (page) {
      page.views = (page.views || 0) + 1;
    }
    return true;
  },

  async trackClick(id) {
    await delay(100);
    const page = mockBonusPages.find(p => p.Id === parseInt(id) || p.id === id);
    if (page) {
      page.clicks = (page.clicks || 0) + 1;
    }
    return true;
  }
};