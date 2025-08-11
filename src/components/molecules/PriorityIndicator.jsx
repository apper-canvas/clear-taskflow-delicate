import { cn } from "@/utils/cn";

const PriorityIndicator = ({ priority, className, ...props }) => {
  const priorityConfig = {
    high: {
      color: "bg-gradient-to-r from-error to-red-500",
      label: "High Priority",
      animate: "animate-pulse-priority"
    },
    medium: {
      color: "bg-gradient-to-r from-warning to-yellow-500",
      label: "Medium Priority",
      animate: ""
    },
    low: {
      color: "bg-gradient-to-r from-success to-emerald-500",
      label: "Low Priority",
      animate: ""
    }
  };

  const config = priorityConfig[priority] || priorityConfig.low;

  return (
    <div
      className={cn(
        "w-3 h-3 rounded-full shadow-sm",
        config.color,
        priority === "high" && config.animate,
        className
      )}
      title={config.label}
      {...props}
    />
  );
};

export default PriorityIndicator;