export const animationAppears = (delay = 1, duration = 3) => ({
  initial: {
    opacity: 0,
    y: 30
  },
  whileInView: {
    opacity: 1,
    y: 0
  },
  transition: {
    duration,
    delay: 0.2 * delay,
    type: 'spring' as const
  },
  viewport: { once: true }
});
