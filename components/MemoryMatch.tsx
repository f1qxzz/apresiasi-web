'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMOJIS = ['✨', '💫', '🌟', '🌙', '🦋', '🌸'];

interface Card {
    id: number;
    emoji: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const MemoryMatch: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matches, setMatches] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    useEffect(() => {
        const shuffled = [...EMOJIS, ...EMOJIS]
            .sort(() => Math.random() - 0.5)
            .map((emoji, idx) => ({
                id: idx,
                emoji,
                isFlipped: false,
                isMatched: false,
            }));
        setCards(shuffled);
    }, []);

    const handleCardClick = (index: number) => {
        if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

        const newFlipped = [...flippedIndices, index];
        setFlippedIndices(newFlipped);

        setCards(prev => prev.map((card, i) =>
            i === index ? { ...card, isFlipped: true } : card
        ));

        if (newFlipped.length === 2) {
            setIsLocked(true);
            const [firstIndex, secondIndex] = newFlipped;

            if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
                setMatches(m => {
                    const newMatches = m + 1;
                    if (newMatches === EMOJIS.length) {
                        setTimeout(() => onComplete(), 2000);
                    }
                    return newMatches;
                });
                setCards(prev => prev.map((card, i) =>
                    i === firstIndex || i === secondIndex ? { ...card, isMatched: true } : card
                ));
                setFlippedIndices([]);
                setIsLocked(false);
            } else {
                setTimeout(() => {
                    setCards(prev => prev.map((card, i) =>
                        i === firstIndex || i === secondIndex ? { ...card, isFlipped: false } : card
                    ));
                    setFlippedIndices([]);
                    setIsLocked(false);
                }, 1000);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center space-y-10 relative z-10 w-full px-4"
        >
            <h2 className="text-3xl sm:text-4xl font-playfair text-white/80 text-center drop-shadow-lg tracking-wide">
                {matches === EMOJIS.length ? "Selesai." : "Fokus."}
            </h2>

            <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 sm:gap-4 p-6 bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                {cards.map((card, i) => (
                    <motion.div
                        key={card.id}
                        className="relative w-16 h-16 sm:w-20 sm:h-20 perspective-1000 cursor-pointer"
                        onClick={() => handleCardClick(i)}
                        whileHover={{ scale: card.isFlipped ? 1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="w-full h-full relative preserve-3d transition-all duration-500 ease-out"
                            animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                        >
                            {/* Front of card (hidden initially) */}
                            <div className="absolute inset-0 w-full h-full backface-hidden bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-inner hover:bg-white/10 transition-colors" />

                            {/* Back of card (revealed) */}
                            <div
                                className="absolute inset-0 w-full h-full backface-hidden rounded-2xl flex items-center justify-center border border-white/20 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                style={{ transform: 'rotateY(180deg)' }}
                            >
                                <span className="text-2xl sm:text-3xl filter drop-shadow-md">
                                    {card.emoji}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
            
            <style jsx global>{`
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
            `}</style>
        </motion.div>
    );
};

export default MemoryMatch;
