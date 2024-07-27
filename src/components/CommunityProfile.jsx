import { useEffect, useState, useCallback, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CommunityProfile = ({ data, isMobile }) => {
  const [healthScore, setHealthScore] = useState(0);
  const [retentionScore, setRetentionScore] = useState(0);
  const [engagementIndex, setEngagementIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [autoplay, setAutoplay] = useState(true);

  const toggleAutoplay = useCallback(() => {
    setAutoplay((prev) => !prev);
  }, []);

  const calculateHealthScore = useMemo(() => {
    // ... (keep the existing calculation logic)
  }, [data]);

  useEffect(() => {
    setHealthScore(calculateHealthScore);
    // ... (keep the rest of the useEffect logic)
  }, [data, calculateHealthScore]);

  useEffect(() => {
    if (!emblaApi || !autoplay) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 3000);
    return () => clearInterval(interval);
  }, [emblaApi, autoplay]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // ... (keep the chartData, radarData, npsData, and visualizations definitions)

  const renderHealthScore = () => (
    <motion.div 
      className="bg-white p-4 rounded-lg shadow-lg"
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

  if (isMobile) {
    return renderHealthScore();
  }

  return (
    <div className="space-y-4 bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-blue-800">Community Profile</h2>
      {renderHealthScore()}
      <motion.div 
        className="bg-white p-4 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-purple-800">Visualizations</h3>
          <Button variant="outline" size="sm" onClick={toggleAutoplay}>
            {autoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {visualizations.map((viz, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                  <h4 className="text-lg font-semibold mb-2 text-blue-700">{viz.title}</h4>
                  {viz.chart}
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" size="icon" className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" onClick={scrollPrev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" onClick={scrollNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CommunityProfile;
