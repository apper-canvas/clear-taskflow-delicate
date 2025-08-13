import { motion } from "framer-motion";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import ProviderIcon from "@/components/ProviderIcon";

const FilterBar = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  activeCount = 0
}) => {
  const handleFilterChange = (key) => (e) => {
    onFiltersChange({
      ...filters,
      [key]: e.target.value
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== "all" && value !== "");

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-surface to-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm"
    >
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
<ProviderIcon name="Filter" size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700 font-display">
            Filters
          </span>
          {hasActiveFilters && (
<span className="text-xs bg-gradient-to-r from-primary/10 to-purple-100 text-primary px-2 py-1 rounded-full font-medium">
              {activeCount} active
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="min-w-[120px]">
            <Select
              value={filters.status}
              onChange={handleFilterChange("status")}
              className="text-sm"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Select>
          </div>

          <div className="min-w-[120px]">
            <Select
              value={filters.priority}
              onChange={handleFilterChange("priority")}
              className="text-sm"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </Select>
          </div>

          <div className="min-w-[120px]">
            <Select
              value={filters.dueDate}
              onChange={handleFilterChange("dueDate")}
              className="text-sm"
            >
              <option value="all">All Dates</option>
              <option value="overdue">Overdue</option>
              <option value="today">Due Today</option>
              <option value="tomorrow">Due Tomorrow</option>
              <option value="week">This Week</option>
            </Select>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-gray-600 hover:text-gray-900"
            >
<ProviderIcon name="X" size={16} />
              <span className="ml-1">Clear</span>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;