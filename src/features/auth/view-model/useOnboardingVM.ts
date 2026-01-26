import { useState } from 'react';

export function useOnboardingVM() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  return {
    currentStep,
    nextStep,
    previousStep,
  };
}
