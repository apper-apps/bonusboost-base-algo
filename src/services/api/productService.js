import mockProducts from "@/services/mockData/products.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async analyzeProduct(url) {
    await delay(2000);
    
    // Simulate AI analysis
    const mockAnalysis = {
      id: Date.now(),
      url,
      name: "Automated Commission System",
      description: "A comprehensive affiliate marketing system that automates commission generation through the P.E.A Blueprint methodology.",
      features: [
        "P.E.A Blueprint methodology",
        "Automated commission tracking",
        "Email marketing integration",
        "Landing page templates",
        "Analytics dashboard"
      ],
      gaps: [
        "No pre-built email sequences",
        "Limited bonus creation tools",
        "No social media templates",
        "Missing conversion optimization guides",
        "No advanced funnel templates"
      ],
      analyzedAt: new Date().toISOString()
    };

    return mockAnalysis;
  },

  async getAll() {
    await delay(300);
    return mockProducts;
  },

  async getById(id) {
    await delay(300);
    return mockProducts.find(product => product.Id === parseInt(id));
  },

  async create(product) {
    await delay(500);
    const newProduct = {
      ...product,
      Id: Math.max(...mockProducts.map(p => p.Id)) + 1,
      createdAt: new Date().toISOString()
    };
    mockProducts.push(newProduct);
    return newProduct;
  },

  async update(id, updates) {
    await delay(500);
    const index = mockProducts.findIndex(product => product.Id === parseInt(id));
    if (index === -1) throw new Error("Product not found");
    
    mockProducts[index] = { ...mockProducts[index], ...updates };
    return mockProducts[index];
  },

  async delete(id) {
    await delay(300);
    const index = mockProducts.findIndex(product => product.Id === parseInt(id));
    if (index === -1) throw new Error("Product not found");
    
    mockProducts.splice(index, 1);
    return true;
  }
};