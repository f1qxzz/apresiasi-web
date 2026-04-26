'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const CinematicIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const t = [
            setTimeout(() => setPhase(1), 500),
            setTimeout(() => setPhase(2), 3000),
            setTimeout(() => setPhase(3), 5500),
            setTimeout(() => onComplete(), 7000),
        ];
        return () => t.forEach(clearTimeout);
    }, [onComplete]);

    const titleText = "Hey.";
    const subText = "I made something for you.";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            className="flex flex-col items-center justify-center relative z-10 w-full h-full bg-[#060010] overflow-hidden"
        >
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/10 blur-[150px] rounded-full pointer-events-none" />

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full"
                        initial={{
                            x: `${Math.random() * 100}vw`,
                            y: `${Math.random() * 100}vh`,
                            scale: Math.random() * 0.5 + 0.5,
                            opacity: Math.random() * 0.5 + 0.1
                        }}
                        animate={{
                            y: [null, `${Math.random() * -100}vh`],
                            opacity: [null, 0.8, 0]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Horizontal dramatic slice */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 1 : 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 w-screen h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
            />

            <AnimatePresence mode="wait">
                {phase >= 1 && phase < 3 && (
                    <motion.div
                        key="hey-container"
                        className="relative z-10 flex flex-col items-center justify-center"
                    >
                        <motion.h1
                            className="text-7xl sm:text-9xl font-playfair text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter"
                            initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -40, filter: 'blur(20px)', scale: 1.1 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {titleText}
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {phase >= 2 && phase < 3 && (
                    <motion.div
                        key="subtext"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute mt-32 flex items-center gap-3 text-white/50"
                    >
                        <Sparkles size={16} className="text-red-400" />
                        <p className="text-sm sm:text-base font-mono tracking-[0.4em] uppercase">
                            {subText}
                        </p>
                        <Sparkles size={16} className="text-red-400" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CinematicIntro;
