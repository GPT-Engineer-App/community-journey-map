import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus } from "lucide-react";

const SurveyForm = ({ onUpdate, onSubmit }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    onUpdate(formData, step);
  }, [formData, step, onUpdate]);

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const RatingQuestion = ({ question, field, caption }) => (
    <div className="space-y-2">
      <Label className="text-lg font-semibold text-gray-700">{question}</Label>
      <p className="text-sm text-gray-500">{caption}</p>
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <Button
            key={num}
            variant={formData[field] === num ? "default" : "outline"}
            className="w-10 h-10 rounded-full"
            onClick={() => handleInputChange(field, num)}
          >
            {num}
          </Button>
        ))}
      </div>
    </div>
  );

  const YesNoQuestion = ({ question, field }) => (
    <div className="space-y-2">
      <Label className="text-lg font-semibold text-gray-700">{question}</Label>
      <div className="flex gap-4">
        <Button
          variant={formData[field] === true ? "default" : "outline"}
          className="flex-1 py-6"
          onClick={() => handleInputChange(field, true)}
        >
          Yes
        </Button>
        <Button
          variant={formData[field] === false ? "default" : "outline"}
          className="flex-1 py-6"
          onClick={() => handleInputChange(field, false)}
        >
          No
        </Button>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Participant Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="participantName">Your Name</Label>
                <Input
                  id="participantName"
                  placeholder="Enter your full name"
                  value={formData.participantName || ""}
                  onChange={(e) => handleInputChange("participantName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="participantEmail">Your Email</Label>
                <Input
                  id="participantEmail"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.participantEmail || ""}
                  onChange={(e) => handleInputChange("participantEmail", e.target.value)}
                />
              </div>
              <div>
                <Label>Your Role</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Member", "Owner", "Admin", "Moderator", "CSM", "Support"].map((role) => (
                    <Button
                      key={role}
                      variant={formData.participantRole === role ? "default" : "outline"}
                      onClick={() => handleInputChange("participantRole", role)}
                      className="flex-grow"
                    >
                      {role}
                    </Button>
                  ))}
                </div>
              </div>
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
                <Select onValueChange={(value) => handleInputChange("membershipDuration", value)} value={formData.membershipDuration}>
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
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Daily", "Weekly", "Monthly", "Quarterly", "Rarely"].map((frequency) => (
                    <Button
                      key={frequency}
                      variant={formData.participationFrequency === frequency.toLowerCase() ? "default" : "outline"}
                      onClick={() => handleInputChange("participationFrequency", frequency.toLowerCase())}
                      className="flex-grow"
                    >
                      {frequency}
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">How often do you actively participate in community discussions or events?</p>
              </div>
              <div>
                <Label htmlFor="eventsAttended">Number of Events Attended (Last 3 Months)</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleInputChange("eventsAttended", Math.max(0, (parseInt(formData.eventsAttended) || 0) - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="eventsAttended"
                    type="number"
                    className="text-center"
                    value={formData.eventsAttended || "0"}
                    onChange={(e) => handleInputChange("eventsAttended", e.target.value)}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleInputChange("eventsAttended", (parseInt(formData.eventsAttended) || 0) + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Include both online and offline events, workshops, or webinars you've attended.</p>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Satisfaction and Retention</h2>
            <div className="space-y-6">
              <RatingQuestion
                question="Overall Satisfaction"
                field="overallSatisfaction"
                caption="1 = Extremely Dissatisfied, 10 = Extremely Satisfied"
              />
              <RatingQuestion
                question="Likelihood to Renew"
                field="likelihoodToRenew"
                caption="1 = Definitely Won't Renew, 10 = Definitely Will Renew"
              />
              <YesNoQuestion
                question="Have you seriously considered canceling your membership in the past 3 months?"
                field="considerCancellation"
              />
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
            <div className="space-y-6">
              <RatingQuestion
                question="Clear Pathway to Improvement"
                field="clearPathway"
                caption="How clear is the community's guidance on how to improve or achieve your goals? (1 = Very Unclear, 10 = Very Clear)"
              />
              <RatingQuestion
                question="Ease of Taking First Step"
                field="easeOfFirstStep"
                caption="How easy was it to take the first step towards your goals within the community? (1 = Very Difficult, 10 = Very Easy)"
              />
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
            <div className="space-y-6">
              <RatingQuestion
                question="Feeling of Welcome"
                field="feelingOfWelcome"
                caption="How welcome do you feel in the community? (1 = Not at all Welcome, 10 = Extremely Welcome)"
              />
              <RatingQuestion
                question="Connection to Community"
                field="connectionToCommunity"
                caption="How strong is your sense of connection to other community members? (1 = Very Weak, 10 = Very Strong)"
              />
              <RatingQuestion
                question="Perception of Community's Unique Personality"
                field="communityPersonality"
                caption="How clearly do you perceive the community's unique culture or personality? (1 = Not at all Clear, 10 = Very Clear)"
              />
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
          <Button onClick={handlePreviousStep}>Previous</Button>
        )}
        {step < 6 ? (
          <Button onClick={handleNextStep}>Next</Button>
        ) : (
          <Button onClick={onSubmit}>Submit</Button>
        )}
      </div>
    </div>
  );
};

export default SurveyForm;
