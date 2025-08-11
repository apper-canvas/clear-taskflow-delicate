import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import TaskListItem from "@/components/molecules/TaskListItem";
import Button from "@/components/atoms/Button";

const Sidebar = ({ 
  isOpen, 
  onClose, 
  taskLists = [], 
  activeListId, 
  onListSelect,
  taskCounts = {},
  onAddList
}) => {
  const sidebarContent = (
    <div className="h-full flex flex-col bg-gradient-to-b from-white to-gray-50/50 backdrop-blur-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 font-display">
            Lists
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onAddList}
            className="text-gray-600"
          >
            <ApperIcon name="Plus" size={16} />
          </Button>
        </div>
      </div>

      {/* Task Lists */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {taskLists.map((list) => (
          <TaskListItem
            key={list.Id}
            list={list}
            isActive={activeListId === list.Id}
            taskCount={taskCounts[list.Id] || 0}
            onClick={() => onListSelect(list.Id)}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="p-4 border-t border-gray-200/50">
        <div className="bg-gradient-to-r from-surface to-white rounded-xl p-4 border border-gray-200/50 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-success/10 to-emerald-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 font-display">
                Total Tasks
              </p>
              <p className="text-lg font-bold text-success">
                {Object.values(taskCounts).reduce((sum, count) => sum + count, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 border-r border-gray-200 h-full">
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute left-0 top-0 h-full w-80 border-r border-gray-200 shadow-2xl"
          >
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-600"
              >
                <ApperIcon name="X" size={18} />
              </Button>
            </div>

            {sidebarContent}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Sidebar;