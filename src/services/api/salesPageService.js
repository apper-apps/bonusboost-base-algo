const salesPageService = {
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "url" } },
          { field: { Name: "affiliatelink" } },
          { field: { Name: "ctatext" } },
          { field: { Name: "status" } },
          { field: { Name: "views" } },
          { field: { Name: "clicks" } },
          { field: { Name: "conversions" } },
          { field: { Name: "copywriting" } },
          { field: { Name: "benefits" } },
          { field: { Name: "lifechanges" } }
        ],
        orderBy: [
          {
            fieldName: "CreatedOn",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('salespage', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching sales pages:", error);
      throw error;
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "url" } },
          { field: { Name: "affiliatelink" } },
          { field: { Name: "ctatext" } },
          { field: { Name: "status" } },
          { field: { Name: "views" } },
          { field: { Name: "clicks" } },
          { field: { Name: "conversions" } },
          { field: { Name: "copywriting" } },
          { field: { Name: "benefits" } },
          { field: { Name: "lifechanges" } },
          { field: { Name: "productId" } }
        ]
      };

      const response = await apperClient.getRecordById('salespage', id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching sales page with ID ${id}:`, error);
      throw error;
    }
  },

  async create(salesPageData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [
          {
            Name: salesPageData.Name,
            title: salesPageData.title,
            description: salesPageData.description,
            url: salesPageData.url,
            affiliatelink: salesPageData.affiliatelink,
            ctatext: salesPageData.ctatext,
            status: salesPageData.status || 'Draft',
            views: salesPageData.views || 0,
            clicks: salesPageData.clicks || 0,
            conversions: salesPageData.conversions || 0,
            copywriting: salesPageData.copywriting,
            benefits: salesPageData.benefits,
            lifechanges: salesPageData.lifechanges,
            productId: salesPageData.productId
          }
        ]
      };

      const response = await apperClient.createRecord('salespage', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create sales page");
        }
        return response.results[0].data;
      }

      return null;
    } catch (error) {
      console.error("Error creating sales page:", error);
      throw error;
    }
  },

  async update(id, salesPageData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [
          {
            Id: id,
            Name: salesPageData.Name,
            title: salesPageData.title,
            description: salesPageData.description,
            url: salesPageData.url,
            affiliatelink: salesPageData.affiliatelink,
            ctatext: salesPageData.ctatext,
            status: salesPageData.status,
            views: salesPageData.views,
            clicks: salesPageData.clicks,
            conversions: salesPageData.conversions,
            copywriting: salesPageData.copywriting,
            benefits: salesPageData.benefits,
            lifechanges: salesPageData.lifechanges,
            productId: salesPageData.productId
          }
        ]
      };

      const response = await apperClient.updateRecord('salespage', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to update sales page");
        }
        return response.results[0].data;
      }

      return null;
    } catch (error) {
      console.error("Error updating sales page:", error);
      throw error;
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
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord('salespage', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to delete ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to delete sales page");
        }
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error deleting sales page:", error);
      throw error;
    }
  }
};

export default salesPageService;