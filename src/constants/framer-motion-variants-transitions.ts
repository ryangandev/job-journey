const inputTransitionVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1, // to make sure the current question is on top
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0, // to make sure the next question is on top
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    };
  },
};

const shakeAnimationVariants = {
  shake: {
    x: [0, -10, 10, 0],
    transition: { duration: 0.2, repeat: 1 },
  },
  static: {
    x: 0,
  },
};

const inputTransition = {
  x: { type: 'spring', stiffness: 250, damping: 30 },
  opacity: { duration: 0.5 },
};

export { inputTransitionVariants, shakeAnimationVariants, inputTransition };
