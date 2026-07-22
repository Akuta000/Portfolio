import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // Speed factor relative to scroll (e.g. 0.15 = subtle, 0.3 = stronger)
  className?: string;
  offset?: number;
  fadeIn?: boolean;
}

export const ParallaxWrapper: React.FC<ParallaxProps> = ({
  children,
  speed = 0.15,
  className = '',
  offset = 40,
  fadeIn = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [offset * speed, -offset * speed]);
  const y = useSpring(rawY, { stiffness: 90, damping: 22 });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.65, 1, 1, 0.8]);
  const opacity = useSpring(rawOpacity, { stiffness: 90, damping: 22 });

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity: fadeIn ? opacity : 1,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ParallaxCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delayIndex?: number;
  onClick?: () => void;
}> = ({ children, className = '', delayIndex = 0, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  // Calculate dynamic y translation based on scroll position
  const rawY = useTransform(scrollYProgress, [0, 1], [30 + (delayIndex % 3) * 10, 0]);
  const y = useSpring(rawY, { stiffness: 90, damping: 20 });

  const rawScale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const scale = useSpring(rawScale, { stiffness: 90, damping: 20 });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.8], [0.2, 1]);
  const opacity = useSpring(rawOpacity, { stiffness: 90, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, opacity }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ParallaxHeader: React.FC<{
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, badge, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [35, 0]);
  const y = useSpring(rawY, { stiffness: 85, damping: 18 });

  const rawScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const scale = useSpring(rawScale, { stiffness: 85, damping: 18 });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.9], [0.3, 1]);
  const opacity = useSpring(rawOpacity, { stiffness: 85, damping: 18 });

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, opacity }}
      className={`border-b-2 border-[#800020] pb-6 mb-8 text-center sm:text-left ${className}`}
    >
      {badge && <div className="mb-1">{badge}</div>}
      <h1 className="font-serif-display text-3xl sm:text-5xl font-black text-[#800020]">
        {title}
      </h1>
      {subtitle && (
        <p className="font-serif-body italic text-base sm:text-lg text-[#574B4E] mt-1 max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export const ParallaxBanner: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const y = useSpring(rawY, { stiffness: 70, damping: 25 });

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};
