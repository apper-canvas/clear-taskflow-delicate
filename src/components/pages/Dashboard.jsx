import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { isToday, isPast, isTomorrow, isThisWeek } from "date-fns";
import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";
import TaskList from "@/components/organisms/TaskList";
import TaskForm from "@/components/organisms/TaskForm";
import FilterBar from "@/components/organisms/FilterBar";
import { TaskService } from "@/services/api/TaskService";
import { TaskListService } from "@/services/api/TaskListService";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskLists, setTaskLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeListId, setActiveListId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    dueDate: "all"
  });

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [tasksData, listsData] = await Promise.all([
        TaskService.getAll(),
        TaskListService.getAll()
      ]);
      
      setTasks(tasksData);
      setTaskLists(listsData);
      
      if (listsData.length > 0 && !activeListId) {
        setActiveListId(listsData[0].Id);
      }
    } catch (err) {
      setError("Failed to load data. Please try again.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Filter by active list
    if (activeListId) {
      result = result.filter(task => task.listId === activeListId);
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (filters.status !== "all") {
      const isCompleted = filters.status === "completed";
      result = result.filter(task => task.completed === isCompleted);
    }

    // Filter by priority
    if (filters.priority !== "all") {
      result = result.filter(task => task.priority === filters.priority);
    }

    // Filter by due date
    if (filters.dueDate !== "all") {
      result = result.filter(task => {
        if (!task.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        
        switch (filters.dueDate) {
          case "overdue":
            return isPast(dueDate) && !isToday(dueDate);
          case "today":
            return isToday(dueDate);
          case "tomorrow":
            return isTomorrow(dueDate);
          case "week":
            return isThisWeek(dueDate);
          default:
            return true;
        }
      });
    }

    return result.sort((a, b) => {
      // Sort by completion status (incomplete first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Sort by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (a.priority !== b.priority) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      
      // Sort by due date (soonest first)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      
      // Tasks with due dates come first
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && b.dueDate) return 1;
      
      // Sort by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [tasks, activeListId, searchQuery, filters]);

  // Calculate task counts for sidebar
  const taskCounts = useMemo(() => {
    const counts = {};
    taskLists.forEach(list => {
      counts[list.Id] = tasks.filter(task => 
        task.listId === list.Id && !task.completed
      ).length;
    });
    return counts;
  }, [tasks, taskLists]);

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleSubmitTask = async (taskData) => {
    try {
      if (editingTask) {
        const updatedTask = await TaskService.update(editingTask.Id, taskData);
        setTasks(prev => prev.map(t => t.Id === editingTask.Id ? updatedTask : t));
        toast.success("Task updated successfully!");
      } else {
        const newTask = await TaskService.create(taskData);
        setTasks(prev => [...prev, newTask]);
        toast.success("Task created successfully!");
      }
      
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (err) {
      toast.error("Failed to save task. Please try again.");
      console.error("Error saving task:", err);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      const updatedTask = await TaskService.update(taskId, {
        completed: !task.completed
      });
      
      setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t));
      
      if (!task.completed) {
        toast.success("🎉 Task completed! Great job!", {
          className: "toast-celebration"
        });
      }
    } catch (err) {
      toast.error("Failed to update task. Please try again.");
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await TaskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.Id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task. Please try again.");
      console.error("Error deleting task:", err);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      status: "all",
      priority: "all",
      dueDate: "all"
    });
    setSearchQuery("");
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.status !== "all") count++;
    if (filters.priority !== "all") count++;
    if (filters.dueDate !== "all") count++;
    if (searchQuery) count++;
    return count;
  };

  const currentList = taskLists.find(list => list.Id === activeListId);

  return (
<div className="h-screen flex overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-purple-50/20">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        taskLists={taskLists}
        activeListId={activeListId}
        onListSelect={setActiveListId}
        taskCounts={taskCounts}
        onAddList={() => toast.info("Add new list feature coming soon!")}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onAddTask={handleAddTask}
          onSearch={setSearchQuery}
          onToggleSidebar={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">
                {currentList?.name || "All Tasks"}
              </h1>
              <p className="text-gray-600 font-body">
                {filteredTasks.length > 0 
                  ? `${filteredTasks.filter(t => !t.completed).length} pending, ${filteredTasks.filter(t => t.completed).length} completed`
                  : "No tasks to show"
                }
              </p>
            </motion.div>

            {/* Filter Bar */}
            <FilterBar
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={handleClearFilters}
              activeCount={getActiveFilterCount()}
            />

            {/* Task List */}
            <TaskList
              tasks={filteredTasks}
              loading={loading}
              error={error}
              onToggleComplete={handleToggleComplete}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onRetry={loadData}
            />
          </div>
        </main>
      </div>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={showTaskForm}
        task={editingTask}
        taskLists={taskLists}
        onSubmit={handleSubmitTask}
        onCancel={() => {
          setShowTaskForm(false);
          setEditingTask(null);
        }}
      />
    </div>
  );
};

export default Dashboard;