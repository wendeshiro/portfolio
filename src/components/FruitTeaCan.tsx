"use client";

import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { GLTF } from "three-stdlib";

/* eslint-disable @typescript-eslint/naming-convention */
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
/* eslint-enable @typescript-eslint/naming-convention */

type FruitTeaCanProps = ThreeElements["group"] & {
  textureUrl: string;
  onHoverChange?: (hovered: boolean) => void;
  onDragChange?: (dragging: boolean) => void;
};

export default function FruitTeaCan({
  textureUrl,
  onHoverChange,
  onDragChange,
  ...props
}: FruitTeaCanProps) {
  const { nodes, materials } = useGLTF(
    "/models/fruit-tea-can.glb",
  ) as unknown as GLTFResult;

  const originalTexture = useTexture(textureUrl);

  // use useMemo to clone an independent texture
  const texture = useMemo(() => {
    const clonedTexture = originalTexture.clone();
    clonedTexture.flipY = false;
    clonedTexture.colorSpace = THREE.SRGBColorSpace;
    clonedTexture.needsUpdate = true;
    return clonedTexture;
  }, [originalTexture]);

  // dispose cloned texture on unmount or when textureUrl changes to prevent memory leaks
  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return (
    <group
      {...props}
      dispose={null}
      onPointerEnter={() => onHoverChange?.(true)}
      onPointerLeave={() => onHoverChange?.(false)}
      onPointerDown={() => onDragChange?.(true)}
      onPointerUp={() => onDragChange?.(false)}
      onPointerCancel={() => onDragChange?.(false)}
      onPointerMissed={() => onDragChange?.(false)}
    >
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
