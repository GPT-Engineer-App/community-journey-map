import { useEffect, useState, useCallback, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CommunityProfile = ({ data }) => {
  const [healthScore, setHealthScore] = useState(0);
  const [retentionScore, setRetentionScore] = useState(0);
  const [engagementIndex, setEngagementIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [autoplay, setAutoplay] = useState(true);

  const toggleAutoplay = useCallback(() => {
    setAutoplay((prev) => !prev);
  }, []);

  const calculateHealthScore = useMemo(() => {
    let score = 0;
    let maxScore = 0;

    // Overall Satisfaction (0-10)
    if (data.overallSatisfaction) {
      score += parseInt(data.overallSatisfaction);
      maxScore += 10;
    }

    // Likelihood to Renew (0-10)
    if (data.likelihoodToRenew) {
      score += parseInt(data.likelihoodToRenew);
      maxScore += 10;
    }

    // Participation Frequency
    if (data.participationFrequency) {
      const frequencyScore = {
        daily: 5,
        weekly: 4,
        monthly: 3,
        quarterly: 2,
        rarely: 1
      }[data.participationFrequency] || 0;
      score += frequencyScore;
      maxScore += 5;
    }

    // Events Attended (0-5)
    if (data.eventsAttended) {
      const eventsScore = Math.min(parseInt(data.eventsAttended), 5);
      score += eventsScore;
      maxScore += 5;
    }

    // Feeling of Welcome (0-10)
    if (data.feelingOfWelcome) {
      score += parseInt(data.feelingOfWelcome);
      maxScore += 10;
    }

    // Connection to Community (0-10)
    if (data.connectionToCommunity) {
      score += parseInt(data.connectionToCommunity);
      maxScore += 10;
    }

    // Welcome Process Satisfaction (0-10)
    if (data.welcomeProcessSatisfaction) {
      score += parseInt(data.welcomeProcessSatisfaction);
      maxScore += 10;
    }

    // Clear Pathway to Improvement (0-10)
    if (data.clearPathway) {
      score += parseInt(data.clearPathway);
      maxScore += 10;
    }

    // Ease of Taking First Step (0-10)
    if (data.easeOfFirstStep) {
      score += parseInt(data.easeOfFirstStep);
      maxScore += 10;
    }

    // Goal Confidence (0-10)
    if (data.goalConfidence) {
      score += parseInt(data.goalConfidence);
      maxScore += 10;
    }

    // Initial Steps Clarity (0-10)
    if (data.initialStepsClarity) {
      score += parseInt(data.initialStepsClarity);
      maxScore += 10;
    }

    // Considering Cancellation (boolean)
    if (data.considerCancellation === false) {
      score += 10;
    }
    maxScore += 10;

    return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  }, [data]);

  useEffect(() => {
    setHealthScore(calculateHealthScore);

    const calculateRetentionScore = () => {
      const likelihood = parseInt(data.likelihoodToRenew) || 0;
      const satisfaction = parseInt(data.overallSatisfaction) || 0;
      return Math.round((likelihood + satisfaction) / 2);
    };

    const calculateEngagementIndex = () => {
      const frequencyPoints = {
        daily: 5,
        weekly: 4,
        monthly: 3,
        quarterly: 2,
        rarely: 1
      }[data.participationFrequency] || 0;
      const eventsPoints = Math.min(parseInt(data.eventsAttended) || 0, 5);
      return Math.round((frequencyPoints + eventsPoints) / 2);
    };

    setRetentionScore(calculateRetentionScore());
    setEngagementIndex(calculateEngagementIndex());
  }, [data, calculateHealthScore]);

  useEffect(() => {
    if (!emblaApi || !autoplay) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 3000);
    return () => clearInterval(interval);
  }, [emblaApi, autoplay]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const chartData = [
    { name: 'Satisfaction', value: parseInt(data.overallSatisfaction) || 0 },
    { name: 'Renewal', value: parseInt(data.likelihoodToRenew) || 0 },
    { name: 'Health Score', value: healthScore },
  ];

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
      title: "Membership Duration vs. Retention Score",
      chart: (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: "Key Metrics",
      chart: (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      ),
    },
  ];

  return (
    <div className="space-y-4 bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-blue-800">Community Profile</h2>
      <motion.div 
        className="bg-white p-4 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-2 text-purple-800">Community Health Score</h3>
        <div className="relative w-full h-8 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gray-200 rounded-full shadow-inner"></div>
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-gray-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
            initial={{ width: "0%" }}
            animate={{ width: `${healthScore}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800 drop-shadow">{healthScore}%</span>
          </div>
        </div>
      </motion.div>
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
