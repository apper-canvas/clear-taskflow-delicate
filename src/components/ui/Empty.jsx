import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No tasks yet",
  description = "Create your first task to get started with organizing your day.",
  actionText = "Add Your First Task",
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-surface to-white rounded-2xl border border-gray-200 p-12 text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-r from-primary/10 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <ApperIcon name="CheckSquare" size={40} className="text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3 font-display">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 font-body max-w-md mx-auto text-lg">
        {description}
      </p>
      
      {onAction && (
        <Button
          onClick={onAction}
          variant="primary"
          size="lg"
          className="flex items-center gap-2"
        >
          <ApperIcon name="Plus" size={20} />
          {actionText}
        </Button>
      )}
      
      {/* Decorative elements */}
      <div className="flex justify-center gap-8 mt-8 opacity-40">
        <div className="w-2 h-2 bg-gradient-to-r from-primary to-indigo-500 rounded-full" />
        <div className="w-2 h-2 bg-gradient-to-r from-secondary to-purple-500 rounded-full" />
        <div className="w-2 h-2 bg-gradient-to-r from-accent to-pink-500 rounded-full" />
      </div>
    </motion.div>
  );
};

export default Empty;