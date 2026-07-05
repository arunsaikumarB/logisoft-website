import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ServicePageConfig } from '@/data/servicePages';
import { ServiceHeroVisual } from '@/components/services/ServiceHeroVisual';

interface Props {
  config: ServicePageConfig;
}

function Breadcrumb({ config }: { config: ServicePageConfig }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 font-inter text-sm text-white/50">
      <Link to="/" className="transition-colors hover:text-white">Home</Link>
      <ChevronRight size={14} aria-hidden />
      <span>Services</span>
      <ChevronRight size={14} aria-hidden />
      <span className="text-white/80">{config.title}</span>
    </nav>
  );
}

function HeroCTAs({ accent }: { accent: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <a
        href="#contact"
        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-6 py-3 font-inter text-sm font-bold text-white transition-all hover:brightness-110"
        style={{ background: accent, boxShadow: `0 8px 32px ${accent}44` }}
      >
        Start a Project
        <ArrowRight size={16} aria-hidden />
      </a>
      <a
        href="#overview"
        className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/20 px-6 py-3 font-inter text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
      >
        Explore Capabilities
      </a>
    </div>
  );
}

function SplitLeftHero({ config }: Props) {
  return (
    <section className="section-shell-full relative overflow-hidden pt-28 lg:pt-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: `radial-gradient(ellipse 80% 60% at 70% 40%, ${config.theme.glowColor}, transparent 70%)` }}
      />
      <div className="relative z-[1] mx-auto grid max-w-[1440px] gap-12 px-6 sm:px-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-20">
        <div>
          <Breadcrumb config={config} />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 font-geist text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: config.theme.accent }}
          >
            {config.tagline}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-montserrat text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            {config.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-6 max-w-xl font-inter text-base leading-relaxed text-white/65 lg:text-lg"
          >
            {config.description}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24 }} className="mt-8">
            <HeroCTAs accent={config.theme.accent} />
          </motion.div>
        </div>
        <ServiceHeroVisual variant={config.theme.heroVariant} theme={config.theme} />
      </div>
    </section>
  );
}

function SplitShieldHero({ config }: Props) {
  return (
    <section className="section-shell-full relative overflow-hidden pt-28 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[#030712]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(${config.theme.accent}22 1px, transparent 1px), linear-gradient(90deg, ${config.theme.accent}22 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
      <div className="relative z-[1] mx-auto grid max-w-[1440px] gap-12 px-6 sm:px-12 lg:grid-cols-2 lg:items-center lg:px-20">
        <ServiceHeroVisual variant={config.theme.heroVariant} theme={config.theme} />
        <div className="lg:pl-8">
          <Breadcrumb config={config} />
          <motion.h1
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-montserrat text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            {config.title}
          </motion.h1>
          <p className="mt-2 font-geist text-sm uppercase tracking-widest" style={{ color: config.theme.accent }}>
            {config.tagline}
          </p>
          <p className="mt-6 font-inter text-base leading-relaxed text-white/60 lg:text-lg">{config.description}</p>
          <div className="mt-8"><HeroCTAs accent={config.theme.accent} /></div>
        </div>
      </div>
    </section>
  );
}

function CenterCloudHero({ config }: Props) {
  return (
    <section className="section-shell-full relative overflow-hidden pt-28 text-center lg:pt-36">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1200px] -translate-x-1/2 rounded-[100%] opacity-30 blur-3xl"
        style={{ background: `radial-gradient(circle, ${config.theme.glowColor}, transparent 65%)` }}
      />
      <div className="relative z-[1] mx-auto max-w-[900px] px-6 sm:px-12 lg:px-20">
        <Breadcrumb config={config} />
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-montserrat text-4xl font-bold text-white sm:text-5xl lg:text-7xl"
        >
          {config.title}
        </motion.h1>
        <p className="mx-auto mt-4 max-w-2xl font-inter text-lg text-white/60">{config.description}</p>
        <div className="mt-8 flex justify-center"><HeroCTAs accent={config.theme.accent} /></div>
        <div className="mt-12"><ServiceHeroVisual variant={config.theme.heroVariant} theme={config.theme} /></div>
      </div>
    </section>
  );
}

function GradientCrmHero({ config }: Props) {
  return (
    <section
      className="section-shell-full relative overflow-hidden pt-28 lg:pt-32"
      style={{ background: `linear-gradient(135deg, #020617 0%, ${config.theme.accentSecondary}18 50%, #020617 100%)` }}
    >
      <div className="relative z-[1] mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20">
        <div className="grid lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-12">
          <div className="pb-12">
            <Breadcrumb config={config} />
            <h1 className="font-montserrat text-4xl font-bold text-white sm:text-5xl lg:text-6xl">{config.title}</h1>
            <p className="mt-6 max-w-lg font-inter text-white/65">{config.description}</p>
            <div className="mt-8"><HeroCTAs accent={config.theme.accent} /></div>
          </div>
          <ServiceHeroVisual variant={config.theme.heroVariant} theme={config.theme} />
        </div>
      </div>
    </section>
  );
}

function PurpleEnterpriseHero({ config }: Props) {
  return (
    <section className="section-shell-full relative overflow-hidden pt-28 lg:pt-32">
      <div
        className="pointer-events-none absolute -right-32 top-0 size-[500px] rounded-full opacity-20 blur-[100px]"
        style={{ background: config.theme.accentSecondary }}
      />
      <div className="relative z-[1] mx-auto flex max-w-[1440px] flex-col gap-12 px-6 lg:flex-row lg:items-center lg:px-20">
        <div className="flex-1">
          <Breadcrumb config={config} />
          <span
            className="mb-4 inline-block rounded-full border px-4 py-1 font-geist text-xs font-semibold uppercase tracking-wider"
            style={{ borderColor: `${config.theme.accent}66`, color: config.theme.accent }}
          >
            {config.tagline}
          </span>
          <h1 className="font-montserrat text-4xl font-bold text-white sm:text-5xl">{config.title}</h1>
          <p className="mt-6 font-inter text-white/60">{config.description}</p>
          <div className="mt-8"><HeroCTAs accent={config.theme.accent} /></div>
        </div>
        <div className="flex-1"><ServiceHeroVisual variant={config.theme.heroVariant} theme={config.theme} /></div>
      </div>
    </section>
  );
}

function DataVizHero({ config }: Props) {
  return (
    <section className="section-shell-full relative overflow-hidden pt-28 lg:pt-32">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#06b6d4]/20 to-transparent" />
      </div>
      <div className="relative z-[1] mx-auto max-w-[1440px] px-6 lg:px-20">
        <Breadcrumb config={config} />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text font-montserrat text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
              {config.title}
            </h1>
            <p className="mt-6 font-inter text-white/60">{config.description}</p>
            <div className="mt-8"><HeroCTAs accent={config.theme.accent} /></div>
          </div>
          <ServiceHeroVisual variant={config.theme.heroVariant} theme={config.theme} />
        </div>
      </div>
    </section>
  );
}

export function ServiceHero({ config }: Props) {
  switch (config.theme.heroVariant) {
    case 'split-shield':
      return <SplitShieldHero config={config} />;
    case 'center-cloud':
      return <CenterCloudHero config={config} />;
    case 'gradient-crm':
      return <GradientCrmHero config={config} />;
    case 'purple-enterprise':
      return <PurpleEnterpriseHero config={config} />;
    case 'data-viz':
      return <DataVizHero config={config} />;
    default:
      return <SplitLeftHero config={config} />;
  }
}
