import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
            <h2 className="text-xl font-semibold mb-4">Member Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="communityName">Community Name</Label>
                <Input
                  id="communityName"
                  placeholder="Enter community name"
                  value={formData.communityName || ""}
                  onChange={(e) => handleInputChange("communityName", e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">Please enter the exact name of the community you're a part of.</p>
              </div>
              <div>
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
                <p className="text-sm text-gray-500 mt-1">Select the option that best represents how long you've been an active member.</p>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Engagement</h2>
            <div className="space-y-4">
              <div>
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
                <p className="text-sm text-gray-500 mt-1">How often do you actively participate in community discussions or events?</p>
              </div>
              <div>
                <Label htmlFor="eventsAttended">Number of Events Attended (Last 3 Months)</Label>
                <Input
                  id="eventsAttended"
                  type="number"
                  placeholder="Enter number of events"
                  value={formData.eventsAttended || ""}
                  onChange={(e) => handleInputChange("eventsAttended", e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">Include both online and offline events, workshops, or webinars you've attended.</p>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Satisfaction and Retention</h2>
            <div className="space-y-4">
              <div>
                <Label>Overall Satisfaction</Label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[formData.overallSatisfaction || 5]}
                  onValueChange={(value) => handleInputChange("overallSatisfaction", value[0])}
                />
                <p className="text-sm text-gray-500 mt-1">1 = Extremely Dissatisfied, 10 = Extremely Satisfied</p>
              </div>
              <div>
                <Label>Likelihood to Renew</Label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[formData.likelihoodToRenew || 5]}
                  onValueChange={(value) => handleInputChange("likelihoodToRenew", value[0])}
                />
                <p className="text-sm text-gray-500 mt-1">1 = Definitely Won't Renew, 10 = Definitely Will Renew</p>
              </div>
              <div>
                <Label>Consideration of Cancellation</Label>
                <RadioGroup onValueChange={(value) => handleInputChange("considerCancellation", value === "yes")}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="cancel-yes" />
                    <Label htmlFor="cancel-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="cancel-no" />
                    <Label htmlFor="cancel-no">No</Label>
                  </div>
                </RadioGroup>
                <p className="text-sm text-gray-500 mt-1">Have you seriously considered canceling your membership in the past 3 months?</p>
              </div>
              {formData.considerCancellation && (
                <div>
                  <Label htmlFor="cancellationReason">Primary Reason for Considering Cancellation</Label>
                  <Input
                    id="cancellationReason"
                    placeholder="Enter reason"
                    value={formData.cancellationReason || ""}
                    onChange={(e) => handleInputChange("cancellationReason", e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-1">Briefly explain the main reason you considered canceling.</p>
                </div>
              )}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Value and Improvement</h2>
            <div className="space-y-4">
              <div>
                <Label>Clear Pathway to Improvement</Label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[formData.clearPathway || 5]}
                  onValueChange={(value) => handleInputChange("clearPathway", value[0])}
                />
                <p className="text-sm text-gray-500 mt-1">How clear is the community's guidance on how to improve or achieve your goals? (1 = Very Unclear, 10 = Very Clear)</p>
              </div>
              <div>
                <Label>Ease of Taking First Step</Label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[formData.easeOfFirstStep || 5]}
                  onValueChange={(value) => handleInputChange("easeOfFirstStep", value[0])}
                />
                <p className="text-sm text-gray-500 mt-1">How easy was it to take the first step towards your goals within the community? (1 = Very Difficult, 10 = Very Easy)</p>
              </div>
              <div>
                <Label htmlFor="mostValuableAspect">Most Valuable Aspect</Label>
                <Textarea
                  id="mostValuableAspect"
                  placeholder="Enter most valuable aspect"
                  value={formData.mostValuableAspect || ""}
                  onChange={(e) => handleInputChange("mostValuableAspect", e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">What one feature or aspect of the community do you find most valuable?</p>
              </div>
              <div>
                <Label htmlFor="leastValuableAspect">Least Valuable Aspect</Label>
                <Textarea
                  id="leastValuableAspect"
                  placeholder="Enter least valuable aspect"
                  value={formData.leastValuableAspect || ""}
                  onChange={(e) => handleInputChange("leastValuableAspect", e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">What one feature or aspect of the community do you find least valuable or most in need of improvement?</p>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Community Connection</h2>
            <div className="space-y-4">
              <div>
                <Label>Feeling of Welcome</Label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[formData.feelingOfWelcome || 5]}
                  onValueChange={(value) => handleInputChange("feelingOfWelcome", value[0])}
                />
                <p className="text-sm text-gray-500 mt-1">How welcome do you feel in the community? (1 = Not at all Welcome, 10 = Extremely Welcome)</p>
              </div>
              <div>
                <Label>Connection to Community</Label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[formData.connectionToCommunity || 5]}
                  onValueChange={(value) => handleInputChange("connectionToCommunity", value[0])}
                />
                <p className="text-sm text-gray-500 mt-1">How strong is your sense of connection to other community members? (1 = Very Weak, 10 = Very Strong)</p>
              </div>
              <div>
                <Label>Perception of Community's Unique Personality</Label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[formData.communityPersonality || 5]}
                  onValueChange={(value) => handleInputChange("communityPersonality", value[0])}
                />
                <p className="text-sm text-gray-500 mt-1">How clearly do you perceive the community's unique culture or personality? (1 = Not at all Clear, 10 = Very Clear)</p>
              </div>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Goals and Support</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="primaryGoal">Primary Goal for Membership</Label>
                <Input
                  id="primaryGoal"
                  placeholder="Enter your primary goal"
                  value={formData.primaryGoal || ""}
                  onChange={(e) => handleInputChange("primaryGoal", e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">What is the main goal you hope to achieve through your membership?</p>
              </div>
              <div>
                <Label>Confidence in Achieving Goal</Label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[formData.goalConfidence || 5]}
                  onValueChange={(value) => handleInputChange("goalConfidence", value[0])}
                />
                <p className="text-sm text-gray-500 mt-1">How confident are you that you'll achieve this goal through the community? (1 = Not at all Confident, 10 = Extremely Confident)</p>
              </div>
              <div>
                <Label htmlFor="additionalSupport">Additional Support Needed</Label>
                <Textarea
                  id="additionalSupport"
                  placeholder="Enter additional support needed"
                  value={formData.additionalSupport || ""}
                  onChange={(e) => handleInputChange("additionalSupport", e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">What additional support or resources would help you achieve your goals faster?</p>
              </div>
            </div>
          </>
        );
      case 6:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Onboarding Experience</h2>
            <div className="space-y-4">
              <div>
                <Label>Satisfaction with Welcome Process</Label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[formData.welcomeProcessSatisfaction || 5]}
                  onValueChange={(value) => handleInputChange("welcomeProcessSatisfaction", value[0])}
                />
                <p className="text-sm text-gray-500 mt-1">How satisfied were you with the welcome process when you first joined? (1 = Very Dissatisfied, 10 = Very Satisfied)</p>
              </div>
              <div>
                <Label>Clarity of Initial Steps</Label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[formData.initialStepsClarity || 5]}
                  onValueChange={(value) => handleInputChange("initialStepsClarity", value[0])}
                />
                <p className="text-sm text-gray-500 mt-1">How clear were the initial steps you needed to take as a new member? (1 = Very Unclear, 10 = Very Clear)</p>
              </div>
              <div>
                <Label htmlFor="onboardingImprovements">Suggested Onboarding Improvements</Label>
                <Textarea
                  id="onboardingImprovements"
                  placeholder="Enter suggested improvements"
                  value={formData.onboardingImprovements || ""}
                  onChange={(e) => handleInputChange("onboardingImprovements", e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">What could we improve in our onboarding process for new members?</p>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
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
