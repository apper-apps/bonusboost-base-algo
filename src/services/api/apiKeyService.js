import mockApiKeys from "@/services/mockData/apiKeys.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const apiKeyService = {
  async getAll() {
    await delay(300);
    return mockApiKeys;
  },

  async create(apiKey) {
    await delay(500);
    const newKey = {
      ...apiKey,
      isActive: true,
      addedAt: new Date().toISOString()
    };
    
    // Remove existing key for the same provider
    const existingIndex = mockApiKeys.findIndex(k => k.provider === apiKey.provider);
    if (existingIndex !== -1) {
      mockApiKeys.splice(existingIndex, 1);
    }
    
    mockApiKeys.push(newKey);
    return newKey;
  },

  async delete(provider) {
    await delay(300);
    const index = mockApiKeys.findIndex(key => key.provider === provider);
    if (index === -1) throw new Error("API key not found");
    
    mockApiKeys.splice(index, 1);
    return true;
  },

  async testConnection(provider) {
    await delay(1000);
    // Simulate connection test
    const isSuccess = Math.random() > 0.2; // 80% success rate
    
    if (!isSuccess) {
      throw new Error("Connection failed");
    }
    
    return { success: true, message: "Connection successful" };
  }
};