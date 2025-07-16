const chargeService = {
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
          { field: { Name: "price" } },
          { field: { Name: "description" } },
          { field: { Name: "limitsOfUse" } },
          { field: { Name: "salesPageId" } }
        ],
        orderBy: [
          {
            fieldName: "price",
            sorttype: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('charge', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching charges:", error);
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
          { field: { Name: "price" } },
          { field: { Name: "description" } },
          { field: { Name: "limitsOfUse" } },
          { field: { Name: "salesPageId" } }
        ]
      };

      const response = await apperClient.getRecordById('charge', id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching charge with ID ${id}:`, error);
      throw error;
    }
  },

  async create(chargeData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [
          {
            Name: chargeData.Name,
            price: chargeData.price,
            description: chargeData.description,
            limitsOfUse: chargeData.limitsOfUse,
            salesPageId: chargeData.salesPageId
          }
        ]
      };

      const response = await apperClient.createRecord('charge', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create charge");
        }
        return response.results[0].data;
      }

      return null;
    } catch (error) {
      console.error("Error creating charge:", error);
      throw error;
    }
  },

  async update(id, chargeData) {
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
            Name: chargeData.Name,
            price: chargeData.price,
            description: chargeData.description,
            limitsOfUse: chargeData.limitsOfUse,
            salesPageId: chargeData.salesPageId
          }
        ]
      };

      const response = await apperClient.updateRecord('charge', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to update charge");
        }
        return response.results[0].data;
      }

      return null;
    } catch (error) {
      console.error("Error updating charge:", error);
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

      const response = await apperClient.deleteRecord('charge', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to delete ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to delete charge");
        }
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error deleting charge:", error);
      throw error;
    }
  }
};

export default chargeService;