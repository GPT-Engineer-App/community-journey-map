// Update this page (the content is just a fallback if you fail to update the page)

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SurveyForm from "../components/SurveyForm";
import CommunityProfile from "../components/CommunityProfile";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

const Index = () => {
  const [surveyData, setSurveyData] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDeviceSize = () => {
      if (window.innerWidth < 640) {
        setIsMobile('mobile');
      } else if (window.innerWidth < 1024) {
        setIsMobile('tablet');
      } else {
        setIsMobile(false);
      }
    };
    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  const handleSurveyUpdate = (newData, step) => {
    setSurveyData(newData);
    setCurrentStep(step);
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
      <div className="flex-grow flex flex-col lg:flex-row relative">
        <motion.div
          className="p-4 overflow-y-auto"
          initial={{ width: "100%" }}
          animate={{ width: currentStep > 0 && !isMobile ? "50%" : "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {renderSurveyOrSummary()}
        </motion.div>
        <AnimatePresence>
          {currentStep > 0 && (
            <motion.div
              className={`${
                isMobile === 'mobile'
                  ? 'absolute inset-x-0 bottom-0 h-1/2'
                  : isMobile === 'tablet'
                  ? 'w-full'
                  : 'w-1/2'
              } bg-white rounded-t-3xl lg:rounded-none shadow-lg lg:shadow-none`}
              initial={isMobile !== false ? { y: "100%" } : { x: "100%" }}
              animate={isMobile !== false ? { y: 0 } : { x: 0 }}
              exit={isMobile !== false ? { y: "100%" } : { x: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="h-1.5 w-12 bg-gray-300 rounded-full mx-auto my-2 lg:hidden" />
              <div className="p-4 overflow-y-auto h-full">
                <CommunityProfile data={surveyData} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
