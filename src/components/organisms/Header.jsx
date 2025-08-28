import { useState } from "react";
import { motion } from "framer-motion";
import ProviderIcon from "@/components/ProviderIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ onAddTask, onSearch, onToggleSidebar }) => {
  const [showQuickAdd, setShowQuickAdd] = useState(false);

return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-8 py-5 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
{/* Left Section */}
        <div className="flex items-center gap-5">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 transition-all duration-300 hover:scale-105"
          >
<ProviderIcon name="Menu" size={20} className="text-gray-600" />
          </button>
<div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <ProviderIcon name="CheckSquare" size={22} className="text-white" />
            </div>
<h1 className="text-3xl font-bold text-gray-900 font-display bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>
        </div>
{/* Center Section - Search */}
        <div className="flex-1 max-w-lg mx-10 hidden md:block">
          <SearchBar 
            placeholder="Search tasks..."
            placeholder="Search tasks..."
            onSearch={onSearch}
          />
        </div>

{/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowQuickAdd(!showQuickAdd)}
            >
<ProviderIcon name="Search" size={18} />
            </Button>
          </div>

          <Button
            variant="primary"
            onClick={onAddTask}
            className="flex items-center gap-2"
          >
<ProviderIcon name="Plus" size={18} />
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      {showQuickAdd && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-4 md:hidden"
        >
          <SearchBar 
            placeholder="Search tasks..."
            onSearch={onSearch}
          />
        </motion.div>
      )}
    </header>
  );
};

export default Header;