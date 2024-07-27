import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

const CommunityProfile = ({ data, isMobile }) => {
  const [healthScore, setHealthScore] = useState(0);

  const calculateHealthScore = useMemo(() => {
    // ... (keep the existing calculation logic)
  }, [data]);

  useEffect(() => {
    setHealthScore(calculateHealthScore);
  }, [data, calculateHealthScore]);

  if (isMobile) {
    return (
      <motion.div 
        className="bg-white p-4 rounded-t-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-2 text-purple-800">Community Health Score</h3>
        <div className="relative w-full h-8 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-gray-100 bg-opacity-80 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${healthScore}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800 drop-shadow">{healthScore}%</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4 bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-blue-800">Community Profile</h2>
      {/* ... (keep the existing desktop view content) */}
    </div>
  );
};

export default CommunityProfile;
