import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-4"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 pt-1">
              <div className="w-5 h-5 bg-gray-200 rounded-md skeleton" />
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded skeleton w-3/4" />
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-200 rounded-full skeleton" />
                    <div className="h-3 bg-gray-200 rounded skeleton w-20" />
                    <div className="h-3 bg-gray-200 rounded skeleton w-16" />
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg skeleton" />
                  <div className="w-8 h-8 bg-gray-200 rounded-lg skeleton" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;