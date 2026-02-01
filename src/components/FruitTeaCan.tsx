"use client";

import * as THREE from "three";
import { useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Plane027: THREE.Mesh;
    Circle001: THREE.Mesh;
    BezierCurve002: THREE.Mesh;
    BezierCurve002_1: THREE.Mesh;
  };
  materials: {
    silver: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshPhysicalMaterial;
    ["silver.001"]: THREE.MeshStandardMaterial;
  };
};

type FruitTeaCanProps = ThreeElements["group"] & {
  textureUrl: string;
};

export default function FruitTeaCan({
  textureUrl,
  ...props
}: FruitTeaCanProps) {
  const { nodes, materials } = useGLTF(
    "/models/fruit-tea-can.glb",
  ) as unknown as GLTFResult;

  const originalTexture = useTexture(textureUrl);

  // use useMemo to clone an independent texture
  const texture = useMemo(() => {
    const t = originalTexture.clone();
    t.flipY = false;
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, [originalTexture]);

  return (
    <group {...props} dispose={null}>
      {/* can top */}
      <mesh geometry={nodes.Plane027.geometry} material={materials.silver} />
      <mesh geometry={nodes.Circle001.geometry} material={materials.silver} />

      {/* can body */}
      <mesh geometry={nodes.BezierCurve002.geometry}>
        <meshStandardMaterial map={texture} roughness={0.4} metalness={0.0} />
      </mesh>

      {/* can bottom */}
      <mesh
        geometry={nodes.BezierCurve002_1.geometry}
        material={materials["silver.001"]}
      />
    </group>
  );
}

useGLTF.preload("/models/fruit-tea-can.glb");
