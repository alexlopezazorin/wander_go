// // // export default function Home() {
// // //   return <h1>Hello world</h1>;
// // // }
// // // frontend/app/page.tsx

// // "use client";

// // import CameraView from "./components/CameraView";
// // import AvatarViewer from "./components/Avatarviewer";

// // export default function Home() {
// //   return (
// //     <main className="relative w-screen h-screen overflow-hidden bg-black">
// //       {/* Camera Feed */}
// //       <CameraView />

// //       {/* Napoleon Overlay */}
// //       <AvatarViewer />

// //       {/* UI Overlay */}
// //       <div className="absolute top-4 left-4 z-50 text-white">
// //         <h1 className="text-2xl font-bold">
// //           WANDER_GO
// //         </h1>

// //         <p className="text-sm opacity-80">
// //           Napoleon AR Guide
// //         </p>
// //       </div>
// //     </main>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import CameraView from "./components/CameraView";
// import AvatarViewer from "./components/Avatarviewer";
// import { getCurrentPosition } from "./services/location";
// import { fetchNearbyLandmark } from "./services/api";
// import { fetchStory } from "./services/api";
// export default function Home() {
//   const [landmark, setLandmark] = useState<any>(null);

//   useEffect(() => {
//     async function init() {
//       try {
//         // 1. GET GPS
//         const position = await getCurrentPosition();

//         const { latitude, longitude } = position.coords;

//         // 2. SEND TO BACKEND
//         const data = await fetchNearbyLandmark(latitude, longitude);

//         // 3. STORE LANDMARK
//         setLandmark(data);
//       } catch (err) {
//         console.error("Init error:", err);
//       }
//     }

//     init();
//   }, []);

//   return (
//     <main className="relative w-screen h-screen overflow-hidden bg-black">
//       <CameraView />

//       {/* Avatar only appears when landmark exists */}
//       {landmark && <AvatarViewer />}

//       <div className="absolute top-4 left-4 z-50 text-white">
//         <h1 className="text-2xl font-bold">WANDER_GO</h1>
//         <p className="text-sm opacity-80">
//           {landmark ? landmark.name : "Searching location..."}
//         </p>
//       </div>
//     </main>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import CameraView from "./components/CameraView";
import AvatarViewer from "./components/Avatarviewer";
import { getCurrentPosition } from "./services/location";
import { fetchNearbyLandmark, fetchStory } from "./services/api";

export default function Home() {
  const [landmark, setLandmark] = useState<any>(null);
  const [story, setStory] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        setLoading(true);

        // 1. GPS
        console.log("Getting GPS...");
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        console.log("GPS Found:", latitude, longitude);

        // 2. LANDMARK
        console.log("Fetching landmark...");
        const lm = await fetchNearbyLandmark(latitude, longitude);
        console.log("Landmark Found:", lm);
        setLandmark(lm);

        // 3. STORY (ChatGPT)
        console.log("Fetching story for:", lm.name);
        const storyRes = await fetchStory(lm.name);
        console.log("Story Received:", storyRes.story);
        setStory(storyRes.story);

      } catch (err) {
        console.error("Init error:", err);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      {/* CAMERA */}
      <CameraView />

      {/* AVATAR (only when ready) */}
      {!loading && landmark && story && (
        <AvatarViewer landmark={landmark} story={story} />
      )}

      {/* UI */}
      <div className="absolute top-4 left-4 z-50 text-white">
        <h1 className="text-2xl font-bold">WANDER_GO</h1>

        <p className="text-sm opacity-80">
          {landmark ? landmark.name : "Detecting location..."}
        </p>
      </div>
    </main>
  );
}