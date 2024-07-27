import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const CommunityProfile = ({ data }) => {
  const [healthScore, setHealthScore] = useState(0);
  const [retentionScore, setRetentionScore] = useState(0);
  const [engagementIndex, setEngagementIndex] = useState(0);

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

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Community Profile</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Community Health Score</h3>
        <div className="text-4xl font-bold text-blue-600">{healthScore}</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Key Metrics</h3>
        <LineChart width={400} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Community Radar</h3>
        <RadarChart outerRadius={90} width={400} height={300} data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 10]} />
          <Radar name="Community" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </div>
    </div>
  );
};

export default CommunityProfile;
