import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const orbImages = [
  '/orb-default.png',
  '/orb-variant2.png',
  '/orb-variant3.png',
] as const;

/** Boomerang: default → variant2 → variant3 → variant2 → repeat */
const ORB_SEQUENCE = [0, 1, 2, 1] as const;

export default function GlowingOrb() {
  const [step, setStep] = useState(0);
  const current = ORB_SEQUENCE[step];

  useEffect(() => {
    orbImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((s) => (s + 1) % ORB_SEQUENCE.length);
    }, 800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      data-node-id="397:3562"
      className="relative size-[280px] border-0 sm:size-[360px] lg:size-[550px]"
    >
      {orbImages.map((src, index) => (
        <motion.img
          key={src}
          src={src}
          alt=""
          animate={{
            opacity: index === current ? 1 : 0,
            scale: index === current ? 1 : 0.85,
          }}
          transition={{ duration: 0.8, ease: 'linear' }}
          className="pointer-events-none absolute inset-0 border-0 outline-none"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            mixBlendMode: 'screen',
            display: 'block',
          }}
          onError={() => {
            console.error('Orb image failed to load:', src);
          }}
        />
      ))}
    </div>
  );
}
