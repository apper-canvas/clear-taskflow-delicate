import { cn } from "@/utils/cn";
import ProviderIcon from "@/components/ProviderIcon";
import Badge from "@/components/atoms/Badge";

const TaskListItem = ({ 
  list, 
  isActive, 
  taskCount = 0, 
  onClick, 
  className,
  ...props 
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group hover:scale-[1.02]",
        isActive 
? "bg-gradient-to-r from-primary/10 to-purple-100 text-primary border border-primary/20 shadow-md" 
          : "text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:shadow-sm",
        className
      )}
      {...props}
    >
      <div className={cn(
        "w-2 h-2 rounded-full transition-all duration-200",
        list.color ? `bg-${list.color}` : "bg-gradient-to-r from-gray-400 to-gray-500"
      )} />
      
<ProviderIcon 
        name={list.icon || "List"} 
        size={18} 
        className={cn(
          "transition-all duration-200",
          isActive ? "text-primary" : "text-gray-500 group-hover:text-gray-700"
        )} 
      />
      <span className={cn(
        "flex-1 font-medium font-display transition-all duration-200",
        isActive ? "text-primary" : "text-gray-700 group-hover:text-gray-900"
      )}>
        {list.name}
      </span>
      
      {taskCount > 0 && (
        <Badge 
          variant={isActive ? "primary" : "gray"} 
          size="sm"
          className="transition-all duration-200"
        >
          {taskCount}
        </Badge>
      )}
    </button>
  );
};

export default TaskListItem;