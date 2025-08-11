import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";

const TaskForm = ({ 
  task = null, 
  taskLists = [], 
  onSubmit, 
  onCancel,
  isOpen = false 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    priority: "medium",
    dueDate: "",
    listId: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : "",
        listId: task.listId || ""
      });
    } else {
      setFormData({
        title: "",
        priority: "medium",
        dueDate: "",
        listId: taskLists.length > 0 ? taskLists[0].Id : ""
      });
    }
    setErrors({});
  }, [task, taskLists, isOpen]);

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }
    
    if (!formData.listId) {
      newErrors.listId = "Please select a list";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const taskData = {
      ...formData,
      title: formData.title.trim(),
      dueDate: formData.dueDate || null,
      listId: parseInt(formData.listId)
    };
    
    onSubmit(taskData);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-display">
            {task ? "Edit Task" : "Add New Task"}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-gray-500"
          >
            <ApperIcon name="X" size={18} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Task Title"
            required
            error={errors.title}
          >
            <Input
              value={formData.title}
              onChange={handleChange("title")}
              placeholder="What needs to be done?"
              error={errors.title}
              autoFocus
            />
          </FormField>

          <FormField
            label="List"
            required
            error={errors.listId}
          >
            <Select
              value={formData.listId}
              onChange={handleChange("listId")}
              error={errors.listId}
            >
              <option value="">Select a list...</option>
              {taskLists.map((list) => (
                <option key={list.Id} value={list.Id}>
                  {list.name}
                </option>
              ))}
            </Select>
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Priority">
              <Select
                value={formData.priority}
                onChange={handleChange("priority")}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </Select>
            </FormField>

            <FormField label="Due Date">
              <Input
                type="date"
                value={formData.dueDate}
                onChange={handleChange("dueDate")}
              />
            </FormField>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              {task ? "Update Task" : "Add Task"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default TaskForm;