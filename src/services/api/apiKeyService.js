import { toast } from 'react-toastify';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const apiKeyService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "provider" } },
          { field: { Name: "key" } },
          { field: { Name: "is_active" } },
          { field: { Name: "added_at" } }
        ]
      };

      const response = await apperClient.fetchRecords('api_key', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching API keys:", error);
      toast.error("Failed to fetch API keys");
      return [];
    }
  },

  async create(apiKey) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Check if provider already exists and delete it first
      const existingKeys = await this.getAll();
      const existingKey = existingKeys.find(k => k.provider === apiKey.provider);
      
      if (existingKey) {
        await this.delete(existingKey.Id);
      }

      const params = {
        records: [{
          Name: apiKey.provider || apiKey.Name,
          Tags: apiKey.tags || apiKey.Tags || "",
          Owner: apiKey.owner || apiKey.Owner,
          provider: apiKey.provider,
          key: apiKey.key,
          is_active: apiKey.isActive !== undefined ? apiKey.isActive : true,
          added_at: apiKey.addedAt || new Date().toISOString()
        }]
      };

      const response = await apperClient.createRecord('api_key', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          toast.success("API key created successfully");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating API key:", error);
      toast.error("Failed to create API key");
      return null;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('api_key', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulDeletions.length > 0) {
          toast.success("API key deleted successfully");
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting API key:", error);
      toast.error("Failed to delete API key");
      return false;
    }
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