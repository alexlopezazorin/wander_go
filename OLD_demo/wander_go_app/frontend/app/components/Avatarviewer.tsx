// // frontend/app/components/AvatarViewer.tsx

// "use client";

// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF } from "@react-three/drei";

// function NapoleonModel() {
//   const gltf = useGLTF("/avatars/napoleon.glb");

//   return (
//     <primitive
//       object={gltf.scene}
//       scale={2}
//       position={[0, -2, 0]}
//     />
//   );
// }

// export default function AvatarViewer() {
//   return (
//     <div className="absolute inset-0 ">
//       <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
//         <ambientLight intensity={1.5} />
//         <directionalLight position={[2, 2, 5]} intensity={2} />

//         <NapoleonModel />

//         <OrbitControls enableZoom={false} />
//       </Canvas>
//     </div>
//   );
// }
"use client";

import { useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function NapoleonModel() {
  console.log("Loading Napoleon Model...");
  const gltf = useGLTF("/avatars/napoleon.glb");
  console.log("Model loaded successfully!");
  return <primitive object={gltf.scene} scale={2} position={[0, -2, 0]} />;
}

function Loader() {
  console.log("Avatar is loading, showing fallback box...");
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" wireframe />
    </mesh>
  );
}

export default function AvatarViewer({
  landmark,
  story,
}: {
  landmark: any;
  story: string;
}) {
  console.log("AvatarViewer rendering for landmark:", landmark?.name);
  useEffect(() => {
    if (story) {
      const speech = new SpeechSynthesisUtterance(story);
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  }, [story]);

  return (
    <div className="absolute inset-0 z-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 2, 5]} intensity={2} />

        <Suspense fallback={<Loader />}>
          <NapoleonModel />
        </Suspense>

        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* UI overlay */}
      <div className="absolute bottom-10 left-4 text-white">
        <h2 className="text-xl font-bold">🎭 Napoleon</h2>
        <p className="text-sm opacity-80">{landmark?.name}</p>
        <p className="mt-2 text-sm max-w-md">{story}</p>
      </div>
    </div>
  );
}