import { toast } from 'react-toastify';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const bonusPageService = {
  async createPage(pageData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

const params = {
        records: [{
          Name: pageData.title || pageData.Name,
          Tags: pageData.tags || pageData.Tags || "",
          Owner: pageData.owner || pageData.Owner,
          title: pageData.title,
          description: pageData.description,
          url: pageData.url || `${window.location.origin}/bonus/page_${Date.now()}`,
          affiliate_link: pageData.affiliateLink || pageData.affiliate_link,
          cta_text: pageData.ctaText || pageData.cta_text,
          status: pageData.status || "active",
          views: pageData.views || 0,
          clicks: pageData.clicks || 0,
          conversions: pageData.conversions || 0,
          design: typeof pageData.design === 'object' ? JSON.stringify(pageData.design) : pageData.design || "",
          created_at: pageData.createdAt || new Date().toISOString(),
          bonus_id: pageData.bonusId || pageData.bonus_id,
          headline: pageData.headline || "",
          subheadline: pageData.subheadline || "",
          youtubeEmbed: pageData.youtubeEmbed || "",
          bonusExplanations: pageData.bonusExplanations || "",
          ctaLink: pageData.ctaLink || pageData.affiliateLink || pageData.affiliate_link,
          ctaDesign: pageData.ctaDesign || ""
        }]
      };

      const response = await apperClient.createRecord('bonus_page', params);
      
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
          toast.success("Bonus page created successfully");
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating bonus page:", error);
      toast.error("Failed to create bonus page");
      return null;
    }
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
          { field: { Name: "url" } },
          { field: { Name: "affiliate_link" } },
          { field: { Name: "cta_text" } },
          { field: { Name: "status" } },
          { field: { Name: "views" } },
          { field: { Name: "clicks" } },
          { field: { Name: "conversions" } },
          { field: { Name: "design" } },
          { field: { Name: "created_at" } },
          { field: { Name: "bonus_id" } },
          { field: { Name: "headline" } },
          { field: { Name: "subheadline" } },
          { field: { Name: "youtubeEmbed" } },
          { field: { Name: "bonusExplanations" } },
          { field: { Name: "ctaLink" } },
          { field: { Name: "ctaDesign" } }
        ]
      };

      const response = await apperClient.fetchRecords('bonus_page', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching bonus pages:", error);
      toast.error("Failed to fetch bonus pages");
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
          { field: { Name: "url" } },
          { field: { Name: "affiliate_link" } },
          { field: { Name: "cta_text" } },
          { field: { Name: "status" } },
          { field: { Name: "views" } },
          { field: { Name: "clicks" } },
          { field: { Name: "conversions" } },
          { field: { Name: "design" } },
          { field: { Name: "created_at" } },
          { field: { Name: "bonus_id" } },
          { field: { Name: "headline" } },
          { field: { Name: "subheadline" } },
          { field: { Name: "youtubeEmbed" } },
          { field: { Name: "bonusExplanations" } },
          { field: { Name: "ctaLink" } },
          { field: { Name: "ctaDesign" } }
        ]
      };

      const response = await apperClient.getRecordById('bonus_page', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching bonus page with ID ${id}:`, error);
      toast.error("Failed to fetch bonus page");
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
          ...(updates.url && { url: updates.url }),
          ...(updates.affiliateLink && { affiliate_link: updates.affiliateLink }),
          ...(updates.ctaText && { cta_text: updates.ctaText }),
          ...(updates.status && { status: updates.status }),
          ...(updates.views !== undefined && { views: updates.views }),
          ...(updates.clicks !== undefined && { clicks: updates.clicks }),
          ...(updates.conversions !== undefined && { conversions: updates.conversions }),
          ...(updates.design && { design: typeof updates.design === 'object' ? JSON.stringify(updates.design) : updates.design }),
          ...(updates.createdAt && { created_at: updates.createdAt }),
          ...(updates.bonusId && { bonus_id: updates.bonusId }),
          ...(updates.headline && { headline: updates.headline }),
          ...(updates.subheadline && { subheadline: updates.subheadline }),
          ...(updates.youtubeEmbed && { youtubeEmbed: updates.youtubeEmbed }),
          ...(updates.bonusExplanations && { bonusExplanations: updates.bonusExplanations }),
          ...(updates.ctaLink && { ctaLink: updates.ctaLink }),
          ...(updates.ctaDesign && { ctaDesign: updates.ctaDesign })
        }]
      };

      const response = await apperClient.updateRecord('bonus_page', params);
      
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
          toast.success("Bonus page updated successfully");
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error updating bonus page:", error);
      toast.error("Failed to update bonus page");
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

      const response = await apperClient.deleteRecord('bonus_page', params);
      
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
          toast.success("Bonus page deleted successfully");
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting bonus page:", error);
      toast.error("Failed to delete bonus page");
      return false;
    }
  },

  async trackView(id) {
    try {
      const currentPage = await this.getById(id);
      if (currentPage) {
        const newViews = (currentPage.views || 0) + 1;
        await this.update(id, { views: newViews });
      }
      return true;
    } catch (error) {
      console.error("Error tracking view:", error);
      return false;
    }
  },

  async trackClick(id) {
    try {
      const currentPage = await this.getById(id);
      if (currentPage) {
        const newClicks = (currentPage.clicks || 0) + 1;
        await this.update(id, { clicks: newClicks });
      }
      return true;
    } catch (error) {
      console.error("Error tracking click:", error);
      return false;
    }
  }
};