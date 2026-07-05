import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

const ORBIT_SIZE = 555;
const ORBIT_EASE = [0.4, 0, 0.2, 1] as const;
const BUBBLE = 64;
const ICON_SIZE = 36;

/** Six anchor points — icons rotate through these between states */
const ORBIT_POSITIONS = [
  { x: 50, y: 8 },
  { x: 18, y: 28 },
  { x: 80, y: 28 },
  { x: 18, y: 65 },
  { x: 80, y: 65 },
  { x: 50, y: 82 },
] as const;

interface OrbitIconDef {
  id: string;
  cdn: string;
}

interface OrbitStateDef {
  label: string;
  icons: OrbitIconDef[];
}

const ORBIT_STATE_DEFS: OrbitStateDef[] = [
  {
    label: 'Front End',
    icons: [
      { id: 'react', cdn: 'cdn.simpleicons.org/react/61DAFB' },
      { id: 'vuejs', cdn: 'cdn.simpleicons.org/vuedotjs/4FC08D' },
      { id: 'angular', cdn: 'cdn.simpleicons.org/angular/DD0031' },
      { id: 'typescript', cdn: 'cdn.simpleicons.org/typescript/3178C6' },
      { id: 'nextjs', cdn: 'cdn.simpleicons.org/nextdotjs/ffffff' },
      { id: 'tailwind', cdn: 'cdn.simpleicons.org/tailwindcss/06B6D4' },
    ],
  },
  {
    label: 'Back End',
    icons: [
      { id: 'nodejs', cdn: 'cdn.simpleicons.org/nodedotjs/339933' },
      { id: 'python', cdn: 'cdn.simpleicons.org/python/3776AB' },
      { id: 'dotnet', cdn: 'cdn.simpleicons.org/dotnet/512BD4' },
      { id: 'graphql', cdn: 'cdn.simpleicons.org/graphql/E10098' },
      { id: 'java', cdn: 'cdn.simpleicons.org/openjdk/ffffff' },
      { id: 'go', cdn: 'cdn.simpleicons.org/go/00ADD8' },
    ],
  },
  {
    label: 'Cloud',
    icons: [
      { id: 'aws', cdn: 'cdn.simpleicons.org/amazonaws/FF9900' },
      { id: 'azure', cdn: 'cdn.simpleicons.org/microsoftazure/0078D4' },
      { id: 'gcp', cdn: 'cdn.simpleicons.org/googlecloud/4285F4' },
      { id: 'kubernetes', cdn: 'cdn.simpleicons.org/kubernetes/326CE5' },
      { id: 'circleci', cdn: 'cdn.simpleicons.org/circleci/ffffff' },
      { id: 'pulumi', cdn: 'cdn.simpleicons.org/pulumi/8A3391' },
    ],
  },
  {
    label: 'AI & Data',
    icons: [
      { id: 'openai', cdn: 'cdn.simpleicons.org/openai/ffffff' },
      { id: 'pytorch', cdn: 'cdn.simpleicons.org/pytorch/EE4C2C' },
      { id: 'tensorflow', cdn: 'cdn.simpleicons.org/tensorflow/FF6F00' },
      { id: 'airflow', cdn: 'cdn.simpleicons.org/apacheairflow/017CEE' },
      { id: 'huggingface', cdn: 'cdn.simpleicons.org/huggingface/FFD21E' },
      { id: 'keras', cdn: 'cdn.simpleicons.org/keras/D00000' },
    ],
  },
  {
    label: 'Database',
    icons: [
      { id: 'mongodb', cdn: 'cdn.simpleicons.org/mongodb/47A248' },
      { id: 'postgresql', cdn: 'cdn.simpleicons.org/postgresql/4169E1' },
      { id: 'redis', cdn: 'cdn.simpleicons.org/redis/DC382D' },
      { id: 'mysql', cdn: 'cdn.simpleicons.org/mysql/4479A1' },
      { id: 'prisma', cdn: 'cdn.simpleicons.org/prisma/ffffff' },
      { id: 'supabase', cdn: 'cdn.simpleicons.org/supabase/3ECF8E' },
    ],
  },
  {
    label: 'DevOps',
    icons: [
      { id: 'github', cdn: 'cdn.simpleicons.org/github/ffffff' },
      { id: 'gitlab', cdn: 'cdn.simpleicons.org/gitlab/FC6D26' },
      { id: 'docker', cdn: 'cdn.simpleicons.org/docker/2496ED' },
      { id: 'grafana', cdn: 'cdn.simpleicons.org/grafana/F46800' },
      { id: 'jenkins', cdn: 'cdn.simpleicons.org/jenkins/D24939' },
      { id: 'netlify', cdn: 'cdn.simpleicons.org/netlify/00C7B7' },
    ],
  },
];

export interface ResolvedOrbitIcon {
  id: string;
  cdn: string;
  x: number;
  y: number;
}

export function resolveOrbitIcons(stateIndex: number): {
  label: string;
  icons: ResolvedOrbitIcon[];
} {
  const def = ORBIT_STATE_DEFS[stateIndex];
  return {
    label: def.label,
    icons: def.icons.map((icon, i) => {
      const pos = ORBIT_POSITIONS[(i + stateIndex) % ORBIT_POSITIONS.length];
      return { ...icon, x: pos.x, y: pos.y };
    }),
  };
}

export const ORBIT_STATE_COUNT = ORBIT_STATE_DEFS.length;
export const ORBIT_CYCLE_MS = 2400;

interface TechStackOrbitProps {
  current: number;
}

export default function TechStackOrbit({ current }: TechStackOrbitProps) {
  const state = resolveOrbitIcons(current);

  return (
    <div
      data-node-id="407:3462"
      className="relative shrink-0 overflow-hidden rounded-full"
      style={{
        width: ORBIT_SIZE,
        height: ORBIT_SIZE,
        background:
          'radial-gradient(circle at 50% 45%, rgba(0,84,165,0.18) 0%, rgba(0,0,0,0.72) 55%, rgba(0,0,0,0.92) 100%)',
        border: '1px solid rgba(59,130,246,0.22)',
        boxShadow:
          '0 0 60px rgba(59,130,246,0.15), inset 0 0 80px rgba(0,84,165,0.08)',
      }}
    >
      {/* Figma orbit ring overlay — clipped to circle */}
      <img
        src="/assets/tech-orbit-bg.png"
        alt=""
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-40"
        draggable={false}
      />

      {/* AI Core glow — Figma I407:3462;38:849 */}
      <div
        className="pointer-events-none absolute rounded-[12px] bg-[#0054a5] opacity-20 blur-[20px]"
        style={{ top: '40%', left: '41.26%', right: '41.44%', bottom: '42.7%' }}
      />

      <LayoutGroup id="tech-stack-orbit">
        <AnimatePresence mode="popLayout">
          {state.icons.map((icon) => (
            <motion.div
              key={icon.id}
              layoutId={icon.id}
              layout
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{
                layout: { duration: 0.8, ease: ORBIT_EASE },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
              }}
              className="absolute flex items-center justify-center rounded-full shadow-[0px_0px_32px_0px_rgba(0,84,165,0.66)]"
              style={{
                left: `${icon.x}%`,
                top: `${icon.y}%`,
                width: BUBBLE,
                height: BUBBLE,
                marginLeft: -BUBBLE / 2,
                marginTop: -BUBBLE / 2,
                background: 'rgba(0,84,165,0.27)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <img
                src={`https://${icon.cdn}`}
                alt=""
                width={ICON_SIZE}
                height={ICON_SIZE}
                className="pointer-events-none object-contain"
                draggable={false}
                onError={(e) => {
                  e.currentTarget.style.opacity = '0.35';
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </LayoutGroup>

      {/* Center label — Figma I407:3462;38:866 */}
      <div
        className="pointer-events-none absolute left-1/2 flex items-center justify-center rounded-[62px] shadow-[0px_0px_32px_0px_rgba(0,84,165,0.66)]"
        style={{
          top: 'calc(50% - 7.5px)',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,84,165,0.49)',
          minWidth: 64,
          minHeight: 64,
          padding: '12px 16px',
          zIndex: 10,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={state.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="whitespace-nowrap text-center font-inter text-[12px] font-normal leading-5 text-white"
          >
            {state.label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
