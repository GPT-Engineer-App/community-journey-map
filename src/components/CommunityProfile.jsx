import { useEffect, useState, useCallback, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const CommunityProfile = ({ data, isMobile, isLoading }) => {
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

  const chartData = useMemo(() => {
    const membershipDuration = data.membershipDuration || '0-3';
    return [
      {
        duration: membershipDuration,
        Satisfaction: parseInt(data.overallSatisfaction) || 0,
        Retention: retentionScore,
        Engagement: engagementIndex * 2, // Multiply by 2 to scale it to 0-10 range
      }
    ];
  }, [data.membershipDuration, data.overallSatisfaction, retentionScore, engagementIndex]);

  const radarData = [
    { subject: 'Retention', A: retentionScore, fullMark: 10 },
    { subject: 'Engagement', A: engagementIndex, fullMark: 5 },
    { subject: 'Welcome', A: parseInt(data.feelingOfWelcome) || 0, fullMark: 10 },
    { subject: 'Connection', A: parseInt(data.connectionToCommunity) || 0, fullMark: 10 },
    { subject: 'Onboarding', A: parseInt(data.welcomeProcessSatisfaction) || 0, fullMark: 10 },
  ];

  const npsData = [
    { name: 'Promoters', value: 60 },
    { name: 'Passives', value: 30 },
    { name: 'Detractors', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const visualizations = [
    {
      title: "Retention Radar Chart",
      chart: (
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart outerRadius="80%" data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 10]} />
            <Radar name="Community" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: "NPS Distribution",
      chart: (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={npsData}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {npsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: "Key Metrics by Membership Duration",
      chart: (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="duration" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Satisfaction" fill="#8884d8" />
            <Bar dataKey="Retention" fill="#82ca9d" />
            <Bar dataKey="Engagement" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
  ];

  const renderHealthScore = () => (
    <motion.div 
      className="bg-white p-4 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold mb-2 text-purple-800">Community Health Score</h3>
      {isLoading ? (
        <Skeleton className="h-8 w-full" />
      ) : (
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
      )}
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
              {isLoading ? (
                <div className="flex-[0_0_100%] min-w-0 px-4">
                  <Skeleton className="h-64 w-full" />
                </div>
              ) : (
                visualizations.map((viz, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                    <h4 className="text-lg font-semibold mb-2 text-blue-700">{viz.title}</h4>
                    {viz.chart}
                  </div>
                ))
              )}
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
