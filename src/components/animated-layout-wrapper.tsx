'use client';

import {
  MotionConfig,
  motion,
  type Transition,
  type Variants,
} from 'framer-motion';
import { usePathname } from 'next/navigation';

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: -10,
  },
  in: {
    opacity: 1,
    y: 0,
  },
};

const pageTransition: Transition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
};

export default function AnimatedLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    // reducedMotion="user": with `prefers-reduced-motion`, the slide is skipped and only the fade plays
    <MotionConfig reducedMotion="user">
      <motion.main
        key={pathname}
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full"
      >
        {children}
      </motion.main>
    </MotionConfig>
  );
}
