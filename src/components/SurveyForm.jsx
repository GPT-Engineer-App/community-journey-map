import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const SurveyForm = ({ onUpdate }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleInputChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <Label htmlFor="communityName">Community Name</Label>
            <Input
              id="communityName"
              value={formData.communityName || ""}
              onChange={(e) => handleInputChange("communityName", e.target.value)}
            />
            <Label htmlFor="membershipDuration">Membership Duration</Label>
            <Select onValueChange={(value) => handleInputChange("membershipDuration", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-3">0-3 months</SelectItem>
                <SelectItem value="4-6">4-6 months</SelectItem>
                <SelectItem value="7-12">7-12 months</SelectItem>
                <SelectItem value="1-2">1-2 years</SelectItem>
                <SelectItem value="2+">2+ years</SelectItem>
              </SelectContent>
            </Select>
          </>
        );
      case 1:
        return (
          <>
            <Label htmlFor="participationFrequency">Participation Frequency</Label>
            <Select onValueChange={(value) => handleInputChange("participationFrequency", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="rarely">Rarely</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="eventsAttended">Number of Events Attended (Last 3 Months)</Label>
            <Input
              id="eventsAttended"
              type="number"
              value={formData.eventsAttended || ""}
              onChange={(e) => handleInputChange("eventsAttended", e.target.value)}
            />
          </>
        );
      case 2:
        return (
          <>
            <Label>Overall Satisfaction</Label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[formData.overallSatisfaction || 5]}
              onValueChange={(value) => handleInputChange("overallSatisfaction", value[0])}
            />
            <Label>Likelihood to Renew</Label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[formData.likelihoodToRenew || 5]}
              onValueChange={(value) => handleInputChange("likelihoodToRenew", value[0])}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {renderStep()}
      <div className="flex justify-between">
        {step > 0 && (
          <Button onClick={() => setStep(step - 1)}>Previous</Button>
        )}
        {step < 2 ? (
          <Button onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button onClick={() => console.log("Survey completed")}>Submit</Button>
        )}
      </div>
    </div>
  );
};

export default SurveyForm;
