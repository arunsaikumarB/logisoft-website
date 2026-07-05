import { useEffect, useRef, useState, type RefObject } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart2,
  BookOpen,
  CalendarCheck,
  ChefHat,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';

const LOGO = '/logisoft-logo.svg';

const navProducts: {
  id: string;
  name: string;
  description: string;
  Icon: LucideIcon;
  href: string;
}[] = [
  {
    id: 'chefgaa',
    name: 'Chefgaa',
    description: 'Cloud-based restaurant management — POS, ordering, kitchen ops, and payments.',
    Icon: ChefHat,
    href: '#products',
  },
  {
    id: 'event',
    name: 'Event Booking Plus',
    description: 'Event booking and security platform with real-time monitoring and access control.',
    Icon: CalendarCheck,
    href: '#products',
  },
  {
    id: 'ntrustly',
    name: 'NTrustly',
    description: 'Enterprise analytics with AI-powered insights and custom reporting dashboards.',
    Icon: BarChart2,
    href: '#products',
  },
  {
    id: 'class',
    name: 'Class Booking Plus',
    description: 'Unified scheduling, payments, and communication hub for education providers.',
    Icon: BookOpen,
    href: '#products',
  },
];

function ProductIconBox({ Icon }: { Icon: LucideIcon }) {
  return (
    <div
      className="mb-3 flex size-10 items-center justify-center rounded-lg transition-shadow duration-200 group-hover:shadow-[0_0_16px_rgba(56,189,248,0.2)]"
      style={{
        background: 'rgba(56,189,248,0.1)',
        border: '1px solid rgba(56,189,248,0.2)',
      }}
    >
      <Icon size={20} color="#38BDF8" strokeWidth={2} aria-hidden />
    </div>
  );
}

function ProductDropdownItem({
  name,
  description,
  Icon,
  href,
  onNavigate,
}: (typeof navProducts)[number] & { onNavigate?: () => void }) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className="group flex h-full min-w-0 flex-col border-white/[0.06] px-3 py-2 transition-colors duration-200 hover:bg-white/[0.02] sm:border-r sm:px-4 sm:last:border-r-0"
    >
      <ProductIconBox Icon={Icon} />
      <div className="font-geist text-[15px] font-bold leading-snug text-white transition-colors group-hover:text-[#38BDF8]">
        {name}
      </div>
      <p className="mt-2 font-inter text-[13px] leading-relaxed text-white/55 line-clamp-3">
        {description}
      </p>
    </a>
  );
}

export function ProductsDropdownMenu({
  onNavigate,
  className = '',
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[24px] border border-white/[0.08] bg-[rgba(10,16,28,0.98)] p-4 shadow-[0_32px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-[24px] sm:p-5 ${className}`}
      style={{ backgroundColor: 'rgba(10,16,28,0.98)' }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:items-stretch">
        {navProducts.map((product) => (
          <ProductDropdownItem key={product.id} {...product} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

export function useProductsDropdown() {
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

export function ProductsDropdownTrigger({
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
      ? 'text-[#38BDF8] border-b-2 border-[#38BDF8] pb-1'
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
        Products
      </button>
    </div>
  );
}

export function ProductsDropdownFlyout({
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
            <div className="mx-auto max-w-[960px]">
              <ProductsDropdownMenu onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** @deprecated Use useProductsDropdown + Trigger + Flyout in Navbar */
export function ProductsDropdownDesktop({
  isActive,
  onActivate,
}: {
  isActive: boolean;
  onActivate: () => void;
}) {
  const menu = useProductsDropdown();

  return (
    <>
      <ProductsDropdownTrigger {...menu} isActive={isActive} onActivate={onActivate} />
      <ProductsDropdownFlyout {...menu} />
    </>
  );
}

export function ProductsDropdownMobile({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex w-full max-w-md flex-col items-stretch gap-3 px-4">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center justify-center gap-2 text-2xl font-semibold tracking-wider text-white transition-colors hover:text-[#38BDF8]"
        aria-expanded={expanded}
      >
        Products
        <ChevronDown
          size={22}
          className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full overflow-hidden"
          >
            <ProductsDropdownMenu
              onNavigate={() => {
                onNavigate();
                setExpanded(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { navProducts, LOGO };
