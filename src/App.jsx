import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/organisms/Layout";
import Dashboard from "@/components/pages/Dashboard";
import CreateBonus from "@/components/pages/CreateBonus";
import MyPages from "@/components/pages/MyPages";
import Analytics from "@/components/pages/Analytics";
import Settings from "@/components/pages/Settings";
import BonusPageView from "@/components/pages/BonusPageView";
import LandingPage from "@/components/pages/LandingPage";

const App = () => {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="create" element={<CreateBonus />} />
          <Route path="pages" element={<MyPages />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/bonus/:id" element={<BonusPageView />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </div>
  );
};

export default App;