import { usePlay } from "../contexts/Play.jsx";
import { Canvas } from "@react-three/fiber";
import Triangle from "./Triangle.jsx";
import { ScrollControls } from "@react-three/drei";
import { Experience } from "./Experience.jsx";
import { Overlay } from "./Overlay.jsx";
import { useMemo } from "react";
import { EffectComposer, Noise } from "@react-three/postprocessing";

export const CanvasWrapper = () => {
  const { play, end } = usePlay();

  const effects = useMemo(
    () => (
      <EffectComposer>
        <Noise opacity={0.08} />
      </EffectComposer>
    ),
    []
  );

  return (
    <div className="canvasWrapper">
      <Canvas>
        {!play && <Triangle />}

        <color attach="background" args={["#ececec"]} />
        <ScrollControls
          pages={play && !end ? 20 : 0}
          damping={0.5}
          style={{
            top: "10px",
            left: "0px",
            bottom: "10px",
            right: "10px",
            width: "auto",
            height: "auto",
            animation: "fadeIn 2.4s ease-in-out 1.2s forwards",
            opacity: 0,
          }}
        >
          <Experience />
        </ScrollControls>
        {effects}
      </Canvas>
      <Overlay />
    </div>
  );
};
