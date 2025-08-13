import { motion } from "framer-motion";
import ProviderIcon from "@/components/ProviderIcon";
import Button from "@/components/atoms/Button";

const Error = ({ 
  message = "Something went wrong while loading your tasks.",
  onRetry
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-error/5 to-red-50 rounded-2xl border border-error/20 p-8 text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-r from-error/10 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
<ProviderIcon name="AlertTriangle" size={32} className="text-error" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-6 font-body max-w-md mx-auto">
        {message}
      </p>
      
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="primary"
          className="flex items-center gap-2"
        >
<ProviderIcon name="RefreshCw" size={18} />
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default Error;