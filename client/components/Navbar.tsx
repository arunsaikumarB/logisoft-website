import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import {
  ProductsDropdownFlyout,
  ProductsDropdownMobile,
  ProductsDropdownTrigger,
  useProductsDropdown,
} from '@/components/ProductsDropdown';
import {
  ServicesMegaMenuFlyout,
  ServicesMegaMenuMobile,
  ServicesMegaMenuTrigger,
  useServicesMegaMenu,
} from '@/components/ServicesMegaMenu';

const LOGO = '/logisoft-logo.svg';

const navLinks = [
  { name: 'Consulting', href: '#consulting' },
  { name: 'About Us', href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const servicesMenu = useServicesMegaMenu();
  const productsMenu = useProductsDropdown();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const linkClass = (isActive: boolean) =>
    `relative py-2 font-geist text-xs font-semibold uppercase tracking-[1.2px] transition-colors hover:text-white ${
      isActive ? 'text-white border-b-2 border-white pb-1' : 'text-white/70'
    }`;

  return (
    <nav
      data-node-id="337:498"
      className={`fixed left-0 right-0 top-0 z-[100] w-full transition-all duration-300 ${
        scrolled ? 'border-b border-white/[0.06] bg-black/95 backdrop-blur-md' : 'bg-black'
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:h-[72px] lg:px-20">
        <a
          href="/"
          className="flex shrink-0 items-center gap-[10px] border-0 bg-transparent p-0 shadow-none outline-none ring-0 focus:outline-none focus-visible:ring-0"
          aria-label="Logisoft home"
        >
          <img
            src={LOGO}
            alt="Logisoft"
            className="block h-8 w-auto border-0 object-contain sm:h-9"
          />
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 xl:gap-12 lg:flex">
          <a
            href="/"
            onClick={() => setActiveLink('Home')}
            className={linkClass(activeLink === 'Home')}
          >
            Home
          </a>
          <ProductsDropdownTrigger
            {...productsMenu}
            isActive={activeLink === 'Products'}
            onActivate={() => setActiveLink('Products')}
          />
          <ServicesMegaMenuTrigger
            {...servicesMenu}
            isActive={activeLink === 'Services'}
            onActivate={() => setActiveLink('Services')}
          />
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setActiveLink(link.name)}
              className={linkClass(activeLink === link.name)}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden shrink-0 lg:flex lg:items-center lg:gap-[10px] lg:invisible" aria-hidden>
          <img src={LOGO} alt="" className="block h-9 w-auto object-contain" />
        </div>

        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <ProductsDropdownFlyout {...productsMenu} />
      <ServicesMegaMenuFlyout {...servicesMenu} />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-black lg:hidden"
          >
            <button
              type="button"
              className="absolute right-4 top-4 flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-white"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
            <a
              href="/"
              onClick={() => {
                setActiveLink('Home');
                setMobileOpen(false);
              }}
              className={`text-2xl font-semibold tracking-wider transition-colors hover:text-white ${
                activeLink === 'Home' ? 'text-white' : 'text-white/70'
              }`}
            >
              Home
            </a>
            <ProductsDropdownMobile onNavigate={() => setMobileOpen(false)} />
            <ServicesMegaMenuMobile onNavigate={() => setMobileOpen(false)} />
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.name);
                  setMobileOpen(false);
                }}
                className={`text-2xl font-semibold tracking-wider transition-colors hover:text-white ${
                  activeLink === link.name ? 'text-white' : 'text-white/70'
                }`}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
