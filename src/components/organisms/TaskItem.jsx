import { useState } from "react";
import { motion } from "framer-motion";
import { format, isToday, isPast, isTomorrow } from "date-fns";
import { cn } from "@/utils/cn";
import ProviderIcon from "@/components/ProviderIcon";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import PriorityIndicator from "@/components/molecules/PriorityIndicator";
import Badge from "@/components/atoms/Badge";

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleToggleComplete = async () => {
    if (task.completed) {
      onToggleComplete(task.Id);
      return;
    }

    setIsCompleting(true);
    
    // Celebration animation
    setTimeout(() => {
      onToggleComplete(task.Id);
      setIsCompleting(false);
    }, 600);
  };

  const getDueDateInfo = (dueDate) => {
    if (!dueDate) return null;
    
    const date = new Date(dueDate);
    
    if (isPast(date) && !isToday(date)) {
      return {
        text: `Overdue (${format(date, "MMM d")})`,
        variant: "error",
        icon: "AlertCircle"
      };
    }
    
    if (isToday(date)) {
      return {
        text: "Due Today",
        variant: "warning",
        icon: "Clock"
      };
    }
    
    if (isTomorrow(date)) {
      return {
        text: "Due Tomorrow",
        variant: "info",
        icon: "Calendar"
      };
    }
    
    return {
      text: format(date, "MMM d"),
      variant: "gray",
      icon: "Calendar"
    };
  };

  const dueDateInfo = getDueDateInfo(task.dueDate);

  return (
<motion.div
      className={cn(
        "group bg-white rounded-xl border border-gray-200 p-5 transition-all duration-300 hover:shadow-xl hover:border-gray-300 hover:scale-[1.02] hover:-translate-y-1",
        task.completed && "opacity-75 bg-gradient-to-r from-gray-50 to-white",
        isCompleting && "animate-fly-up"
      )}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
<div className="flex items-start gap-5">
        {/* Checkbox */}
        <div className="flex-shrink-0 pt-1.5">
        <div className="flex-shrink-0 pt-1">
          <Checkbox
onChange={handleToggleComplete}
            className={cn(
              "transition-all duration-300 hover:scale-110",
              isCompleting && "animate-pulse"
            )}
          />
        </div>
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-medium text-gray-900 font-display transition-all duration-200",
                task.completed && "line-through text-gray-500"
              )}>
                {task.title}
              </h3>
{/* Task Meta */}
              <div className="flex items-center gap-4 mt-3">
                <PriorityIndicator priority={task.priority} />
                {dueDateInfo && (
                  <Badge variant={dueDateInfo.variant} size="sm" className="flex items-center gap-1">
<ProviderIcon name={dueDateInfo.icon} size={12} />
                    {dueDateInfo.text}
                  </Badge>
                )}
                
                <span className="text-xs text-gray-500 font-body">
                  Created {format(new Date(task.createdAt), "MMM d")}
                </span>
              </div>
            </div>

{/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="text-gray-500 hover:text-gray-700"
              >
<ProviderIcon name="Edit2" size={16} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.Id)}
                className="text-gray-500 hover:text-error"
              >
<ProviderIcon name="Trash2" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Celebration */}
{isCompleting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
<motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              type: "spring",
              duration: 0.8,
              repeat: 1
            }}
            className="text-4xl"
          >
            🎉
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskItem;