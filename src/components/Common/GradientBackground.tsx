import { getRandomGradient } from "@/utils/defaultGradient";
import { Gradient } from "@/utils/gradient";
import React, { useEffect, useState } from "react";

interface Props {}

const GradientBackground = ({}: Props) => {
  const [colors, setColors] = useState(getRandomGradient());

  let gradient = new Gradient();

  useEffect(() => {
    if (typeof window !== "undefined") {
      gradient.initGradient("#gradient-canvas", colors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors]);

  return <canvas id="gradient-canvas" className={`w-full h-full absolute`} />;
};

export default GradientBackground;
