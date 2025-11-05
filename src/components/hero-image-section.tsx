"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export default function HeroImageSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 5);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1.0));

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.0);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Environment map (HDRI for realistic reflections)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    new RGBELoader()
      .setPath("/hdrs/") // put your .hdr file inside public/hdrs/
      .load("studio_small_08_4k.exr", (hdrEquirect) => {
        const envMap = pmremGenerator.fromEquirectangular(hdrEquirect).texture;
        scene.environment = envMap;
        scene.background = envMap; // remove if you want transparent background
        hdrEquirect.dispose();
        pmremGenerator.dispose();
      });

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
      "/mach2.glb",
      (gltf) => {
        const model = gltf.scene;

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child.material) {
              const materials = Array.isArray(child.material)
                ? child.material
                : [child.material];

              materials.forEach((mat) => {
                if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;
                mat.envMapIntensity = 1.2; // reflectivity strength
                mat.needsUpdate = true;
              });
            }
          }
        });

        // Center model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        model.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.5;
        camera.position.z = cameraZ;

        scene.add(model);
      },
      undefined,
      (err) => console.error("Error loading GLB:", err),
    );

    // Animate
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const handleResize = () => {
      const width = containerRef.current!.clientWidth;
      const height = containerRef.current!.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <section>
      <motion.div
        className="py-24"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="mx-auto max-w-4/5 px-6 ">
          <div ref={containerRef} className="relative h-[600px]">
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-black"
              style={{ pointerEvents: "auto" }}
            />

            {/* Content overlay */}
            <div className="absolute top-8 left-8 z-20 max-w-lg">
              <div className="backdrop-blur-md bg-black/30 rounded-lg p-6">
                <h2 className="text-white text-xl font-semibold lg:text-2xl mb-3">
                  Transform Your Academic Journey
                </h2>
                <p className="text-white/90 text-sm leading-relaxed">
                  Experience the future of learning with AI Arcade. Get instant,
                  accurate answers to your academic questions powered by
                  cutting-edge RAG technology.
                </p>
                <p className="text-[10px]">
                  *Model may be changed in the future
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
