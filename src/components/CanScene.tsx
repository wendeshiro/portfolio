"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Center,
  Environment,
  Float,
  Html,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import FruitTeaCan from "@/components/FruitTeaCan";

type CanSceneProps = {
  shouldActivate: boolean;
};

const FLAVORS = [
  {
    id: "peach",
    name: "Peach",
    texture: "/model-textures/label-for-blender-peach.png",
    color: "bg-[#e87a90]",
  },
  {
    id: "orange",
    name: "Orange",
    texture: "/model-textures/label-for-blender-orange.png",
    color: "bg-[#fb8500]",
  },
  {
    id: "apple",
    name: "Apple",
    texture: "/model-textures/label-for-blender-apple.png",
    color: "bg-[#f9443c]",
  },
];

export default function CanScene({ shouldActivate }: CanSceneProps) {
  const [currentTexture, setCurrentTexture] = useState(FLAVORS[0].texture);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [fallbackReady, setFallbackReady] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [isCanHovered, setIsCanHovered] = useState(false);
  const [isCanDragging, setIsCanDragging] = useState(false);

  const canvasReady = shouldActivate || fallbackReady;
  const showCanvasLoader = !canvasReady || !assetsLoaded;

  useEffect(() => {
    if (!shouldActivate) {
      return;
    }

    FLAVORS.forEach((flavor) => {
      useTexture.preload(flavor.texture);
    });

    const assetReadyTimer = window.setTimeout(() => {
      setAssetsLoaded(true);
    }, 800);

    return () => window.clearTimeout(assetReadyTimer);
  }, [shouldActivate]);

  useEffect(() => {
    if (shouldActivate) {
      return;
    }

    let assetFallbackTimer: number | undefined;

    const fallbackTimer = window.setTimeout(() => {
      setFallbackReady(true);
      assetFallbackTimer = window.setTimeout(() => {
        setAssetsLoaded(true);
      }, 1000);
    }, 1800);

    return () => {
      window.clearTimeout(fallbackTimer);
      if (assetFallbackTimer) {
        window.clearTimeout(assetFallbackTimer);
      }
    };
  }, [shouldActivate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const resetDragging = () => setIsCanDragging(false);

    window.addEventListener("pointerup", resetDragging);
    window.addEventListener("pointercancel", resetDragging);
    window.addEventListener("blur", resetDragging);

    return () => {
      window.removeEventListener("pointerup", resetDragging);
      window.removeEventListener("pointercancel", resetDragging);
      window.removeEventListener("blur", resetDragging);
    };
  }, []);

  return (
    <section className="relative mt-5 flex h-[80vh] w-full flex-col items-center overflow-hidden pt-5 md:h-[90vh] md:pt-0">
      {/* label control panel */}
      <div className="absolute top-1 left-2 z-10 flex w-full justify-center md:top-0 md:right-2 md:left-auto md:h-full md:w-36 md:flex-col">
        <div className="flex flex-row space-x-4 md:flex-col md:space-y-2">
          {FLAVORS.map((flavor) => (
            <button
              key={flavor.id}
              onClick={() => setCurrentTexture(flavor.texture)}
              className={`flex w-25 cursor-pointer items-center justify-center rounded-2xl border px-3 py-2 transition-all duration-600 ease-out md:w-full md:justify-start md:border-2 md:px-5 ${
                currentTexture === flavor.texture
                  ? "scale-105 border-gray-600"
                  : "border-transparent hover:border-gray-300"
              } `}
            >
              {/* color dot */}
              <div
                className={`h-3 w-3 rounded-full md:h-5 md:w-5 ${flavor.color} mr-2 shadow-sm md:mr-3`}
              ></div>

              {/* Text */}
              <div>
                <p
                  className={`text-sm font-semibold transition-colors md:text-lg ${currentTexture === flavor.texture ? "text-black" : "text-gray-700"}`}
                >
                  {flavor.name}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3D can section */}
      <div
        id="interactive-3d-can"
        className={`relative h-full w-[80vw] md:w-full ${isCanDragging ? "cursor-grabbing" : isCanHovered ? "cursor-pointer" : ""}`}
      >
        {canvasReady ? (
          <Canvas camera={{ position: [2, 1, 2], fov: isMobile ? 3.5 : 2.5 }}>
            <Environment preset="city" />
            <ambientLight intensity={0.6} />
            <spotLight
              position={[-3, -2, 2]}
              angle={0.2}
              penumbra={0.5}
              intensity={7}
            />

            <Suspense
              fallback={
                <Html center>
                  <div>Loading 3D Model...</div>
                </Html>
              }
            >
              <Float
                speed={0.7}
                rotationIntensity={3}
                floatIntensity={1.5}
                floatingRange={[-0.005, 0.005]}
              >
                <Center rotation={[-0.1, 0.0, 0.4]}>
                  <FruitTeaCan
                    textureUrl={currentTexture}
                    scale={1}
                    onHoverChange={setIsCanHovered}
                    onDragChange={setIsCanDragging}
                  />
                </Center>
              </Float>
            </Suspense>

            <OrbitControls makeDefault enableZoom={false} />
          </Canvas>
        ) : null}

        {showCanvasLoader && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
            <div className="rounded-full border border-gray-200 bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
              Loading 3D Model...
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
