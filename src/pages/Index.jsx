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
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-3xl font-bold mb-4">Community Retention Survey</h1>
        <SurveyForm onUpdate={handleSurveyUpdate} />
      </div>
      <div className="w-full md:w-1/2 p-4 bg-gray-100">
        <CommunityProfile data={surveyData} />
      </div>
    </div>
  );
};

export default Index;
