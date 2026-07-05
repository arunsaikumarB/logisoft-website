import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import GlowingOrb from '@/components/GlowingOrb';

const ICON_MOBILE = 'https://www.figma.com/api/mcp/asset/c0025809-854b-40bd-88d8-edf7680c3f79';
const ICON_CLOUD = 'https://www.figma.com/api/mcp/asset/d2f8f37f-16e7-457b-8ebf-6b36e6677525';
const ICON_CYBER = 'https://www.figma.com/api/mcp/asset/9810735f-eb02-4e38-9a6f-86c4ee1918de';
const ICON_AI = 'https://www.figma.com/api/mcp/asset/2f6f50ec-92b6-486c-b8c5-4cd4d778871c';
const ICON_CHEVRON = 'https://www.figma.com/api/mcp/asset/b3f9b4fd-facf-4df0-afca-d04108a20ec9';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

const serviceCards = [
  {
    figmaId: '407:1475',
    name: 'Mobile',
    title: 'Mobile App',
    description:
      'Craft intuitive, feature-rich mobile applications for seamless user experiences.',
    icon: ICON_MOBILE,
    iconClass: 'h-[30px] w-[38px]',
    gap: 30,
  },
  {
    figmaId: '407:1485',
    name: 'Cloud',
    title: 'Cloud Services',
    description:
      'Harness the power of next-generation cloud platforms for unstoppable growth.',
    icon: ICON_CLOUD,
    iconClass: 'h-[30px] w-[42px]',
    gap: 30,
  },
  {
    figmaId: '407:1495',
    name: 'Custom',
    title: 'Custom Code',
    description: 'Tailored software solutions designed to meet your unique needs.',
    icon: ICON_MOBILE,
    iconClass: 'h-[30px] w-[38px]',
    gap: 30,
  },
  {
    figmaId: '407:1505',
    name: 'Data',
    title: 'Data Delights',
    description:
      'Unlock insights and make informed decisions through advanced data analysis.',
    icon: ICON_MOBILE,
    iconClass: 'h-[30px] w-[38px]',
    gap: 30,
  },
  {
    figmaId: '407:1515',
    name: 'Cyber',
    title: 'Cybersecurity',
    description: 'Protect your digital assets with our robust cybersecurity measures.',
    icon: ICON_CYBER,
    iconClass: 'size-[30px]',
    gap: 30,
  },
  {
    figmaId: '407:1525',
    name: 'AI',
    titleLines: ['AI and Machine', 'Learning'],
    description:
      'Embrace the future with intelligent, automated systems for enhanced efficiency.',
    icon: ICON_AI,
    iconClass: 'h-[34px] w-[36px]',
    gap: 18,
  },
] as const;

function useMotionSettings() {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const disabled = reduceMotion || isMobile;

  return {
    isMobile,
    disabled,
    fadeDuration: disabled ? 0.3 : 0.7,
    cardDuration: disabled ? 0.3 : 0.5,
    ease: disabled ? ('linear' as const) : ('easeOut' as const),
  };
}

function ServiceCard({
  card,
  index,
  cardDuration,
  ease,
}: {
  card: (typeof serviceCards)[number];
  index: number;
  cardDuration: number;
  ease: 'linear' | 'easeOut';
}) {
  const title = 'title' in card ? card.title : undefined;

  return (
    <motion.article
      data-node-id={card.figmaId}
      data-name={card.name}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: cardDuration, delay: index * 0.07, ease }}
      className="relative z-[2] flex h-full max-h-[350px] min-h-[320px] w-[300px] max-w-[300px] shrink-0 flex-col items-start rounded-[8px] border border-[rgba(255,255,255,0.1)] bg-[rgba(10,10,15,0.4)] p-[33px] backdrop-blur-[10px]"
      style={{ gap: card.gap }}
    >
      <div className={`relative shrink-0 ${card.iconClass}`}>
        {'titleLines' in card ? (
          <img src={card.icon} alt="" className="block size-full max-w-none object-contain" />
        ) : card.iconClass === 'size-[30px]' ? (
          <div className="absolute inset-[0_0_-26.28%_0]">
            <img src={card.icon} alt="" className="block size-full max-w-none object-contain" />
          </div>
        ) : (
          <img src={card.icon} alt="" className="absolute inset-0 block size-full max-w-none object-contain" />
        )}
      </div>

      <div className="relative w-full shrink-0 pt-[8px]">
        {'titleLines' in card && card.titleLines ? (
          <h3 className="font-geist text-xl font-semibold leading-8 tracking-[0.48px] text-[#e1e3e4] sm:text-2xl lg:text-[24px]">
            {card.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>
        ) : (
          <h3 className="whitespace-nowrap font-geist text-xl font-semibold leading-8 tracking-[0.48px] text-[#e1e3e4] sm:text-2xl lg:text-[24px]">
            {title}
          </h3>
        )}
      </div>

      <p className="w-full shrink-0 font-inter text-sm font-normal leading-6 text-[#bbc9cf] sm:text-base lg:text-[16px] lg:leading-[24px]">
        {card.description}
      </p>

      <a
        href="#"
        className="mt-auto flex min-h-[44px] items-center gap-2 pt-4 font-geist text-xs font-semibold leading-4 tracking-[1.2px] text-[#c9bfff] transition-opacity hover:opacity-80"
      >
        EXPLORE MORE
        <img src={ICON_CHEVRON} alt="" className="size-[15px] shrink-0 object-contain" />
      </a>
    </motion.article>
  );
}

export default function ServicesSection() {
  const { fadeDuration, cardDuration, ease } = useMotionSettings();

  return (
    <section
      id="solutions"
      data-node-id="397:3561"
      data-name="Services Section"
      className="section-shell"
    >
      <div
        data-node-id="397:3563"
        className="relative flex w-full flex-col items-center"
      >
        <motion.div
          data-node-id="397:3362"
          className="section-intro section-title flex w-full flex-col items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <div data-node-id="397:3363" className="flex w-full flex-col items-center">
            <motion.h2
              data-node-id="397:3364"
              variants={fadeUp}
              transition={{ duration: fadeDuration, ease }}
              className="w-full text-center font-inter text-4xl font-bold leading-tight tracking-[-1.5px] sm:text-5xl lg:text-6xl"
            >
              <span className="text-white">Tailored Solutions. </span>
              <span className="bg-gradient-to-r from-[#60a5fa] to-[#8b5cf6] bg-clip-text text-transparent">
                Exceptional Outcomes.
              </span>
            </motion.h2>
          </div>
        </motion.div>

        <motion.p
          data-node-id="397:3365"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: fadeDuration, delay: 0.15, ease }}
          className="section-lead line-clamp-3 text-center text-white/60"
        >
          Explore our comprehensive services at Logisoft — from custom software development to
          robust web solutions, transforming your vision into digital reality.
        </motion.p>

        <div
          data-node-id="397:3366"
          className="relative isolate w-full"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          >
            <GlowingOrb />
          </div>
          <div
            data-node-id="407:1474"
            className="scrollbar-hide relative z-[1] flex w-full flex-row gap-4 overflow-x-auto pb-4"
          >
            {serviceCards.map((card, index) => (
              <ServiceCard
                key={card.figmaId}
                card={card}
                index={index}
                cardDuration={cardDuration}
                ease={ease}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
