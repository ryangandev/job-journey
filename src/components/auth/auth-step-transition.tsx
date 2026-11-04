'use client';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Same tween as AnimatedLayoutWrapper, a little quicker since it plays twice (out, then in)
const stepTransition: Transition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.2,
};

const STEP_OFFSET = 10;

/**
 * Cross-fades between the steps of an auth page (e.g. login -> email login -> verify email).
 * The outgoing step fades out and drops slightly before the incoming one fades in from above,
 * matching the page enter animation. With `prefers-reduced-motion` the switch is instant.
 *
 * After a switch, focus moves to the new step's heading unless something in the new step
 * already took it (e.g. an `autoFocus` input), so keyboard users are not left on <body>.
 */
export default function AuthStepTransition({
  step,
  children,
}: {
  step: string;
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();
  const offset = shouldReduceMotion ? 0 : STEP_OFFSET;

  // Only move focus after the user has switched steps, never on the first render
  const [initialStep, setInitialStep] = useState<string | null>(step);
  if (initialStep !== null && initialStep !== step) {
    setInitialStep(null);
  }
  const hasSwitched = initialStep === null;

  return (
    // `initial={false}`: the first step is already animated in by AnimatedLayoutWrapper
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={step}
        initial={{ opacity: 0, y: -offset }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: offset }}
        transition={shouldReduceMotion ? { duration: 0 } : stepTransition}
        className="w-full"
      >
        <FocusOnMount enabled={hasSwitched}>{children}</FocusOnMount>
      </motion.div>
    </AnimatePresence>
  );
}

function FocusOnMount({
  enabled,
  children,
}: {
  enabled: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Each step is a fresh mount because of the `key` above, so this runs once per step
    const container = ref.current;
    if (!enabled || !container) return;
    if (container.contains(document.activeElement)) return;

    container.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true });
  }, [enabled]);

  return <div ref={ref}>{children}</div>;
}
