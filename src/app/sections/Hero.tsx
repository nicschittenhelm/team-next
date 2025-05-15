"use client";

import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

export default function Hero() {
  return (
    <ShaderGradientCanvas
      style={{
        position: "absolute",
        top: 0,
      }}
    >
      <ShaderGradient
        animate="on"
        type="waterPlane"
        wireframe={false}
        shader="defaults"
        uTime={0}
        uSpeed={0.1}
        uStrength={1.5}
        uDensity={2.5}
        uFrequency={5.5}
        positionX={-1.4}
        positionY={0}
        positionZ={0}
        rotationX={0}
        rotationY={10}
        rotationZ={50}
        color1="#F25042"
        color2="#A8C4BC"
        color3="#007D7E"
        reflection={0.1}
        // View (camera) props
        cAzimuthAngle={180}
        cPolarAngle={90}
        cDistance={3.6}
        cameraZoom={1}
        // Effect props
        lightType="3d"
        brightness={1.3}
        envPreset="city"
        grain="on"
        // Tool props
        toggleAxis={false} // axesHelper=off
        zoomOut={false} // based on zoomOut not explicitly set
        hoverState=""
        // Optional - if using transition features
        enableTransition={false}
      />
    </ShaderGradientCanvas>
  );
}
