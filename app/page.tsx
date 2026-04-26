'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import DomeGallery from '@/components/DomeGallery';
import InteractionFlow from '@/components/InteractionFlow';

export default function Home() {
  const [showGallery, setShowGallery] = useState(false);

  const userImages = [
    '/1.jpeg',
    '/2.jpeg',
    '/3.jpeg',
    '/4.jpeg',
    '/5.jpeg',
    '/6.jpeg',
    '/7.jpeg',
    '/8.jpeg',
    '/9.jpeg',
    '/10.jpeg',
    '/11.jpeg',
    '/12.jpeg',
    '/13.jpeg',
    '/14.jpeg',
    '/15.jpeg',
  ];

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Attempt autoplay if gallery is shown
    if (showGallery && audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [showGallery]);

  const toggleAudio = () => {
      if (audioRef.current) {
          if (isPlaying) {
              audioRef.current.pause();
          } else {
              audioRef.current.play();
          }
          setIsPlaying(!isPlaying);
      }
  };

  return (
    <main className="w-screen h-screen bg-[#060010] relative overflow-hidden">
      {/* Floating Audio Button */}
      <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: showGallery ? 1 : 0 }}
          onClick={toggleAudio}
          className="absolute top-6 right-6 z-50 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white/50 hover:text-white/90 hover:bg-white/10 transition-all duration-300 shadow-2xl"
          style={{ pointerEvents: showGallery ? 'auto' : 'none' }}
      >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </motion.button>
      <audio ref={audioRef} src="/pretty.mp3" loop className="hidden" />

      {!showGallery ? (
        <InteractionFlow onFlowComplete={() => setShowGallery(true)} />
      ) : (
        <>
          <DomeGallery
            images={userImages}
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            grayscale={false}
            autoRotationSpeed={0.1}
          />
        </>
      )}
    </main>
  );
}
