// Update this page (the content is just a fallback if you fail to update the page)

import { useState } from "react";
import SurveyForm from "../components/SurveyForm";
import CommunityProfile from "../components/CommunityProfile";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

const Index = () => {
  const [surveyData, setSurveyData] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const handleSurveyUpdate = (newData) => {
    setSurveyData(newData);
  };

  const handleSubmit = () => {
    setShowSummary(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Community Retention Survey',
        text: 'Take our Community Retention Survey!',
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      console.log('Web Share API not supported');
      // Fallback behavior here (e.g., copy link to clipboard)
    }
  };

  const renderSurveyOrSummary = () => {
    if (showSummary) {
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Survey Summary</h2>
          {Object.entries(surveyData).map(([key, value]) => (
            <div key={key} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold">{key}</h3>
              <p>{value}</p>
            </div>
          ))}
          <Button onClick={handleShare} className="mt-4">
            <Share2 className="mr-2 h-4 w-4" /> Share Survey
          </Button>
        </div>
      );
    }
    return <SurveyForm onUpdate={handleSurveyUpdate} onSubmit={handleSubmit} />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Community Retention Survey</h1>
        {surveyData.communityName && (
          <span className="text-lg font-semibold text-gray-600">{surveyData.communityName} - Community Profile</span>
        )}
      </header>
      <div className="flex-grow flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-4 overflow-y-auto">
          {renderSurveyOrSummary()}
        </div>
        <div className="w-full lg:w-1/2 p-4 overflow-y-auto">
          <CommunityProfile data={surveyData} />
        </div>
      </div>
    </div>
  );
};

export default Index;
