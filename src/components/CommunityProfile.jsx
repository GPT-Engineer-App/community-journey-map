import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CommunityProfile = ({ data }) => {
  const [healthScore, setHealthScore] = useState(0);
  const [retentionScore, setRetentionScore] = useState(0);
  const [engagementIndex, setEngagementIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    const calculateHealthScore = () => {
      let score = 0;
      let factors = 0;

      if (data.overallSatisfaction) {
        score += parseInt(data.overallSatisfaction);
        factors++;
      }

      if (data.likelihoodToRenew) {
        score += parseInt(data.likelihoodToRenew);
        factors++;
      }

      if (data.participationFrequency) {
        const frequencyScore = {
          daily: 5,
          weekly: 4,
          monthly: 3,
          quarterly: 2,
          rarely: 1
        }[data.participationFrequency] || 0;
        score += frequencyScore;
        factors++;
      }

      return factors > 0 ? Math.round((score / factors) * 10) : 0;
    };

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

    setHealthScore(calculateHealthScore());
    setRetentionScore(calculateRetentionScore());
    setEngagementIndex(calculateEngagementIndex());
  }, [data]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

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
        <RadarChart outerRadius={90} width={400} height={300} data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 10]} />
          <Radar name="Community" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      ),
    },
    {
      title: "NPS Distribution",
      chart: (
        <PieChart width={400} height={300}>
          <Pie
            data={npsData}
            cx={200}
            cy={150}
            innerRadius={60}
            outerRadius={80}
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
      ),
    },
    {
      title: "Membership Duration vs. Retention Score",
      chart: (
        <BarChart width={400} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      ),
    },
    {
      title: "Key Metrics",
      chart: (
        <LineChart width={400} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Community Profile</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Community Health Score</h3>
        <div className="relative w-full h-8 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full">
          <div
            className="absolute top-0 right-0 bottom-0 bg-white rounded-full transition-all duration-500 ease-out"
            style={{ left: `${healthScore * 10}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white drop-shadow">{healthScore}</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Visualizations</h3>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {visualizations.map((viz, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0">
                  <h4 className="text-lg font-semibold mb-2">{viz.title}</h4>
                  {viz.chart}
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" size="icon" className="absolute left-0 top-1/2 transform -translate-y-1/2" onClick={scrollPrev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="absolute right-0 top-1/2 transform -translate-y-1/2" onClick={scrollNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityProfile;
