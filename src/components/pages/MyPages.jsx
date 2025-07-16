import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { bonusPageService } from "@/services/api/bonusPageService";
import { format } from "date-fns";

const MyPages = () => {
  const [pages, setPages] = useState([]);
  const [filteredPages, setFilteredPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadPages();
  }, []);

  useEffect(() => {
    if (location.state?.newPage) {
      toast.success("Bonus page created successfully!");
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    filterPages();
  }, [pages, searchQuery]);

  const loadPages = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const pagesData = await bonusPageService.getAll();
      setPages(pagesData);
    } catch (err) {
      setError("Failed to load bonus pages");
    } finally {
      setLoading(false);
    }
  };

  const filterPages = () => {
    if (!searchQuery.trim()) {
      setFilteredPages(pages);
      return;
    }

    const filtered = pages.filter(page =>
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPages(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDeletePage = async (pageId) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      try {
        await bonusPageService.delete(pageId);
        setPages(prev => prev.filter(page => page.id !== pageId));
        toast.success("Page deleted successfully");
      } catch (error) {
        toast.error("Failed to delete page");
      }
    }
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard!");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "success";
      case "draft": return "warning";
      case "archived": return "gray";
      default: return "gray";
    }
  };

  if (loading) {
    return <Loading type="list" text="Loading your pages..." />;
  }

  if (error) {
    return <Error message={error} onRetry={loadPages} />;
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">My Pages</h1>
          <p className="text-gray-400 mt-2">
            Manage your bonus hosting pages and track performance
          </p>
        </div>
        
        <Button
          onClick={() => navigate("/create")}
          variant="accent"
          className="px-6 py-3"
        >
          <ApperIcon name="Plus" className="h-5 w-5 mr-2" />
          Create New Page
        </Button>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search pages..."
          className="flex-1"
        />
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ApperIcon name="Filter" className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <ApperIcon name="Download" className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {filteredPages.length === 0 ? (
        <Empty
          title="No pages found"
          description={searchQuery ? "No pages match your search criteria" : "Create your first bonus page to get started"}
          icon="FileText"
          actionLabel="Create Page"
          onAction={() => navigate("/create")}
          showAction={!searchQuery}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPages.map((page, index) => (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1 truncate">
                      {page.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {page.description}
                    </p>
                  </div>
                  <Badge
                    variant={getStatusColor(page.status)}
                    size="sm"
                    className="ml-2"
                  >
                    {page.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-white">{page.views}</p>
                    <p className="text-xs text-gray-400">Views</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">{page.clicks}</p>
                    <p className="text-xs text-gray-400">Clicks</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {page.conversions}
                    </p>
                    <p className="text-xs text-gray-400">Conversions</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Created {format(new Date(page.createdAt), "MMM d, yyyy")}</span>
                  <div className="flex items-center gap-1">
                    <ApperIcon name="Eye" className="h-3 w-3" />
                    <span>{page.views} views</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(page.url, "_blank")}
                    className="flex-1"
                  >
                    <ApperIcon name="ExternalLink" className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyUrl(page.url)}
                  >
                    <ApperIcon name="Copy" className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeletePage(page.id)}
                  >
                    <ApperIcon name="Trash2" className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyPages;