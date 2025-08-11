import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "@/components/organisms/TaskItem";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const TaskList = ({ 
  tasks = [], 
  loading = false, 
  error = null,
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  onRetry
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (tasks.length === 0) {
    return <Empty />;
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ 
              opacity: 0, 
              y: -30, 
              scale: 0.9,
              transition: { duration: 0.3 }
            }}
            layout
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300 
            }}
          >
            <TaskItem
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;