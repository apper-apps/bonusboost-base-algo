import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { apiKeyService } from "@/services/api/apiKeyService";

const ApiSettings = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newKey, setNewKey] = useState({ provider: "", key: "" });
  const [testingProvider, setTestingProvider] = useState(null);

  const providers = [
    { id: "openai", name: "OpenAI", icon: "Brain" },
    { id: "claude", name: "Claude", icon: "MessageSquare" },
    { id: "gemini", name: "Gemini", icon: "Sparkles" },
    { id: "cohere", name: "Cohere", icon: "Zap" },
    { id: "mistral", name: "Mistral", icon: "Wind" }
  ];

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    setLoading(true);
    try {
      const keys = await apiKeyService.getAll();
      setApiKeys(keys);
    } catch (error) {
      toast.error("Failed to load API keys");
    } finally {
      setLoading(false);
    }
  };

  const handleAddKey = async () => {
    if (!newKey.provider || !newKey.key.trim()) {
      toast.error("Please select a provider and enter an API key");
      return;
    }

    try {
      await apiKeyService.create(newKey);
      setNewKey({ provider: "", key: "" });
      await loadApiKeys();
      toast.success("API key added successfully");
    } catch (error) {
      toast.error("Failed to add API key");
    }
  };

  const handleTestKey = async (provider) => {
    setTestingProvider(provider);
    try {
      await apiKeyService.testConnection(provider);
      toast.success(`${provider} connection successful`);
    } catch (error) {
      toast.error(`${provider} connection failed`);
    } finally {
      setTestingProvider(null);
    }
  };

  const handleDeleteKey = async (provider) => {
    if (window.confirm(`Remove ${provider} API key?`)) {
      try {
        await apiKeyService.delete(provider);
        await loadApiKeys();
        toast.success("API key removed");
      } catch (error) {
        toast.error("Failed to remove API key");
      }
    }
  };

  const getProviderInfo = (providerId) => {
    return providers.find(p => p.id === providerId) || { name: providerId, icon: "Key" };
  };

  return (
    <div className="space-y-6">
      <Card className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <ApperIcon name="Key" className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">API Configuration</h3>
            <p className="text-sm text-gray-400">
              Add your LLM provider API keys for bonus generation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Provider"
            type="select"
            value={newKey.provider}
            onChange={(e) => setNewKey(prev => ({ ...prev, provider: e.target.value }))}
          >
            <option value="">Select Provider</option>
            {providers.map(provider => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </FormField>

          <FormField
            label="API Key"
            type="password"
            value={newKey.key}
            onChange={(e) => setNewKey(prev => ({ ...prev, key: e.target.value }))}
            placeholder="Enter API key"
          />
        </div>

        <Button
          onClick={handleAddKey}
          disabled={!newKey.provider || !newKey.key.trim()}
          className="w-full"
        >
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add API Key
        </Button>
      </Card>

      <Card className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <ApperIcon name="Settings" className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Configured Providers</h3>
            <p className="text-sm text-gray-400">
              {apiKeys.length} provider{apiKeys.length !== 1 ? "s" : ""} configured
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-sm text-gray-400">Loading API keys...</p>
          </div>
        ) : apiKeys.length === 0 ? (
          <div className="text-center py-8">
            <ApperIcon name="Key" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-300 mb-2">
              No API Keys Configured
            </h3>
            <p className="text-gray-400">
              Add your first API key to start generating bonuses
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {apiKeys.map((keyData) => {
              const provider = getProviderInfo(keyData.provider);
              return (
                <motion.div
                  key={keyData.provider}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 border border-gray-600 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-surface rounded-lg">
                      <ApperIcon name={provider.icon} className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{provider.name}</h4>
                      <p className="text-sm text-gray-400">
                        Key: •••••{keyData.key.slice(-4)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={keyData.isActive ? "success" : "gray"}
                      size="sm"
                    >
                      {keyData.isActive ? "Active" : "Inactive"}
                    </Badge>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTestKey(keyData.provider)}
                      disabled={testingProvider === keyData.provider}
                      loading={testingProvider === keyData.provider}
                    >
                      <ApperIcon name="Zap" className="h-4 w-4 mr-1" />
                      Test
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteKey(keyData.provider)}
                    >
                      <ApperIcon name="Trash2" className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ApiSettings;