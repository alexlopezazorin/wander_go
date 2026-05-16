"use client";

import { useEffect, useRef, useState } from "react";

export default function CameraView() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" }, // better mobile fallback
          },
          audio: false,
        });

        // store stream so we can clean it up later
        streamRef.current = stream;

        if (videoRef.current && isMounted) {
          videoRef.current.srcObject = stream;

          // iOS autoplay fix
          videoRef.current.setAttribute("playsinline", "true");
          videoRef.current.setAttribute("autoplay", "true");
          videoRef.current.muted = true;

          await videoRef.current.play().catch(() => {
            // ignore autoplay blocking issues
          });
        }
      } catch (err: any) {
        console.error("Camera access error:", err);
        setError(err?.message || "Camera access failed");
      }
    }

    startCamera();

    // cleanup on unmount (IMPORTANT)
    return () => {
      isMounted = false;

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // optional fallback UI
  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
        <p>Camera error: {error}</p>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className="absolute top-0 left-0 w-full h-full object-cover"
      playsInline
      muted
      autoPlay
    />
  );
}