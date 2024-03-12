// components/StepContainer.js

import { useState } from "react";
import Step from "./Step";

const StepContainer = ({ stepsData, onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFormSubmit = () => {
    if (currentStep === stepsData.length - 1) {
      onFinish(formData);
    } else {
      nextStep();
    }
  };

  return (
    <div>
      <Step
        number={currentStep + 1}
        title={stepsData[currentStep].title}
        description={stepsData[currentStep].description}
        onSubmit={handleFormSubmit}
      >
        {stepsData[currentStep].form}
      </Step>
      <div>
        {currentStep > 0 && <button onClick={prevStep}>Previous Step</button>}
        {currentStep < stepsData.length - 1 && (
          <button type="submit">Next Step</button>
        )}
      </div>
    </div>
  );
};

export default StepContainer;
