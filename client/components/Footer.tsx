import { useEffect, useRef } from 'react';

const LOGO_FOOTER = '/logisoft-logo.svg';
const SOC_FB = 'https://www.figma.com/api/mcp/asset/68521478-44fd-468f-8613-43304b9f2eaa';
const SOC_IG = 'https://www.figma.com/api/mcp/asset/0bd62376-8819-4182-bcdf-100a509ee0cd';
const SOC_LI = 'https://www.figma.com/api/mcp/asset/bc4c5685-ea7f-44f8-9417-843f92bc513b';
const SOC_X = 'https://www.figma.com/api/mcp/asset/f095df27-67cf-4fcf-930b-e2bdd95322e1';

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      video.muted = true;
      void video.play();
    });
  }, []);

  const linkColumn = (title: string, links: string[]) => (
    <div className="flex flex-col gap-2">
      <span className="font-inter text-sm font-semibold tracking-[0.6px] text-[#0054a5] sm:text-base">{title}</span>
      <div className="flex flex-col">
        {links.map((l) => (
          <a key={l} href="#" className="font-inter text-sm leading-6 text-[#bbc9cf] transition-colors hover:text-white">
            {l}
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <footer data-node-id="407:3537" className="relative min-h-[520px] overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/footer-bg.mp4" type="video/mp4" />
      </video>

      <div className="relative z-[1] px-4 py-12 sm:px-8 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-[1440px]">
          <img
            src={LOGO_FOOTER}
            alt="Logisoft"
            className="mb-8 h-16 w-auto max-w-[240px] object-contain object-left sm:h-20 lg:h-[109px] lg:max-w-[295px]"
          />
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {linkColumn('Our Mojo', ['Consulting', 'Products', 'Tech Services'])}
            {linkColumn('Our Services', ['Web & Mobile', 'AI & ML', 'Integrations', 'SMB', 'Enterprise', 'Support', 'Managed', 'Public Sector', 'Cyber Security', 'Cloud Services'])}
            {linkColumn('Products', ['ZEEKO'])}
            {linkColumn('Consulting', ['USA Consulting'])}
            {linkColumn('Company', ['About Us', 'Careers', 'Contact Us', 'Privacy Policy', 'Terms and Conditions'])}
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-[1440px] flex-col items-center justify-between gap-4 border-t border-[#0054a5]/66 pt-8 sm:flex-row">
          <p className="text-center font-inter text-sm leading-6 text-[#bbc9cf] opacity-60 sm:text-base">
            Copyright © 2026 – Logisoft- All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[{ src: SOC_FB, alt: 'Facebook' }, { src: SOC_IG, alt: 'Instagram' }, { src: SOC_LI, alt: 'LinkedIn' }, { src: SOC_X, alt: 'X' }].map(({ src, alt }) => (
              <a key={alt} href="#" className="flex min-h-[44px] min-w-[44px] items-center justify-center opacity-80 transition-opacity hover:opacity-100">
                <img src={src} alt={alt} className="size-5 object-contain" loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
