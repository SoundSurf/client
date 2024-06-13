import { useState } from "react";

type UseFunnelProps = {
  stepLength: number;
};

const useFunnel = ({ stepLength }: UseFunnelProps) => {
  const [funnelStep, setFunnelStep] = useState(0);

  const moveStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < stepLength) {
      setFunnelStep(stepIndex);
    }
  };

  const goToNextStep = () => {
    moveStep(funnelStep + 1);
  };

  const goToPreviousStep = () => {
    moveStep(funnelStep - 1);
  };

  return { funnelStep, goToNextStep, goToPreviousStep, moveStep };
};

export default useFunnel;
