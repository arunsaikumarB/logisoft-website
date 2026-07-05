import { motion } from 'framer-motion';
import {
  BarChart3,
  Cloud,
  Database,
  Layers,
  Monitor,
  Network,
  Shield,
  Snowflake,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import type { HeroVariant, ServicePageTheme } from '@/data/servicePages';

const float = {
  y: [0, -12, 0],
  transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const },
};

export function ServiceHeroVisual({
  variant,
  theme,
}: {
  variant: HeroVariant;
  theme: ServicePageTheme;
}) {
  const { accent, accentSecondary, glowColor } = theme;

  if (variant === 'split-shield') {
    return (
      <motion.div
        animate={float}
        className="relative mx-auto flex aspect-square max-w-md items-center justify-center"
        aria-hidden
      >
        <div
          className="absolute inset-8 rounded-full blur-3xl"
          style={{ background: glowColor }}
        />
        <div
          className="relative flex size-48 items-center justify-center rounded-3xl border backdrop-blur-xl lg:size-64"
          style={{ borderColor: `${accent}44`, background: `${accent}12` }}
        >
          <Shield size={80} color={accent} strokeWidth={1.25} />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute size-3 rounded-full"
            style={{
              background: accent,
              top: `${20 + i * 18}%`,
              left: `${10 + i * 20}%`,
              opacity: 0.6,
              boxShadow: `0 0 12px ${accent}`,
            }}
          />
        ))}
      </motion.div>
    );
  }

  if (variant === 'center-cloud') {
    return (
      <div className="relative mx-auto h-64 max-w-lg" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8 - i * 4, 0], x: [0, i % 2 ? 6 : -6, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute flex items-center justify-center rounded-2xl border backdrop-blur-md"
            style={{
              width: 100 + i * 40,
              height: 70 + i * 20,
              left: `${15 + i * 25}%`,
              top: `${10 + i * 15}%`,
              borderColor: `${accent}33`,
              background: `${accent}10`,
            }}
          >
            <Cloud size={28 + i * 8} color={accent} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === 'gradient-crm') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mx-auto w-full max-w-lg"
        aria-hidden
      >
        <div
          className="glass-card overflow-hidden rounded-2xl border p-4"
          style={{ borderColor: `${accent}44` }}
        >
          <div className="mb-3 flex gap-2">
            <div className="size-3 rounded-full bg-red-500/80" />
            <div className="size-3 rounded-full bg-yellow-500/80" />
            <div className="size-3 rounded-full bg-green-500/80" />
          </div>
          <div className="space-y-2">
            {[85, 62, 94, 48].map((w, i) => (
              <div key={i} className="flex items-center gap-3">
                <Database size={16} color={accent} />
                <div className="h-2 flex-1 rounded-full bg-white/10">
                  <div className="h-full rounded-full" style={{ width: `${w}%`, background: accent }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <motion.div
          animate={float}
          className="absolute -right-4 -top-4 rounded-xl border p-3 backdrop-blur-lg"
          style={{ borderColor: `${accentSecondary}55`, background: `${accentSecondary}22` }}
        >
          <BarChart3 size={24} color={accentSecondary} />
        </motion.div>
      </motion.div>
    );
  }

  if (variant === 'purple-enterprise') {
    return (
      <motion.div animate={float} className="relative mx-auto max-w-md" aria-hidden>
        <div
          className="rounded-2xl border p-6 backdrop-blur-xl"
          style={{
            borderColor: `${accentSecondary}44`,
            background: `linear-gradient(145deg, ${accent}15, ${accentSecondary}20)`,
          }}
        >
          <Sparkles size={40} color={accentSecondary} className="mb-4" />
          <div className="grid grid-cols-2 gap-3">
            {['CPQ', 'CLM', 'Quotes', 'Contracts'].map((label) => (
              <div
                key={label}
                className="rounded-lg border border-white/10 bg-black/30 px-3 py-4 text-center font-geist text-xs font-semibold text-white/80"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'data-viz') {
    return (
      <div className="relative mx-auto h-72 max-w-md" aria-hidden>
        <svg viewBox="0 0 400 280" className="size-full">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={accent} />
              <stop offset="100%" stopColor={accentSecondary} />
            </linearGradient>
          </defs>
          <motion.path
            d="M20 220 Q100 180 160 200 T300 120 T380 80"
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
          {[20, 80, 140, 200, 260, 320].map((x, i) => (
            <motion.rect
              key={x}
              x={x}
              y={240 - i * 22}
              width="24"
              height={40 + i * 8}
              rx="4"
              fill={accent}
              opacity={0.4 + i * 0.1}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ transformOrigin: `${x + 12}px 280px` }}
            />
          ))}
        </svg>
        <Snowflake
          className="absolute right-4 top-4 opacity-80"
          size={32}
          color={accent}
          strokeWidth={1.5}
        />
      </div>
    );
  }

  // split-left default — software UI stack
  return (
    <motion.div
      animate={float}
      className="relative mx-auto aspect-[4/3] w-full max-w-lg"
      aria-hidden
    >
      <div
        className="absolute inset-0 rounded-3xl blur-3xl opacity-50"
        style={{ background: glowColor }}
      />
      <div
        className="relative flex h-full flex-col gap-3 rounded-2xl border p-5 backdrop-blur-xl"
        style={{ borderColor: `${accent}33`, background: 'rgba(10,16,28,0.85)' }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Monitor size={18} color={accent} />
          <span className="font-geist text-xs font-semibold text-white/70">Enterprise Platform</span>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-2">
          {([Layers, Network, Sparkles, BarChart3] as LucideIcon[]).map((Icon, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <Icon size={28} color={accent} strokeWidth={1.5} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
