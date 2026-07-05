import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/Reveal';
import { ServiceHero } from '@/components/services/ServiceHero';
import type { IncludedLayout, ServicePageConfig } from '@/data/servicePages';

function SectionHeading({
  eyebrow,
  title,
  description,
  accent,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  accent: string;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow && (
        <p className="mb-3 font-geist text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
          {eyebrow}
        </p>
      )}
      <h2 className="font-montserrat text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {description && (
        <p className="section-lead mt-4 text-center text-white/60">{description}</p>
      )}
    </Reveal>
  );
}

function OverviewSection({ config }: { config: ServicePageConfig }) {
  return (
    <section id="overview" className="section-shell">
      <div className="section-content lg:flex-row lg:items-center lg:gap-16">
        <Reveal className="flex-1">
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
            style={{ background: `linear-gradient(135deg, ${config.theme.accent}18, transparent)` }}
          >
            <div
              className="absolute inset-0 opacity-60"
              style={{ background: `radial-gradient(circle at 30% 40%, ${config.theme.glowColor}, transparent 60%)` }}
            />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <ul className="w-full space-y-3">
                {config.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 rounded-lg border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-sm">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" style={{ color: config.theme.accent }} />
                    <span className="font-inter text-sm text-white/85">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
        <Reveal className="flex-1" delay={0.1}>
          <p className="mb-2 font-geist text-xs font-semibold uppercase tracking-widest text-white/40">Overview</p>
          <h2 className="font-montserrat text-3xl font-bold text-white lg:text-4xl">
            Enterprise-grade {config.title.toLowerCase()}
          </h2>
          <p className="mt-4 font-inter leading-relaxed text-white/60">{config.description}</p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
            {config.stats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
              >
                <div className="font-montserrat text-2xl font-bold" style={{ color: config.theme.accent }}>
                  {value}
                </div>
                <div className="mt-1 font-inter text-xs text-white/50">{label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesIncludedSection({ config }: { config: ServicePageConfig }) {
  const layout = config.theme.includedLayout;

  const card = (item: (typeof config.services)[0], i: number) => (
    <Reveal key={item.title} delay={i * 0.05}>
      <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.05]">
        <div
          className="mb-4 flex size-10 items-center justify-center rounded-lg"
          style={{ background: `${config.theme.accent}18`, border: `1px solid ${config.theme.accent}33` }}
        >
          <span className="font-geist text-sm font-bold" style={{ color: config.theme.accent }}>
            {String(i + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className="font-geist text-lg font-bold text-white group-hover:text-[#0095DA]">{item.title}</h3>
        <p className="mt-2 font-inter text-sm leading-relaxed text-white/55">{item.description}</p>
      </div>
    </Reveal>
  );

  return (
    <section className="section-shell bg-[#030712]/50">
      <SectionHeading
        eyebrow="Capabilities"
        title="Services Included"
        description={`Comprehensive ${config.title} capabilities designed for enterprise scale.`}
        accent={config.theme.accent}
      />

      {layout === 'alternating' && (
        <div className="space-y-8">
          {config.services.map((item, i) => (
            <Reveal key={item.title}>
              <div
                className={`flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:flex-row lg:items-center ${
                  i % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div
                  className="flex h-32 w-full shrink-0 items-center justify-center rounded-xl lg:w-48"
                  style={{ background: `${config.theme.accent}12` }}
                >
                  <span className="font-montserrat text-4xl font-bold opacity-30" style={{ color: config.theme.accent }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <h3 className="font-geist text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2 font-inter text-white/60">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {layout === 'bento' && (
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {config.services.map((item, i) => (
            <div key={item.title} className={i === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}>
              {card(item, i)}
            </div>
          ))}
        </div>
      )}

      {layout === 'cards-row' && (
        <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
          {config.services.map((item, i) => (
            <div key={item.title} className="w-[280px] shrink-0">
              {card(item, i)}
            </div>
          ))}
        </div>
      )}

      {layout === 'timeline-cards' && (
        <div className="relative space-y-0 border-l border-white/10 pl-8">
          {config.services.map((item, i) => (
            <Reveal key={item.title}>
              <div className="relative pb-10">
                <div
                  className="absolute -left-[37px] top-0 flex size-4 items-center justify-center rounded-full border-2 bg-black"
                  style={{ borderColor: config.theme.accent }}
                />
                {card(item, i)}
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {layout === 'mosaic' && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {config.services.map((item, i) => (
            <div key={item.title} className={i % 3 === 0 ? 'lg:col-span-2' : ''}>
              {card(item, i)}
            </div>
          ))}
        </div>
      )}

      {layout === 'grid' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {config.services.map((item, i) => card(item, i))}
        </div>
      )}
    </section>
  );
}

function WhyChooseSection({ config }: { config: ServicePageConfig }) {
  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="Why Logisoft"
        title="Why Choose Logisoft"
        description="Trusted by enterprises for delivery excellence, security, and measurable outcomes."
        accent={config.theme.accent}
      />
      <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {config.whyChoose.map((item) => (
          <StaggerItem key={item.title}>
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6"
            >
              <div
                className="mb-4 size-2 rounded-full"
                style={{ background: config.theme.accent, boxShadow: `0 0 12px ${config.theme.accent}` }}
              />
              <h3 className="font-geist text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 font-inter text-sm text-white/55">{item.description}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

function TechStackSection({ config }: { config: ServicePageConfig }) {
  return (
    <section className="section-shell bg-[#030712]/50">
      <SectionHeading
        eyebrow="Technology"
        title="Technology Stack"
        description="Modern, proven technologies powering secure and scalable delivery."
        accent={config.theme.accent}
      />
      <Reveal>
        <div className="flex flex-wrap justify-center gap-3">
          {config.technologies.map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${config.theme.accent}44` }}
              className="cursor-default rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 font-geist text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function IndustriesSection({ config }: { config: ServicePageConfig }) {
  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="Industries"
        title="Industries We Serve"
        accent={config.theme.accent}
      />
      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
        {config.industries.map((ind, i) => (
          <Reveal key={ind.name} delay={i * 0.05}>
            <div className="w-[300px] shrink-0 rounded-2xl border border-white/10 bg-[rgba(18,27,45,0.65)] p-6 backdrop-blur-md">
              <h3 className="font-jakarta text-xl font-semibold text-white">{ind.name}</h3>
              <p className="mt-3 font-inter text-sm leading-relaxed text-white/60">{ind.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SuccessSection({ config }: { config: ServicePageConfig }) {
  return (
    <section className="section-shell bg-[#030712]/50">
      <SectionHeading
        eyebrow="Results"
        title="Success Stories"
        accent={config.theme.accent}
      />
      <div className="grid gap-6 md:grid-cols-3">
        {config.successStories.map((story, i) => (
          <Reveal key={story.title} delay={i * 0.08}>
            <div className="glass-partner flex h-full flex-col rounded-2xl p-6">
              <p className="font-geist text-xs font-semibold uppercase tracking-wider text-white/40">{story.client}</p>
              <h3 className="mt-2 font-geist text-lg font-bold text-white">{story.title}</h3>
              <p className="mt-3 flex-1 font-inter text-sm text-white/60">{story.result}</p>
              <p className="mt-4 font-inter text-sm font-semibold" style={{ color: config.theme.accent }}>
                View case study →
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProcessSection({ config }: { config: ServicePageConfig }) {
  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="Methodology"
        title="Our Process"
        description="A proven framework from discovery through continuous optimization."
        accent={config.theme.accent}
      />
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-white/10 md:block md:left-1/2" />
        {config.process.map((step, i) => (
          <Reveal key={step.step}>
            <div
              className={`relative mb-8 flex flex-col md:w-1/2 ${
                i % 2 === 0 ? 'md:mr-auto md:pr-12 md:text-right' : 'md:ml-auto md:pl-12 md:translate-x-0'
              }`}
            >
              <div
                className="absolute left-0 flex size-8 items-center justify-center rounded-full font-geist text-sm font-bold text-white md:left-1/2 md:-translate-x-1/2"
                style={{ background: config.theme.accent }}
              >
                {step.step}
              </div>
              <div className="ml-12 rounded-xl border border-white/10 bg-white/[0.03] p-5 md:ml-0">
                <h3 className="font-geist font-bold text-white">{step.title}</h3>
                <p className="mt-2 font-inter text-sm text-white/55">{step.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FaqSection({ config }: { config: ServicePageConfig }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-shell bg-[#030712]/50">
      <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" accent={config.theme.accent} />
      <div className="mx-auto max-w-3xl space-y-3">
        {config.faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={faq.question} delay={i * 0.04}>
              <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-geist text-base font-semibold text-white">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-white/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-white/10 px-5 py-4 font-inter text-sm leading-relaxed text-white/60">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function CtaSection({ config }: { config: ServicePageConfig }) {
  return (
    <section id="contact" className="section-shell">
      <Reveal>
        <div
          className="relative overflow-hidden rounded-3xl border border-white/10 px-8 py-16 text-center sm:px-16"
          style={{
            background: `linear-gradient(135deg, ${config.theme.accent}22 0%, rgba(10,16,28,0.98) 50%, ${config.theme.accentSecondary}18 100%)`,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: `radial-gradient(circle at 50% 0%, ${config.theme.glowColor}, transparent 55%)` }}
          />
          <div className="relative z-[1]">
            <h2 className="font-montserrat text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to transform with {config.title}?
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-inter text-white/60">
              Partner with Logisoft for enterprise-grade delivery, dedicated support, and measurable business outcomes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:info@logisoft.com"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-xl px-8 py-3 font-inter font-bold text-white"
                style={{ background: config.theme.accent }}
              >
                Talk to an Expert
                <ArrowRight size={18} />
              </a>
              <a
                href="/"
                className="inline-flex min-h-[52px] items-center rounded-xl border border-white/25 px-8 py-3 font-inter font-semibold text-white hover:bg-white/5"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function ServicePageView({ config }: { config: ServicePageConfig }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <Navbar />
      <main>
        <ServiceHero config={config} />
        <OverviewSection config={config} />
        <ServicesIncludedSection config={config} />
        <WhyChooseSection config={config} />
        <TechStackSection config={config} />
        <IndustriesSection config={config} />
        <SuccessSection config={config} />
        <ProcessSection config={config} />
        <FaqSection config={config} />
        <CtaSection config={config} />
      </main>
      <Footer />
    </div>
  );
}
