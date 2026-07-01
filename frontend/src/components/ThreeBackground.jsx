import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 5;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Main geometry
    const geometry = new THREE.TorusKnotGeometry(1.4, 0.45, 120, 16);

    const material = new THREE.MeshBasicMaterial({
      color: 0xff3311,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Outer sphere
    const outerGeometry = new THREE.SphereGeometry(2.4, 16, 16);

    const outerMaterial = new THREE.MeshBasicMaterial({
      color: 0x111111,
      wireframe: true,
      transparent: true,
      opacity: 0.03,
    });

    const outerMesh = new THREE.Mesh(outerGeometry, outerMaterial);
    scene.add(outerMesh);

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    });

    resizeObserver.observe(container);

    // Animation
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      mesh.rotation.x = elapsedTime * 0.08;
      mesh.rotation.y = elapsedTime * 0.12;

      outerMesh.rotation.x = elapsedTime * 0.02;
      outerMesh.rotation.y = -elapsedTime * 0.04;

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      mesh.position.x = targetX * 1.5;
      mesh.position.y = -targetY * 1.5;

      outerMesh.position.x = targetX * 0.5;
      outerMesh.position.y = -targetY * 0.5;

      renderer.render(scene, camera);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);

      window.removeEventListener("mousemove", handleMouseMove);

      resizeObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      outerGeometry.dispose();
      outerMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      id="three-canvas-container"
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
}