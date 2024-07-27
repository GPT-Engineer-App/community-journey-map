import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

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
            <div className="flex items-center space-x-2">
              <Checkbox
                id="considerCancellation"
                checked={formData.considerCancellation || false}
                onCheckedChange={(checked) => handleInputChange("considerCancellation", checked)}
              />
              <Label htmlFor="considerCancellation">Considering Cancellation?</Label>
            </div>
            {formData.considerCancellation && (
              <>
                <Label htmlFor="cancellationReason">Primary Reason for Considering Cancellation</Label>
                <Input
                  id="cancellationReason"
                  value={formData.cancellationReason || ""}
                  onChange={(e) => handleInputChange("cancellationReason", e.target.value)}
                />
              </>
            )}
          </>
        );
      case 3:
        return (
          <>
            <Label>Clear Pathway to Improvement</Label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[formData.clearPathway || 5]}
              onValueChange={(value) => handleInputChange("clearPathway", value[0])}
            />
            <Label>Ease of Taking First Step</Label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[formData.easeOfFirstStep || 5]}
              onValueChange={(value) => handleInputChange("easeOfFirstStep", value[0])}
            />
            <Label htmlFor="mostValuableAspect">Most Valuable Aspect</Label>
            <Textarea
              id="mostValuableAspect"
              value={formData.mostValuableAspect || ""}
              onChange={(e) => handleInputChange("mostValuableAspect", e.target.value)}
            />
            <Label htmlFor="leastValuableAspect">Least Valuable Aspect</Label>
            <Textarea
              id="leastValuableAspect"
              value={formData.leastValuableAspect || ""}
              onChange={(e) => handleInputChange("leastValuableAspect", e.target.value)}
            />
          </>
        );
      case 4:
        return (
          <>
            <Label>Feeling of Welcome</Label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[formData.feelingOfWelcome || 5]}
              onValueChange={(value) => handleInputChange("feelingOfWelcome", value[0])}
            />
            <Label>Connection to Community</Label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[formData.connectionToCommunity || 5]}
              onValueChange={(value) => handleInputChange("connectionToCommunity", value[0])}
            />
            <Label>Perception of Community's Unique Personality</Label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[formData.communityPersonality || 5]}
              onValueChange={(value) => handleInputChange("communityPersonality", value[0])}
            />
          </>
        );
      case 5:
        return (
          <>
            <Label htmlFor="primaryGoal">Primary Goal for Membership</Label>
            <Input
              id="primaryGoal"
              value={formData.primaryGoal || ""}
              onChange={(e) => handleInputChange("primaryGoal", e.target.value)}
            />
            <Label>Confidence in Achieving Goal</Label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[formData.goalConfidence || 5]}
              onValueChange={(value) => handleInputChange("goalConfidence", value[0])}
            />
            <Label htmlFor="additionalSupport">Additional Support Needed</Label>
            <Textarea
              id="additionalSupport"
              value={formData.additionalSupport || ""}
              onChange={(e) => handleInputChange("additionalSupport", e.target.value)}
            />
          </>
        );
      case 6:
        return (
          <>
            <Label>Satisfaction with Welcome Process</Label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[formData.welcomeProcessSatisfaction || 5]}
              onValueChange={(value) => handleInputChange("welcomeProcessSatisfaction", value[0])}
            />
            <Label>Clarity of Initial Steps</Label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[formData.initialStepsClarity || 5]}
              onValueChange={(value) => handleInputChange("initialStepsClarity", value[0])}
            />
            <Label htmlFor="onboardingImprovements">Suggested Onboarding Improvements</Label>
            <Textarea
              id="onboardingImprovements"
              value={formData.onboardingImprovements || ""}
              onChange={(e) => handleInputChange("onboardingImprovements", e.target.value)}
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
        {step < 6 ? (
          <Button onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button onClick={() => console.log("Survey completed")}>Submit</Button>
        )}
      </div>
    </div>
  );
};

export default SurveyForm;
