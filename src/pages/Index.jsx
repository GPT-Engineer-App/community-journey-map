// Update this page (the content is just a fallback if you fail to update the page)

import { useState } from "react";
import SurveyForm from "../components/SurveyForm";
import CommunityProfile from "../components/CommunityProfile";

const Index = () => {
  const [surveyData, setSurveyData] = useState({});

  const handleSurveyUpdate = (newData) => {
    setSurveyData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-full lg:w-1/2 p-4 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Community Retention Survey</h1>
        <SurveyForm onUpdate={handleSurveyUpdate} />
      </div>
      <div className="w-full lg:w-1/2 p-4 bg-gray-100 overflow-y-auto">
        <CommunityProfile data={surveyData} />
      </div>
    </div>
  );
};

export default Index;
