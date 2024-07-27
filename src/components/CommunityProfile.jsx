import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CommunityProfile = ({ data }) => {
  const [healthScore, setHealthScore] = useState(0);

  useEffect(() => {
    // Calculate health score based on available data
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

    setHealthScore(calculateHealthScore());
  }, [data]);

  const chartData = [
    { name: 'Satisfaction', value: parseInt(data.overallSatisfaction) || 0 },
    { name: 'Renewal', value: parseInt(data.likelihoodToRenew) || 0 },
    { name: 'Health Score', value: healthScore },
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
    </div>
  );
};

export default CommunityProfile;
