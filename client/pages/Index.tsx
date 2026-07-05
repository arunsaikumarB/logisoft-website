import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  LayoutGrid, ShieldCheck, FileText, BarChart2, Puzzle,
  CircleCheck, ChevronRight, CirclePlay, ChevronLeft, Send, ArrowRight,
  BadgeCheck, Network, Users, Globe,
  ChefHat, CalendarCheck, BookOpen,
  type LucideIcon,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TechStackSection from '@/components/TechStackSection';
import ServicesSection from '@/components/sections/ServicesSection';

// ─── Figma asset URLs ─────────────────────────────────────────────────────────
const LOGO_IMG    = '/logisoft-logo.svg';

// Hero floating-card icons — exact Figma sizes per card
const ICON_AI = 'https://www.figma.com/api/mcp/asset/1d527ee8-31bf-4c8d-b962-3115c343a5ab'; // w15.84 h16.67
const ICON_DT = 'https://www.figma.com/api/mcp/asset/e3f8339c-27b8-4a53-929c-5ec47fca33bd'; // w16.67 h13.33
const ICON_CS = 'https://www.figma.com/api/mcp/asset/1fea5843-42aa-4ba3-b40c-6b2ba41fd096'; // w13.33 h16.67
const ICON_CE = 'https://www.figma.com/api/mcp/asset/58f33bfa-da25-42c0-92f0-158dd6794d11'; // w18.33 h13.33

// ─── Industry images — exact from Figma 407:3533 ─────────────────────────────
const IMG_HOSPITALITY = 'https://www.figma.com/api/mcp/asset/5898c744-9143-470d-adac-baeb01c20ad8'; // 134×151
const IMG_HEALTHCARE  = 'https://www.figma.com/api/mcp/asset/e95b238c-427c-4cf3-b0df-dd67de1deed8'; // 134×147
const IMG_LOGISTICS   = 'https://www.figma.com/api/mcp/asset/dbd59536-0093-4b7e-a57e-8d134e1e9123'; // 134×161
const IMG_FOOD        = 'https://www.figma.com/api/mcp/asset/c86b221c-4f2b-4753-bd5c-2353233b67d0'; // 134×161
const IMG_RETAIL      = 'https://www.figma.com/api/mcp/asset/ff6938aa-8042-4588-8c32-3b9646cdb558'; // 134×147
const IMG_ENERGY      = 'https://www.figma.com/api/mcp/asset/d9353e08-56cb-40a4-a82a-9476a97e4d4c'; // 134×131
// Arrow icon in industry cards (16×16)
const IMG_ARROW       = 'https://www.figma.com/api/mcp/asset/dadeebdf-cab4-4fe5-8540-3dc761053442';

// ─── Marquee logos (/public — user-uploaded from Figma) ───────────────────────
const M_PRUDENTIAL = encodeURI('/Prudential-Financial-logo 1.png');
const M_FLIGHT     = encodeURI('/FlightSafety-Logo-Color.svg 1.png');
const M_COX        = encodeURI('/Cox-Automotive 1.png');
const M_LUCKY      = encodeURI('/logo-luckys-market-500x500 1.png');
const M_PNC        = encodeURI('/PNC-logo 1.png');
const M_OCEANIA    = encodeURI('/Oceania_cruises_logo.svg 1.png');
const M_CITI       = encodeURI('/Citi.svg 2.png');
const M_EXTRA1     = encodeURI('/96558095f5b123dac86c96445375727c 1.png');
const M_DAIICHI    = encodeURI('/1200px-Daiichi-sankyo_logomark.svg 1.png');
const M_IMG31      = encodeURI('/image 31.png');
const M_IMG32      = encodeURI('/image 32.png');
const M_CHATGPT    = encodeURI('/ChatGPT Image Jun 24, 2026, 05_16_08 PM 1.png');

// ─── Partner logos & badges ───────────────────────────────────────────────────
const LOGO_MICROSOFT = 'https://www.figma.com/api/mcp/asset/9bac4598-ea3a-4b63-9945-98761ec5c397';
const LOGO_DYNAMICS  = 'https://www.figma.com/api/mcp/asset/3670c58c-dccb-489c-82b0-d0a7fe6442b9';
const LOGO_AWS       = 'https://www.figma.com/api/mcp/asset/a55ee198-06e7-448d-9fda-acb24365606d';
const IMG_NMSDC      = 'https://www.figma.com/api/mcp/asset/f4e4d111-ab14-443b-b0d1-ab089949484d';

// ─── FAQ + Footer assets ──────────────────────────────────────────────────────
const IMG_FAQ      = 'https://www.figma.com/api/mcp/asset/074d3796-15aa-471d-b4a6-0af4ff06d0d8';
const FAQ_CHAT_SVG = 'https://www.figma.com/api/mcp/asset/3f35423b-619e-41f1-939b-b3f79841c633';
const FAQ_ARROW    = 'https://www.figma.com/api/mcp/asset/2dc19dcc-a828-4438-b40e-af000740bb3b';

// ─── Fade-up animation helper ─────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

// Figma Smart Animate — 2000ms boomerang, cubic-bezier(0.42, 0, 0.58, 1)
const FIGMA_FLOAT_TRANSITION = {
  duration: 2,
  ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
  repeat: Infinity,
  repeatType: 'reverse' as const,
};

// ─── Hero floating card — Figma specs ────────────────────────────────────────
// bg-[rgba(255,255,255,0.03)] border-[#053579] shadow-[0px_4px_49px_rgba(0,84,165,0.46)]
interface HeroCardProps {
  figmaId: string;
  icon: string; iconStyle?: React.CSSProperties;
  title: string; subtitle: string;
  float: { animX: number; animY: number };
  entranceX: number; delay: number;
  style: React.CSSProperties;
}
function HeroCard({ figmaId, icon, iconStyle, title, subtitle, float, entranceX, delay, style }: HeroCardProps) {
  const reduceMotion = useReducedMotion();
  return (
    // Outer wrapper owns absolute position + one-shot entrance (slide/fade).
    <motion.div
      data-node-id={figmaId}
      style={{ position: 'absolute', ...style }}
      initial={{ opacity: 0, x: entranceX, y: 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {/* Inner card — Figma boomerang float (2000ms, ease-in-out, hold on X when animX=0) */}
      <motion.div
        style={{
          maxWidth: '220px',
          borderRadius: '24px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid #053579',
          boxShadow: '0 4px 49px rgba(0,84,165,0.46)',
          backdropFilter: 'blur(20px)',
          padding: '17px 21px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          willChange: 'transform',
        }}
        animate={reduceMotion ? undefined : {
          x: float.animX !== 0 ? [0, float.animX] : 0,
          y: [0, float.animY],
        }}
        transition={reduceMotion ? undefined : FIGMA_FLOAT_TRANSITION}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={icon} alt={title} style={{ objectFit: 'contain', flexShrink: 0, ...iconStyle }} />
          <span style={{
            fontFamily: "'Inter',sans-serif", fontWeight: 700,
            fontSize: '14px', letterSpacing: '0.28px', color: '#dfe1f6', whiteSpace: 'nowrap',
          }}>
            {title}
          </span>
        </div>
        <p style={{
          fontFamily: "'Inter',sans-serif", fontWeight: 400,
          fontSize: '12px', color: '#c2c6d7', lineHeight: '15px', margin: 0,
        }}>
          {subtitle}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
// Figma frame: 1440 × 900. We scale to 980px height (ratio 980/900 = 1.089).
// All absolute positions are scaled accordingly and centred inside a 1440px container.
const HERO_H = 980;
const HERO_H_W = 1440; // fixed Figma canvas width
const FIGMA_H = 900;
const S = HERO_H / FIGMA_H; // scale factor ≈ 1.089

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Responsive scale: the hero is a fixed 1440-wide Figma canvas. On narrower
  // viewports we scale the whole canvas down so nothing is clipped, keeping
  // the exact Figma proportions and centering it horizontally.
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => setScale(Math.min(1, window.innerWidth / 1440));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.05 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const years    = useCountUp(18,  2200, inView);
  const projects = useCountUp(500, 2400, inView);
  const clients  = useCountUp(150, 2600, inView);

  // Figma floating cards — node 362:1550, animation keyframes from prototype JSON
  const cards = [
    {
      figmaId: '341:2878',
      icon: ICON_AI,
      iconStyle: { width: '15.84px', height: '16.67px' },
      title: 'AI & Analytics', subtitle: 'Smarter Insights, Better Decisions',
      x: 81, y: 408, animX: 0, animY: -19,
      entranceX: -20, delay: 0.4,
    },
    {
      figmaId: '341:2896',
      icon: ICON_CE,
      iconStyle: { width: '18.33px', height: '13.33px' },
      title: 'Cloud Engineering', subtitle: 'Scalable. Reliable. Future Ready.',
      x: 1145, y: 411, animX: 6, animY: -10,
      entranceX: 20, delay: 0.55,
    },
    {
      figmaId: '341:2887',
      icon: ICON_CS,
      iconStyle: { width: '13.33px', height: '16.67px' },
      title: 'Cyber Security', subtitle: 'Threats Identified. Systems Protected.',
      x: 160, y: 593, animX: 0, animY: 11,
      entranceX: -20, delay: 0.7,
    },
    {
      figmaId: '341:2905',
      icon: ICON_DT,
      iconStyle: { width: '16.67px', height: '13.33px' },
      title: 'Digital Transformation', subtitle: 'Transforming Today. Leading Tomorrow.',
      x: 1076, y: 605, animX: 14, animY: 9,
      entranceX: 20, delay: 0.85,
    },
  ];

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-black min-h-screen lg:min-h-0"
      style={{ height: undefined }}
    >
      {/* ── Background video (full-bleed, centered cover) ──────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute left-0 top-[111px] h-auto min-h-full w-auto min-w-full object-cover"
        >
          <source src="/main V2.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Ambient lighting ──────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[180px] -top-[180px] size-[860px] rounded-full blur-[48px]" style={{ background: 'radial-gradient(circle, rgba(0,84,165,0.24) 0%, rgba(0,84,165,0.09) 42%, transparent 68%)' }} />
        <div className="absolute -bottom-20 -left-[120px] size-[720px] rounded-full blur-[64px]" style={{ background: 'radial-gradient(circle, rgba(0,84,165,0.18) 0%, rgba(0,84,165,0.06) 48%, transparent 70%)' }} />
      </div>

      {/* ── Mobile / tablet layout ── */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pb-12 pt-24 sm:px-8 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 sm:gap-[10px] sm:px-6"
          style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(153,153,153,0.1))' }}
        >
          <span className="size-1.5 shrink-0 rounded-full bg-[#0054a5]" />
          <span className="text-center font-montserrat text-[10px] font-medium uppercase tracking-[1.5px] text-[#efefef] sm:text-xs sm:tracking-[2px]">
            Enterprise AI &amp; Digital Transformation
          </span>
          <span className="size-1.5 shrink-0 rounded-full bg-[#0054a5]" />
        </motion.div>

        <motion.div
          className="mt-6 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
        >
          <span className="text-gradient-hero block font-montserrat text-3xl font-medium uppercase leading-tight tracking-[-1px] sm:text-5xl sm:leading-[1.1]">
            Building the Future of
          </span>
          <span className="text-gradient-hero block font-montserrat text-3xl font-extrabold uppercase leading-tight tracking-[-1px] sm:text-5xl sm:leading-[1.1]">
            Enterprise Technology
          </span>
        </motion.div>

        <div className="mt-8 grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
          {cards.map((card) => (
            <div
              key={card.figmaId}
              className="glass-card flex flex-col gap-2 p-4"
            >
              <div className="flex items-center gap-3">
                <img src={card.icon} alt={card.title} style={{ ...card.iconStyle, objectFit: 'contain' }} />
                <span className="font-inter text-sm font-bold tracking-wide text-[#dfe1f6]">{card.title}</span>
              </div>
              <p className="font-inter text-xs leading-snug text-[#c2c6d7]">{card.subtitle}</p>
            </div>
          ))}
        </div>

        <motion.div
          className="mt-8 w-full"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.55 }}
        >
          <p className="mb-6 text-center font-montserrat text-sm leading-relaxed text-white sm:text-base">
            Helping organizations innovate through AI, Enterprise Software, Cloud Engineering,
            Cybersecurity, and Digital Transformation.
          </p>
          <div className="glass-stats grid grid-cols-2 gap-4 p-4 sm:grid-cols-4 sm:gap-6 sm:p-6">
            {[
              { value: `${years}+`, label: 'YEARS OF EXCELLENCE' },
              { value: `${projects}+`, label: 'SUCCESSFUL PROJECTS' },
              { value: `${clients}+`, label: 'GLOBAL CLIENTS' },
              { value: '24/7', label: 'SUPPORT & SECURITY' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1 text-center sm:text-left">
                <span className="font-inter text-2xl font-bold text-[#0054a5] sm:text-[30px]">{value}</span>
                <span className="font-inter text-[10px] font-semibold uppercase tracking-wide text-white">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Desktop Figma canvas ── */}
      <div
        className="relative hidden lg:block"
        style={{ height: `${Math.round(HERO_H * scale)}px`, width: '100%' }}
      >
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        width: `${HERO_H_W}px`,
        height: `${HERO_H}px`,
        transform: `translateX(-50%) scale(${scale})`,
        transformOrigin: 'top center',
        zIndex: 10,
      }}>

        {/* Badge — Figma: Montserrat Medium 16px tracking 2px */}
        <motion.div
          style={{
            position: 'absolute',
            top: `${Math.round(125 * S)}px`,
            left: 0, right: 0,
            display: 'flex', justifyContent: 'center',
            zIndex: 10,
          }}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '10px 24px', borderRadius: '100px',
            background: 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(153,153,153,0.1))',
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0054a5', flexShrink: 0 }} />
            <span style={{
              fontFamily: "'Montserrat','Inter',sans-serif", fontWeight: 500,
              fontSize: '16px', letterSpacing: '2px', color: '#efefef',
              textTransform: 'uppercase', whiteSpace: 'nowrap',
            }}>
              ENTERPRISE AI &amp; DIGITAL TRANSFORMATION
            </span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0054a5', flexShrink: 0 }} />
          </div>
        </motion.div>

        {/* Heading — Figma: Montserrat 70px, tracking -2.8px */}
        <motion.div
          style={{
            position: 'absolute',
            top: `${Math.round(193 * S)}px`,
            left: 0, right: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            zIndex: 10,
          }}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
        >
          {/* Line 1 — Montserrat Medium */}
          <span style={{
            display: 'block', textAlign: 'center',
            fontFamily: "'Montserrat','Inter',sans-serif",
            fontSize: '70px',
            fontWeight: 500,
            letterSpacing: '-2.8px',
            lineHeight: '80px',
            textTransform: 'uppercase',
            backgroundImage: 'linear-gradient(88.24deg, rgba(255,255,255,0.4) 1.56%, rgb(255,255,255) 23.75%, rgb(255,255,255) 50.16%, rgba(255,255,255,0.4) 97.71%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Building the Future of
          </span>
          {/* Line 2 — Montserrat ExtraBold */}
          <span style={{
            display: 'block', textAlign: 'center',
            fontFamily: "'Montserrat','Inter',sans-serif",
            fontSize: '70px',
            fontWeight: 800,
            letterSpacing: '-2.8px',
            lineHeight: '80px',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            backgroundImage: 'linear-gradient(88.24deg, rgba(255,255,255,0.4) 1.56%, rgb(255,255,255) 23.75%, rgb(255,255,255) 50.16%, rgba(255,255,255,0.4) 97.71%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Enterprise Technology
          </span>
        </motion.div>

        {/* Floating cards — Figma prototype boomerang (341:2878–341:2905) */}
        {cards.map((card) => (
          <HeroCard
            key={card.figmaId}
            figmaId={card.figmaId}
            icon={card.icon}
            iconStyle={card.iconStyle}
            title={card.title}
            subtitle={card.subtitle}
            style={{
              left: `${Math.round(card.x * S)}px`,
              top: `${Math.round(card.y * S)}px`,
              zIndex: 10,
            }}
            float={{ animX: card.animX, animY: card.animY }}
            entranceX={card.entranceX}
            delay={card.delay}
          />
        ))}

        {/* Stats panel — Figma: left=52, y=779, w=1304, h=99, p=33px */}
        <motion.div
          style={{ position: 'absolute', bottom: '22px', left: '52px', right: '52px', zIndex: 10 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.55 }}
        >
          <div style={{
            display: 'flex', alignItems: 'center',
            height: '99px', padding: '33px', borderRadius: '16px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(4px)',
          }}>
            {/* Description */}
            <p style={{
              fontFamily: "'Montserrat','Inter',sans-serif", fontWeight: 400,
              fontSize: '16px', lineHeight: '30px',
              color: 'white', width: '525px', flexShrink: 0, margin: 0,
            }}>
              Helping organizations innovate through AI, Enterprise Software, Cloud Engineering
              Cybersecurity, and Digital Transformation.
            </p>

            {/* Divider */}
            <div style={{ width: '0.83px', height: '64px', flexShrink: 0, background: 'rgba(255,255,255,0.4)', margin: '0 48px' }} />

            {/* Stats grid */}
            <div style={{ display: 'flex', flex: 1, gap: '48px', alignItems: 'center' }}>
              {[
                { value: `${years}+`,    label: 'YEARS OF EXCELLENCE'  },
                { value: `${projects}+`, label: 'SUCCESSFUL PROJECTS'  },
                { value: `${clients}+`,  label: 'GLOBAL CLIENTS'       },
                { value: '24/7',         label: 'SUPPORT & SECURITY'   },
              ].map(({ value, label }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{
                    fontFamily: "'Inter',sans-serif", fontWeight: 700,
                    fontSize: '30px', lineHeight: '30px', color: '#0054a5',
                  }}>
                    {value}
                  </span>
                  <span style={{
                    fontFamily: "'Inter',sans-serif", fontWeight: 600,
                    fontSize: '10px', letterSpacing: '0.5px',
                    color: 'white', textTransform: 'uppercase', whiteSpace: 'nowrap',
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}

// ─── PRODUCTS SHOWCASE (Figma 407:3531) ───────────────────────────────────────
const PROD_MACBOOK = '/assets/macbook-mockup.png';

const products: {
  id: string; name: string; category: string; Icon: LucideIcon;
  description: string; features: string[];
}[] = [
  {
    id: 'chefgaa',
    name: 'CHEFGAA',
    category: 'RESTAURANT MANAGEMENT',
    Icon: ChefHat,
    description: 'Chefgaa is a cloud-based restaurant management platform that streamlines POS, online ordering, kitchen operations, reservations, payments, and customer engagement—all from a single, intelligent dashboard.',
    features: ['Smart Restaurant Operations', 'Seamless Customer Experience', 'AI-Driven Business Growth'],
  },
  {
    id: 'event',
    name: 'EVENT BOOKING PLUS',
    category: 'SECURITY PLATFORM',
    Icon: CalendarCheck,
    description: 'A comprehensive event booking and security platform designed for venues that need real-time monitoring, access control, and seamless guest management at scale.',
    features: ['Real-Time Event Monitoring', 'Secure Access Control', 'Integrated Booking Workflows'],
  },
  {
    id: 'ntrustly',
    name: 'NTRUSTLY',
    category: 'ANALYTICS SUITE',
    Icon: BarChart2,
    description: 'NTrustly delivers enterprise-grade analytics with AI-powered insights, helping organizations make data-driven decisions with confidence and clarity.',
    features: ['Advanced Data Visualization', 'Predictive Analytics', 'Custom Reporting Dashboards'],
  },
  {
    id: 'class',
    name: 'CLASS BOOKING PLUS',
    category: 'INTEGRATION HUB',
    Icon: BookOpen,
    description: 'Class Booking Plus connects your scheduling, payments, and communication tools into one unified hub—built for education and training providers.',
    features: ['Unified Scheduling', 'Multi-Platform Integration', 'Automated Notifications'],
  },
];

/** Figma 369:2213 — orbit badges with prototype float keyframes (369:2214–369:2238) */
const floatingBadges: {
  figmaId: string;
  label: string; Icon: LucideIcon; style: React.CSSProperties; float: { animY: number };
}[] = [
  { figmaId: '369:2214', label: 'REAL-TIME TRACKING', Icon: LayoutGrid,  style: { left: '358px', top: '-1px' }, float: { animY: 34 } },
  { figmaId: '369:2220', label: 'SECURE DATA',        Icon: ShieldCheck, style: { left: '116px', top: '78px' }, float: { animY: 27 } },
  { figmaId: '369:2226', label: 'ADVANCED ANALYTICS', Icon: BarChart2,   style: { left: '146px', top: '348px' }, float: { animY: -32 } },
  { figmaId: '369:2232', label: 'SMART DOCUMENTS',    Icon: FileText,    style: { left: '517px', top: '119px' }, float: { animY: 37 } },
  { figmaId: '369:2238', label: 'AUTOMATION ENGINE',  Icon: Puzzle,      style: { left: '435px', top: '396px' }, float: { animY: -17 } },
];

/** Diagonal connector lines between orbit badges and MacBook center (Figma 373:751) */
function OrbitConnectorLines() {
  const cx = 344;
  const cy = 238;
  const lines: [number, number][] = [
    [388, 47],   // Real-Time Tracking
    [146, 175],  // Secure Data
    [178, 369],  // Advanced Analytics
    [559, 185],  // Smart Documents
    [480, 411],  // Automation Engine
  ];
  return (
    <svg
      className="absolute inset-0 pointer-events-none z-[15]"
      width="688"
      height="476"
      viewBox="0 0 688 476"
      fill="none"
      aria-hidden
    >
      {lines.map(([x1, y1], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={cx}
          y2={cy}
          stroke="rgba(59,130,246,0.22)"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

function FloatingBadge({ figmaId, label, Icon, style, float, reduceMotion }: {
  figmaId: string;
  label: string; Icon: LucideIcon; style: React.CSSProperties;
  float: { animY: number }; reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      data-node-id={figmaId}
      className="absolute z-30 hidden flex-col items-center gap-2 lg:flex"
      style={style}
      animate={reduceMotion ? undefined : { x: 0, y: [0, float.animY] }}
      transition={reduceMotion ? undefined : FIGMA_FLOAT_TRANSITION}
    >
      <div style={{
        width: '60px', height: '60px', borderRadius: '9999px',
        background: 'rgba(10,20,45,0.85)', border: '1px solid rgba(59,130,246,0.45)',
        boxShadow: '0 0 20px rgba(47,128,255,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(10px)',
      }}>
        <Icon size={28} strokeWidth={1.5} className="text-[#3B82F6]" aria-hidden />
      </div>
      <span className="font-inter text-[10px] text-[#9ca3af] text-center uppercase tracking-[-0.5px]" style={{ lineHeight: '12.5px', maxWidth: '108px' }}>
        {label}
      </span>
    </motion.div>
  );
}

function ProductsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = products[activeIdx];

  const prev = () => setActiveIdx(i => (i - 1 + products.length) % products.length);
  const next = () => setActiveIdx(i => (i + 1) % products.length);

  return (
    <section
      id="products"
      className="section-shell-full"
      style={{
        background: 'radial-gradient(ellipse 1534px 954px at 80% 70%, rgba(47,128,255,0.1) 0%, rgba(47,128,255,0) 40%), #000',
      }}
    >
      <div className="pointer-events-none absolute hidden lg:block" style={{ left: '347px', top: '-793px', width: '2609px', height: '2609px' }}>
        <div style={{
          transform: 'rotate(24.86deg)', width: '100%', height: '100%', opacity: 0.25,
          filter: 'drop-shadow(-517px -334px 53.55px #0054a5)',
          background: 'radial-gradient(circle at center, rgba(47,128,255,0.15) 0%, transparent 55%)',
          borderRadius: '50%',
        }} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] section-content items-center justify-center overflow-hidden">
        <div className="section-intro w-full shrink-0">
          <h2 className="section-title text-center font-inter text-2xl font-extrabold leading-tight tracking-[-1.5px] sm:text-3xl lg:text-5xl xl:text-[60px] xl:leading-[60px]">
            <span className="text-white">Powerful Products. </span>
            <span className="bg-gradient-to-r from-[#60a5fa] to-[#8b5cf6] bg-clip-text text-transparent">Real-World Impact.</span>
          </h2>
          <p className="section-lead text-center font-inter text-sm text-[#9ca3af] sm:text-base lg:text-lg">
            Enterprise-grade solutions built to streamline operations, boost efficiency, and drive digital transformation.
          </p>
        </div>

        <div className="flex w-full max-w-[1280px] flex-col items-center justify-center gap-10 lg:flex-row lg:gap-16">
          <div className="relative flex h-[300px] w-full shrink-0 items-center justify-center sm:h-[400px] lg:h-[476px] lg:w-[55%]">
            <div className="relative mx-auto h-full w-full max-w-[688px]">
              <OrbitConnectorLines />
              {/* MacBook mockup — centered */}
              <div
                className="absolute pointer-events-none z-20 w-[280px] sm:w-[360px] lg:w-[500px]"
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
              >
                <img
                  src={PROD_MACBOOK}
                  alt="MacBook product mockup"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    mixBlendMode: 'screen',
                  }}
                />
              </div>
              {floatingBadges.map(b => (
                <FloatingBadge key={b.figmaId} {...b} reduceMotion={reduceMotion} />
              ))}
            </div>
          </div>

          {/* Right column ~45% — Figma 369:2248 */}
          <div className="flex w-full shrink-0 flex-col justify-center gap-4 lg:h-[476px] lg:w-[45%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-4"
              >
                <div style={{
                  display: 'inline-flex', alignSelf: 'flex-start',
                  padding: '11.5px 13px 7.5px', borderRadius: '6px',
                  background: 'rgba(47,128,255,0.1)', border: '1px solid rgba(47,128,255,0.3)',
                }}>
                  <span className="font-inter font-bold text-[10px] text-[#2f80ff] uppercase tracking-[2px] leading-[15px]">
                    FEATURED PRODUCT
                  </span>
                </div>
                <h3 className="font-inter text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[36px] lg:leading-[40px]">{active.name}</h3>
                <p className="font-inter text-sm leading-relaxed text-[#bbc9cf] sm:text-base lg:text-lg">{active.description}</p>
                <ul className="flex flex-col gap-4 py-4">
                  {active.features.map(f => (
                    <li key={f} className="flex items-center gap-3">
                      <CircleCheck size={20} strokeWidth={2} className="text-[#3B82F6] shrink-0" aria-hidden />
                      <span className="font-inter text-[16px] text-[#e2e2e2] leading-6">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <button type="button" className="flex min-h-[44px] items-center justify-center gap-3 rounded-xl bg-[#3B82F6] px-4 py-3 font-inter text-sm font-bold text-white transition-colors hover:bg-[#2563eb] sm:gap-5 sm:px-[15px] sm:py-[15px] sm:text-base">
                    Explore Website
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20">
                      <ChevronRight size={16} strokeWidth={2} aria-hidden />
                    </span>
                  </button>
                  <button type="button" className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 font-inter text-sm font-bold text-white transition-colors hover:border-white/40 sm:text-base">
                    View Demo
                    <CirclePlay size={20} strokeWidth={2} className="text-[#3B82F6]" aria-hidden />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative w-full shrink-0 px-2 sm:px-8">
          <button type="button" onClick={prev} aria-label="Previous product" className="absolute left-0 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-transparent text-white transition-colors hover:border-white/30 sm:flex">
            <ChevronLeft size={24} strokeWidth={2} aria-hidden />
          </button>
          <button type="button" onClick={next} aria-label="Next product" className="absolute right-0 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-transparent text-white transition-colors hover:border-white sm:flex">
            <ChevronRight size={24} strokeWidth={2} aria-hidden />
          </button>

          <div className="scrollbar-hide mx-auto flex gap-3 overflow-x-auto rounded-2xl p-3 sm:mx-12 sm:gap-4 sm:p-[18px] lg:grid lg:max-w-[1216px] lg:grid-cols-4 lg:overflow-visible" style={{
            backdropFilter: 'blur(6px)', background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.37)',
            scrollbarWidth: 'none',
          }}>
            {products.map((p, i) => {
              const isActive = i === activeIdx;
              const ProductIcon = p.Icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className="shrink-0 text-left transition-all"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    minWidth: '220px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid transparent',
                    cursor: 'pointer',
                    background: isActive ? 'rgba(59,130,246,0.08)' : 'transparent',
                    borderColor: isActive ? 'rgba(59,130,246,0.5)' : 'transparent',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: 'rgba(56,189,248,0.1)',
                      border: '1px solid rgba(56,189,248,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <ProductIcon size={22} color="#38BDF8" strokeWidth={2} aria-hidden />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span
                      style={{
                        color: isActive ? '#fff' : '#d1d5db',
                        fontWeight: 700,
                        fontSize: '13px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {p.name}
                    </span>
                    <span
                      style={{
                        color: isActive ? 'rgba(255,255,255,0.4)' : '#6b7280',
                        fontSize: '11px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {p.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── INDUSTRIES SECTION ───────────────────────────────────────────────────────
// Image sizes from Figma node 407:3533 — all 134px wide, heights vary per card
const industries = [
  { name: 'Hospitality',               desc: 'Enhancing hospitality with intelligent digital solutions.', img: IMG_HOSPITALITY, imgH: 151 },
  { name: 'Healthcare',                desc: 'Enhancing hospitality with intelligent digital solutions.', img: IMG_HEALTHCARE,  imgH: 147 },
  { name: 'Logistics & E-Services',    desc: 'Enhancing hospitality with intelligent digital solutions.', img: IMG_LOGISTICS,   imgH: 161 },
  { name: 'Food & Beverages',          desc: 'Enhancing hospitality with intelligent digital solutions.', img: IMG_FOOD,        imgH: 161 },
  { name: 'Retail & E-Commerce',       desc: 'Enhancing hospitality with intelligent digital solutions.', img: IMG_RETAIL,      imgH: 147 },
  { name: 'Energy & Gas Distribution', desc: 'Enhancing hospitality with intelligent digital solutions.', img: IMG_ENERGY,      imgH: 131 },
];

function IndustriesSection() {
  return (
    <section id="services" className="section-shell">
      {/* Global blue glow behind cards */}
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '699px', height: '699px' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,84,165,0.18) 0%, rgba(0,149,218,0.08) 40%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="relative section-content items-center">
        {/* Heading block — center-aligned */}
        <motion.div
          className="section-intro flex w-full flex-col items-center"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.h2
            variants={fadeUp}
            className="section-title w-full text-center font-geist text-2xl font-bold leading-tight tracking-[1.92px] text-[#e1e3e4] sm:text-3xl lg:text-5xl lg:leading-[56px]"
          >
            Empowering Diverse Sectors with<br />
            <span style={{ backgroundImage: 'linear-gradient(90deg, #60a5fa 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Technological Excellence
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="section-lead w-full text-center font-inter text-sm font-normal text-[rgba(255,255,255,0.7)] sm:text-base lg:text-lg"
          >
            We deliver intelligent digital solutions tailored to the unique challenges of modern industries—<br />
            helping organizations innovate, automate, and accelerate growth.
          </motion.p>
        </motion.div>

        <div className="scrollbar-hide flex w-full gap-4 overflow-x-auto pb-2">
          {industries.map(({ name, desc, img, imgH }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group flex w-[280px] shrink-0 cursor-pointer flex-col gap-2 overflow-hidden rounded-[28px] transition-all hover:border-[rgba(0,149,218,0.4)] sm:w-[320px] lg:w-[343px]"
              style={{
                padding: '34px 23px',
                background: 'rgba(18,27,45,0.65)',
                border: '1px solid rgba(0,149,218,0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Image area — 150px tall container, image centered at 134px wide */}
              <div className="flex items-center justify-center shrink-0" style={{ height: '166px', paddingBottom: '16px' }}>
                <img src={img} alt={name} style={{ width: '134px', height: `${imgH}px`, objectFit: 'cover' }} />
              </div>
              {/* Title — Plus Jakarta Sans SemiBold 24px */}
              <h3 className="pb-2 font-jakarta text-lg font-semibold leading-8 text-white sm:text-xl lg:text-2xl">{name}</h3>
              <div className="flex items-start gap-4 sm:gap-8">
                <p className="font-inter text-sm font-normal leading-6 text-[rgba(255,255,255,0.7)] sm:text-base">
                  {desc}
                </p>
                <div
                  className="shrink-0 flex items-center justify-center rounded-full transition-all group-hover:bg-white/20"
                  style={{ width: '48px', height: '48px', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)', background: 'rgba(255,255,255,0.1)', padding: '1px' }}
                >
                  <img src={IMG_ARROW} alt="→" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TRUSTED PARTNERS MARQUEE ─────────────────────────────────────────────────
const marqueeLogos = [
  { src: M_PRUDENTIAL, w: 151, h: 35, alt: 'Prudential' },
  { src: M_FLIGHT,     w: 166, h: 35, alt: 'FlightSafety' },
  { src: M_COX,        w: 107, h: 35, alt: 'Cox Automotive' },
  { src: M_LUCKY,      w: 87,  h: 35, alt: "Lucky's Market" },
  { src: M_PNC,        w: 130, h: 35, alt: 'PNC Bank' },
  { src: M_OCEANIA,    w: 100, h: 35, alt: 'Oceania Cruises' },
  { src: M_CITI,       w: 54,  h: 35, alt: 'Citi' },
  { src: M_EXTRA1,     w: 168, h: 35, alt: 'Partner' },
  { src: M_DAIICHI,    w: 36,  h: 35, alt: 'Daiichi Sankyo' },
  { src: M_IMG31,      w: 110, h: 35, alt: 'Partner' },
  { src: M_IMG32,      w: 64,  h: 35, alt: 'Partner' },
  { src: M_CHATGPT,    w: 72,  h: 35, alt: 'Partner' },
];

// Gap between every logo, constant across the strip (Figma: 80px).
const MARQUEE_GAP = 80;

function MarqueeSection() {
  return (
    <section className="section-shell">
      <div className="section-content items-center justify-center">
      {/* Title pill — Figma node 337:859 */}
      <div
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '20px',
          padding: '10px 24px', borderRadius: '100px',
          background: 'linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(153,153,153,0.1) 14.657%)',
          border: '1px solid rgba(255,255,255,0.25)',
        }}
      >
        <span aria-hidden style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white', flexShrink: 0 }} />
        <span
          className="font-inter font-extrabold text-[16px] text-white text-center uppercase"
          style={{ lineHeight: '16px', letterSpacing: '3.6px', whiteSpace: 'nowrap' }}
        >
          From Vision to Victory: Our Diverse Clientele
        </span>
        <span aria-hidden style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white', flexShrink: 0 }} />
      </div>

      {/* Logo marquee strip — Figma node 284:1299 (h 59, py 12, logos h 35) */}
      <div className="marquee" style={{ height: '59px', paddingTop: '12px', paddingBottom: '12px' }}>
        <div className="marquee-track" style={{ height: '35px' }}>
          {[...marqueeLogos, ...marqueeLogos].map(({ src, w, h, alt }, i) => (
            <img
              key={`${alt}-${i}`}
              src={src}
              alt={alt}
              aria-hidden={i >= marqueeLogos.length}
              className="marquee-logo"
              style={{ width: `${w}px`, height: `${h}px`, marginRight: `${MARQUEE_GAP}px` }}
            />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

// ─── CERTIFIED PARTNERS ───────────────────────────────────────────────────────
// Logo dimensions from Figma node 337:871:
//   Microsoft:   w=250px h=64px  (rounded-rectangle 337:875)
//   Dynamics365: w=200px h=65px  (rounded-rectangle 337:885)
//   AWS:         w=120px h=64px  (rounded-rectangle 337:895)
const certifiedPartners = [
  {
    name: 'Microsoft',
    logo: LOGO_MICROSOFT, logoW: 250, logoH: 64,
    desc: 'Global gold partner delivering high-performance Azure cloud solutions and enterprise digital transformation architectures.',
  },
  {
    name: 'Dynamics 365',
    logo: LOGO_DYNAMICS, logoW: 200, logoH: 65,
    desc: 'Specialized accreditation in Microsoft Dynamics ecosystems, optimizing complex CRM and ERP implementations for scale.',
  },
  {
    name: 'AWS',
    logo: LOGO_AWS, logoW: 120, logoH: 64,
    desc: 'Certified AWS Select Tier partner focused on serverless architecture, cloud security, and data modernization workflows.',
  },
];

const nmscdBadges: { label: string; icon: LucideIcon }[] = [
  { label: 'Certified MBE', icon: BadgeCheck },
  { label: 'Enterprise Partner', icon: Network },
  { label: 'Diversity Driven', icon: Users },
  { label: 'Global Delivery', icon: Globe },
];

function CertifiedPartnersSection() {
  return (
    <section className="section-shell">
      <div className="section-content">
        <motion.div
          className="section-intro text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.h2 variants={fadeUp} className="section-title font-montserrat text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-5xl xl:text-[60px]">
            Certified Partners &amp;{' '}
            <span className="bg-gradient-to-r from-[#60a5fa] to-[#8b5cf6] bg-clip-text text-transparent">Industry Accreditations</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-lead mx-auto max-w-[888px] font-inter text-sm text-[#bbc9cf] sm:text-base lg:text-lg">
            Our strategic partnerships and globally recognized certifications empower us to deliver secure, scalable,
            and enterprise-grade technology solutions for organizations worldwide.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {certifiedPartners.map(({ name, logo, desc }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-partner flex flex-col items-start justify-start gap-4 rounded-2xl p-6 text-left transition-all hover:border-[#0054a5]/30 sm:p-8"
            >
              <div className="flex w-full items-center justify-start" style={{ height: '48px', marginBottom: 0 }}>
                <img
                  src={logo}
                  alt={name}
                  style={{ width: '180px', height: 'auto', objectFit: 'contain', objectPosition: 'left center' }}
                />
              </div>
              <h3
                className="w-full text-left font-montserrat"
                style={{ marginTop: 0, marginBottom: 0, fontSize: '22px', fontWeight: 700, color: '#3B82F6' }}
              >
                {name}
              </h3>
              <p
                className="w-full text-left font-inter"
                style={{ marginTop: 0, fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}
              >
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* NMSDC accreditation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="glass-partner rounded-2xl overflow-hidden"
        >
          <div className="flex flex-col gap-0 lg:grid lg:grid-cols-2">
            <div className="relative flex items-center justify-center p-6 sm:p-8 lg:p-12">
              <img
                src={IMG_NMSDC}
                alt="NMSDC Minority Business Enterprise Certification"
                className="mx-auto h-auto w-48 object-contain sm:w-64 lg:mx-0 lg:w-72"
                style={{ filter: 'drop-shadow(0 0 56px #0054a5)' }}
              />
            </div>
            <div className="flex flex-col gap-4 p-6 sm:gap-6 sm:p-8 lg:p-12">
              <h3 className="bg-gradient-to-r from-[#60a5fa] to-[#8b5cf6] bg-clip-text font-montserrat text-2xl font-bold leading-tight text-transparent sm:text-3xl lg:text-5xl">
                NMSDC Accreditation
              </h3>
              <p className="font-inter text-sm leading-relaxed text-[#bbc9cf] sm:text-base">
                At Logisoft, we specialize in building cutting-edge enterprise products, providing comprehensive
                IT services and solutions, and offering top-tier IT staffing and consulting services across
                the United States. Our team is dedicated to helping businesses achieve their goals through
                tailored technology strategies.
              </p>
              <div className="mt-2 flex flex-row flex-wrap justify-center gap-4 sm:flex-nowrap sm:gap-6 lg:justify-start">
                {nmscdBadges.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex w-[calc(50%-8px)] flex-col items-center gap-2 sm:w-auto">
                    <div className="w-12 h-12 rounded-full border border-[#0054a5]/50 bg-[rgba(0,84,165,0.1)] flex items-center justify-center">
                      <Icon size={28} color="#06B6D4" aria-hidden />
                    </div>
                    <span className="font-inter font-medium text-[12px] text-white/70 text-center">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ SECTION ──────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'What services does Logisoft offer?',
    a: 'Logisoft provides end-to-end digital solutions including AI & Analytics, Cloud Engineering, Cybersecurity, Custom Software Development, and IT Consulting to help businesses innovate, scale, and stay secure in the digital era.',
  },
  { q: 'Which industries do you serve?',               a: 'We serve Healthcare, Hospitality, Logistics, Food & Beverages, Retail & E-Commerce, and Energy sectors with tailored digital solutions and intelligent automation.' },
  { q: 'How does Logisoft ensure data security?',      a: 'We implement enterprise-grade security protocols including end-to-end encryption, zero-trust architecture, real-time threat monitoring, and compliance with ISO 27001 and SOC 2.' },
  { q: 'What is your development process?',            a: 'We follow an agile methodology with discovery, architecture design, iterative sprints, QA, and deployment phases — keeping clients informed and in control throughout.' },
  { q: 'Can Logisoft integrate with our existing systems?', a: 'Absolutely. Our integration specialists work with all major ERPs, CRMs, and legacy systems via REST APIs, GraphQL, and custom middleware to ensure seamless connectivity.' },
  { q: 'What kind of support do you provide?',         a: 'We provide 24/7 dedicated support through live chat, email, and phone — with SLA-guaranteed response times and a proactive monitoring team.' },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="section-shell"
      data-node-id="407:3536"
    >
      <div className="section-content">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="section-title text-center font-inter text-2xl font-extrabold leading-tight tracking-[1.92px] text-[#e1e3e4] sm:text-3xl lg:text-5xl lg:leading-[56px]"
        >
          Frequently Asked{' '}
          <span className="text-gradient-blue">Questions</span>
        </motion.h2>

      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex w-full shrink-0 flex-col gap-6 lg:w-[40%]">
            <motion.h3
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-jakarta text-xl font-bold leading-tight tracking-[-1px] text-[#e2e2e2] sm:text-2xl lg:text-[40px] lg:leading-[48px] lg:tracking-[-2.88px]"
            >
              Everything You Need to Know
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
              className="font-inter text-sm font-normal leading-relaxed text-[#bbc9cf] sm:text-base lg:text-lg"
            >
              Find answers to the most common questions about our services, technologies, and how we help businesses accelerate digital transformation.
            </motion.p>

          {/* 3D FAQ image — Figma 337:947 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center py-4"
          >
            <img
              src={IMG_FAQ}
              alt="FAQ"
              className="mx-auto h-auto w-48 object-contain opacity-80 sm:w-64 lg:w-[280px]"
              style={{ filter: 'drop-shadow(0 4px 42px rgba(0,84,165,0.95))' }}
            />
          </motion.div>

          {/* Still have questions? card — Figma 407:984 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
            data-node-id="407:984"
            className="flex w-full items-center"
            style={{
              maxWidth: '495px',
              gap: '16px',
              padding: '20px 24px',
              borderRadius: '12px',
              background: '#0D1117',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div
              className="flex shrink-0 items-center justify-center rounded-full"
              style={{ width: '48px', height: '48px', background: '#3B82F6' }}
            >
              <Send size={20} strokeWidth={2} className="text-white" aria-hidden />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="font-inter text-[16px] font-semibold leading-6 text-white">
                Still have questions?
              </span>
              <p className="font-inter text-[13px] leading-5 text-[#9ca3af]">
                Our experts are ready to help you with your specific needs.
              </p>
              <button
                type="button"
                className="mt-[10px] flex w-fit items-center gap-2 rounded-md border border-white/20 bg-transparent px-4 py-2 font-inter text-[13px] text-white transition-colors hover:border-white/40"
              >
                Talk to an Expert
                <ArrowRight size={14} strokeWidth={2} aria-hidden />
              </button>
            </div>
          </motion.div>
        </div>

        <div className="flex w-full min-h-0 flex-1 flex-col gap-2 lg:w-[60%]" data-node-id="407:915">
          {faqs.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="shrink-0 rounded-[10px] transition-all"
                style={isOpen ? {
                  background: 'rgba(47,128,255,0.05)',
                  border: '1px solid rgba(47,128,255,0.5)',
                  boxShadow: '0 0 15px rgba(47,128,255,0.4)',
                  padding: '18px 20px',
                } : {
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '18px 20px',
                }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <div className="flex min-w-0 items-center gap-3 sm:gap-6">
                    <span
                      className="shrink-0 font-inter text-base font-bold leading-7 sm:text-lg"
                      style={{ color: isOpen ? '#2f80ff' : '#6b7280' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-inter text-base font-semibold leading-7 text-white sm:text-lg lg:text-xl">{q}</span>
                  </div>
                  <div
                    className="flex shrink-0 items-center justify-center rounded-full"
                    style={{
                      width: '32px', height: '32px',
                      border: isOpen ? '1px solid #2f80ff' : '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <span
                      className="font-inter text-[20px] font-bold leading-5"
                      style={{ color: isOpen ? '#2f80ff' : 'rgba(255,255,255,0.5)' }}
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p
                        className="mt-3 pl-0 font-inter text-sm font-normal leading-relaxed text-[#d1d5db] sm:pl-[72px] sm:text-base"
                      >
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Index() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <CertifiedPartnersSection />
        <ServicesSection />
        <ProductsSection />
        <TechStackSection />
        <IndustriesSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
