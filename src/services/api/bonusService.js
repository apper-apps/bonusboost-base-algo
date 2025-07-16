import { toast } from 'react-toastify';

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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "type" } },
          { field: { Name: "content" } },
          { field: { Name: "value" } },
          { field: { Name: "created_at" } },
          { field: { Name: "product_id" } }
        ]
      };

      const response = await apperClient.fetchRecords('bonus', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching bonuses:", error);
      toast.error("Failed to fetch bonuses");
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "type" } },
          { field: { Name: "content" } },
          { field: { Name: "value" } },
          { field: { Name: "created_at" } },
          { field: { Name: "product_id" } }
        ]
      };

      const response = await apperClient.getRecordById('bonus', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching bonus with ID ${id}:`, error);
      toast.error("Failed to fetch bonus");
      return null;
    }
  },

  async create(bonus) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: bonus.title || bonus.Name,
          Tags: bonus.tags || bonus.Tags || "",
          Owner: bonus.owner || bonus.Owner,
          title: bonus.title,
          description: bonus.description,
          type: bonus.type,
          content: typeof bonus.content === 'object' ? JSON.stringify(bonus.content) : bonus.content || "",
          value: bonus.value,
          created_at: bonus.createdAt || new Date().toISOString(),
          product_id: bonus.productId || bonus.product_id
        }]
      };

      const response = await apperClient.createRecord('bonus', params);
      
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
          toast.success("Bonus created successfully");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating bonus:", error);
      toast.error("Failed to create bonus");
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
          ...(updates.title && { Name: updates.title, title: updates.title }),
          ...(updates.tags && { Tags: updates.tags }),
          ...(updates.owner && { Owner: updates.owner }),
          ...(updates.description && { description: updates.description }),
          ...(updates.type && { type: updates.type }),
          ...(updates.content && { content: typeof updates.content === 'object' ? JSON.stringify(updates.content) : updates.content }),
          ...(updates.value && { value: updates.value }),
          ...(updates.createdAt && { created_at: updates.createdAt }),
          ...(updates.productId && { product_id: updates.productId })
        }]
      };

      const response = await apperClient.updateRecord('bonus', params);
      
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
          toast.success("Bonus updated successfully");
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error updating bonus:", error);
      toast.error("Failed to update bonus");
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

      const response = await apperClient.deleteRecord('bonus', params);
      
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
          toast.success("Bonus deleted successfully");
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting bonus:", error);
      toast.error("Failed to delete bonus");
      return false;
    }
  }
};