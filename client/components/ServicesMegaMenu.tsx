import { useEffect, useRef, useState, type RefObject } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  Cloud,
  Database,
  Shield,
  Snowflake,
  Layers,
  Box,
  type LucideIcon,
} from 'lucide-react';

export type ServiceColumn = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: string;
  links: string[];
};

export const serviceColumns: ServiceColumn[] = [
  {
    id: 'tech-services',
    title: 'Tech Services',
    description: 'End-to-end software engineering and digital transformation services.',
    href: '/services/tech-services',
    icon: Layers,
    accent: '#38BDF8',
    links: [
      'Web & Mobile',
      'AI & ML',
      'Integrations',
      'SMB',
      'Enterprise',
      'Support',
      'Managed',
      'Public Sector',
      'Cyber Security',
    ],
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    description: 'Protect your business with enterprise-grade cybersecurity solutions.',
    href: '/services/cyber-security',
    icon: Shield,
    accent: '#60A5FA',
    links: ['Cybersecurity Services'],
  },
  {
    id: 'cloud-services',
    title: 'Cloud Services',
    description: 'Accelerate cloud adoption with scalable AWS solutions.',
    href: '/services/cloud-services',
    icon: Cloud,
    accent: '#06B6D4',
    links: [
      'AWS Migration & Modernization',
      'Cloud Managed Services',
      'Security & Compliance',
      'DevOps & Automation',
      'Data & AI Solutions',
      'Training & Upskilling',
    ],
  },
  {
    id: 'dynamics-crm',
    title: 'Dynamics CRM',
    description: 'Modern CRM implementation and business automation solutions.',
    href: '/services/dynamics-crm',
    icon: Database,
    accent: '#8B5CF6',
    links: [
      'Consulting & Advisory',
      'Implementation & Configuration',
      'Integration & Automation',
      'Optimization & Support',
      'Training & Enablement',
    ],
  },
  {
    id: 'salesforce-cpq-clm',
    title: 'Salesforce CPQ & CLM',
    description: 'Optimize your sales lifecycle with Salesforce CPQ & CLM.',
    href: '/services/salesforce-cpq-clm',
    icon: Box,
    accent: '#3B82F6',
    links: [
      'Consulting & Advisory',
      'Implementation & Configuration',
      'Integration & Optimization',
      'Support & Managed Services',
      'Training & Enablement',
    ],
  },
  {
    id: 'snowflake-services',
    title: 'Snowflake Services',
    description: 'Enterprise data platform and analytics solutions.',
    href: '/services/snowflake-services',
    icon: Snowflake,
    accent: '#22D3EE',
    links: [
      'Consulting & Advisory',
      'Migration & Implementation',
      'Optimization Services',
      'Data Security & Compliance',
      'Training & Enablement',
    ],
  },
];

function ServiceLink({
  label,
  href,
  accent,
  onNavigate,
}: {
  label: string;
  href: string;
  accent: string;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className="group/link flex items-start gap-1.5 rounded-md py-1 pr-0.5 transition-colors duration-200"
    >
      <span
        className="font-inter text-[14px] font-medium leading-snug text-white/75 transition-colors duration-200 group-hover/link:text-[#0095DA]"
      >
        {label}
      </span>
      <ChevronRight
        size={12}
        strokeWidth={2}
        className="mt-1 shrink-0 opacity-0 transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:opacity-100"
        style={{ color: accent }}
        aria-hidden
      />
    </a>
  );
}

function ServiceColumnCard({
  column,
  onNavigate,
}: {
  column: ServiceColumn;
  onNavigate?: () => void;
}) {
  const Icon = column.icon;

  return (
    <div className="group/col flex h-full min-w-0 flex-col border-white/[0.06] px-3 py-2 transition-colors duration-200 hover:bg-white/[0.02] lg:border-r lg:px-4 lg:last:border-r-0">
      <a
        href={column.href}
        onClick={onNavigate}
        className="mb-4 block"
      >
        <div
          className="mb-3 flex size-9 items-center justify-center rounded-lg transition-shadow duration-200 group-hover/col:shadow-[0_0_16px_rgba(0,149,218,0.15)]"
          style={{
            background: `${column.accent}14`,
            border: `1px solid ${column.accent}28`,
          }}
        >
          <Icon size={18} color={column.accent} strokeWidth={2} aria-hidden />
        </div>
        <h3 className="font-geist text-[15px] font-bold leading-snug text-white transition-colors duration-200 group-hover/col:text-[#0095DA] xl:text-base">
          {column.title}
        </h3>
        <p className="mt-2 min-h-[3.25rem] font-inter text-[13px] leading-relaxed text-white/55 line-clamp-3">
          {column.description}
        </p>
      </a>

      <ul className="flex flex-col gap-0.5 border-t border-white/[0.06] pt-3">
        {column.links.map((link) => (
          <li key={link}>
            <ServiceLink
              label={link}
              href={column.href}
              accent={column.accent}
              onNavigate={onNavigate}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServicesMegaMenuPanel({
  onNavigate,
  className = '',
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[24px] border border-white/[0.08] bg-[rgba(10,16,28,0.98)] p-5 shadow-[0_32px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-[24px] sm:p-6 lg:p-8 ${className}`}
      style={{ backgroundColor: 'rgba(10,16,28,0.98)' }}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0 lg:items-stretch">
        {serviceColumns.map((column) => (
          <ServiceColumnCard key={column.id} column={column} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

export function useServicesMegaMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  useEffect(() => () => clearCloseTimer(), []);

  return {
    open,
    setOpen,
    menuRef,
    clearCloseTimer,
    scheduleClose,
  };
}

export function ServicesMegaMenuTrigger({
  open,
  setOpen,
  clearCloseTimer,
  scheduleClose,
  isActive,
  onActivate,
}: {
  open: boolean;
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  clearCloseTimer: () => void;
  scheduleClose: () => void;
  isActive: boolean;
  onActivate: () => void;
}) {
  const linkClass = `relative py-2 font-geist text-xs font-semibold uppercase tracking-[1.2px] transition-colors hover:text-white ${
    isActive || open
      ? 'text-[#0095DA] border-b-2 border-[#0095DA] pb-1'
      : 'text-white/70'
  }`;

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearCloseTimer();
        setOpen(true);
        onActivate();
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={linkClass}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => {
          setOpen((v) => !v);
          onActivate();
        }}
      >
        Services
      </button>
    </div>
  );
}

export function ServicesMegaMenuFlyout({
  open,
  setOpen,
  menuRef,
  clearCloseTimer,
  scheduleClose,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  menuRef: RefObject<HTMLDivElement | null>;
  clearCloseTimer: () => void;
  scheduleClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute left-0 right-0 top-full z-[150] hidden lg:block"
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleClose}
        >
          <div aria-hidden className="h-3" />
          <div className="mx-auto w-full max-w-[1440px] px-4 pb-6 sm:px-8 lg:px-20">
            <ServicesMegaMenuPanel onNavigate={() => setOpen(false)} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** @deprecated Use useServicesMegaMenu + Trigger + Flyout in Navbar */
export function ServicesMegaMenuDesktop({
  isActive,
  onActivate,
}: {
  isActive: boolean;
  onActivate: () => void;
}) {
  const menu = useServicesMegaMenu();

  return (
    <>
      <ServicesMegaMenuTrigger {...menu} isActive={isActive} onActivate={onActivate} />
      <ServicesMegaMenuFlyout {...menu} />
    </>
  );
}

export function ServicesMegaMenuMobile({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <div className="flex w-full max-w-md flex-col items-stretch gap-3 px-4">
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        className="flex items-center justify-center gap-2 text-2xl font-semibold tracking-wider text-white transition-colors hover:text-[#0095DA]"
        aria-expanded={menuOpen}
      >
        Services
        <ChevronDown
          size={22}
          className={`transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full overflow-hidden"
          >
            <div className="max-h-[65vh] space-y-2 overflow-y-auto rounded-2xl border border-white/[0.08] bg-[rgba(10,16,28,0.98)] p-4 backdrop-blur-[24px]">
              {serviceColumns.map((column) => {
                const isOpen = openCategory === column.id;
                const Icon = column.icon;
                return (
                  <div
                    key={column.id}
                    className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenCategory(isOpen ? null : column.id)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                      aria-expanded={isOpen}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className="flex size-8 shrink-0 items-center justify-center rounded-lg"
                          style={{
                            background: `${column.accent}18`,
                            border: `1px solid ${column.accent}33`,
                          }}
                        >
                          <Icon size={14} color={column.accent} strokeWidth={2} aria-hidden />
                        </div>
                        <div className="min-w-0">
                          <div className="font-geist text-base font-bold text-white">{column.title}</div>
                          <p className="mt-0.5 line-clamp-2 font-inter text-xs text-white/60">
                            {column.description}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`shrink-0 text-white/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-0.5 border-t border-white/[0.06] px-4 py-3">
                            {column.links.map((link) => (
                              <li key={link}>
                                <ServiceLink
                                  label={link}
                                  href={column.href}
                                  accent={column.accent}
                                  onNavigate={onNavigate}
                                />
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
