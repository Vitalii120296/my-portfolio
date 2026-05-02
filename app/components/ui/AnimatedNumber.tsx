import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1
}) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3
  });

  const numberRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef({ value: 0 });

  useEffect(() => {
    if (!inView || !numberRef.current) return;

    gsap.killTweensOf(counterRef.current);

    gsap.to(counterRef.current, {
      value: value,
      duration: duration,
      delay: 0.7,
      ease: 'power2.out',
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = Math.floor(
            counterRef.current.value
          ).toString();
        }
      }
    });
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      <span ref={numberRef}>0</span>
    </span>
  );
};
