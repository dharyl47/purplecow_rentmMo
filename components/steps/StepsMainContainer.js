"use client";

import StepContainer from "./StepsContainer";

import StepForm1 from "./Forms/StepForm1";
import StepForm2 from "./Forms/StepForm2";

const stepsData = [
  {
    title: "Step 1",
    description: "Description of step 1",
    form: <StepForm1 />
  },
  { title: "Step 2", description: "Description of step 2", form: <StepForm2 /> }
];
const StepsMainContainer = () => {
  const handleFinish = formData => {
    // Handle form submission or navigation after completing all steps
    console.log("All steps completed", formData);
  };

  return (
    <div>
      <h1>My Page</h1>
      <StepContainer stepsData={stepsData} onFinish={handleFinish} />
    </div>
  );
};

export default StepsMainContainer;
