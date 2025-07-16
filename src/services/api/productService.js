import { toast } from 'react-toastify';

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
          { field: { Name: "url" } },
          { field: { Name: "description" } },
          { field: { Name: "features" } },
          { field: { Name: "gaps" } },
          { field: { Name: "analyzed_at" } }
        ]
      };

      const response = await apperClient.fetchRecords('product', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
      return [];
    }
  },

  async getById(id) {
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
          { field: { Name: "url" } },
          { field: { Name: "description" } },
          { field: { Name: "features" } },
          { field: { Name: "gaps" } },
          { field: { Name: "analyzed_at" } }
        ]
      };

      const response = await apperClient.getRecordById('product', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      toast.error("Failed to fetch product");
      return null;
    }
  },

  async create(product) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: product.name || product.Name,
          Tags: product.tags || product.Tags || "",
          Owner: product.owner || product.Owner,
          url: product.url,
          description: product.description,
          features: Array.isArray(product.features) ? product.features.join(',') : product.features || "",
          gaps: Array.isArray(product.gaps) ? product.gaps.join(',') : product.gaps || "",
          analyzed_at: product.analyzedAt || new Date().toISOString()
        }]
      };

      const response = await apperClient.createRecord('product', params);
      
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
          toast.success("Product created successfully");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
      return null;
    }
  },

  async update(id, updates) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          ...(updates.name && { Name: updates.name }),
          ...(updates.tags && { Tags: updates.tags }),
          ...(updates.owner && { Owner: updates.owner }),
          ...(updates.url && { url: updates.url }),
          ...(updates.description && { description: updates.description }),
          ...(updates.features && { features: Array.isArray(updates.features) ? updates.features.join(',') : updates.features }),
          ...(updates.gaps && { gaps: Array.isArray(updates.gaps) ? updates.gaps.join(',') : updates.gaps }),
          ...(updates.analyzedAt && { analyzed_at: updates.analyzedAt })
        }]
      };

      const response = await apperClient.updateRecord('product', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          toast.success("Product updated successfully");
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
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

      const response = await apperClient.deleteRecord('product', params);
      
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
          toast.success("Product deleted successfully");
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
      return false;
    }
  }
};