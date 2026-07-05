import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Monitor,
  Server,
  Cloud,
  Brain,
  Database,
  GitBranch,
  type LucideIcon,
} from 'lucide-react';
import TechStackOrbit, { ORBIT_CYCLE_MS, ORBIT_STATE_COUNT } from '@/components/TechStackOrbit';

const BG_VIDEO = '/27725-365890983_medium.mp4';
const TECH_STAR1 = '/assets/tech-star-1.png';
const TECH_STAR2 = '/assets/tech-star-2.png';

const categories: { name: string; icon: LucideIcon }[] = [
  { name: 'Frontend', icon: Monitor },
  { name: 'Backend', icon: Server },
  { name: 'Cloud', icon: Cloud },
  { name: 'AI & Data', icon: Brain },
  { name: 'Database', icon: Database },
  { name: 'DevOps', icon: GitBranch },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

export default function TechStackSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % ORBIT_STATE_COUNT);
    }, ORBIT_CYCLE_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="tech-stack"
      data-node-id="407:3532"
      className="section-shell"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute inset-0 size-full object-cover"
        style={{ zIndex: 0, opacity: 0.1 }}
      >
        <source src={BG_VIDEO} type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div
          className="absolute mix-blend-plus-lighter hidden lg:block"
          style={{ left: -984, top: 64, width: 1848, height: 1798, opacity: 0.4 }}
        >
          <img
            src={TECH_STAR1}
            alt=""
            className="size-full object-contain"
            style={{ transform: 'scaleY(-1) rotate(58.87deg)' }}
          />
        </div>
        <div
          className="absolute mix-blend-plus-lighter hidden lg:block"
          style={{ left: 521, top: -1032, width: 1721, height: 1794, opacity: 0.3 }}
        >
          <img
            src={TECH_STAR2}
            alt=""
            className="size-full object-contain"
            style={{ transform: 'scaleY(-1) rotate(-155.61deg)' }}
          />
        </div>
      </div>

      <div
        className="relative w-full"
        style={{ zIndex: 1 }}
      >
        <div
          data-node-id="407:3424"
          className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-16 xl:gap-20"
        >
          <motion.div
            data-node-id="407:3426"
            className="flex w-full flex-col justify-center lg:w-1/2 lg:max-w-[616px]"
            style={{ gap: 16 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.h2
              data-node-id="407:3428"
              variants={fadeUp}
              className="section-title font-geist text-2xl font-bold leading-tight tracking-[-1.2px] text-white sm:text-3xl lg:text-5xl lg:leading-[48px]"
            >
              Technology Stack
            </motion.h2>

            <motion.p
              data-node-id="407:3430"
              variants={fadeUp}
              className="section-lead max-w-[576px] font-inter text-sm font-normal text-[#b3b3b3] sm:text-base lg:text-lg"
            >
              We build with the most advanced and reliable technologies in the industry.
            </motion.p>

            <div
              data-node-id="407:3431"
              className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-2"
            >
              {categories.map(({ name, icon: Icon }, i) => {
                const isActive = current === i;
                return (
                  <motion.button
                    key={name}
                    type="button"
                    variants={fadeUp}
                    onClick={() => setCurrent(i)}
                    className="flex min-h-[44px] cursor-pointer items-center text-left transition-colors"
                    style={{
                      gap: 16,
                      padding: 20,
                      borderRadius: 4,
                      backdropFilter: 'blur(10px)',
                      background: isActive
                        ? 'rgba(0,84,165,0.2)'
                        : 'rgba(10,10,15,0.4)',
                      border: isActive
                        ? '1px solid rgba(0,84,165,0.5)'
                        : '1px solid rgba(255,255,255,0.1)',
                      boxShadow: isActive ? '0 0 24px rgba(0,84,165,0.25)' : 'none',
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      color="#3B82F6"
                      aria-hidden
                      className="shrink-0"
                    />
                    <span className="font-geist text-sm font-normal leading-6 text-[#e1e3e4] sm:text-base">
                      {name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            className="flex w-full justify-center lg:w-auto"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="origin-center scale-[0.5] sm:scale-[0.65] lg:scale-100">
              <TechStackOrbit current={current} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
