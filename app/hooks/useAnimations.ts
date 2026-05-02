import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export const useAnimations = () => {
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrollTrigger);

  const animations = {
    fadeIn: () => {
      return {
        from: {
          opacity: 0,
          y: 20,
          scale: 0.7
        },
        to: {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7
        }
      };
    },
    fadeInTitle: (dataId: string) => {
      let split = SplitText.create(`[data-id="${dataId}"]`, {
        type: 'chars, words, lines'
      });

      gsap.from(split.chars, {
        yPercent: 'random(-200, 200)',
        rotation: 'random(-100, 100)',
        autoAlpha: 0,
        stagger: {
          amount: 0.5,
          from: 'random'
        },
        scrollTrigger: {
          trigger: `[data-id="${dataId}"]`,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    },
    fadeInScroll: () => {
      return {
        from: {
          opacity: 0,
          y: 30,
          scale: 0.9
        },
        to: (dataId: string) => ({
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          scrollTrigger: {
            trigger: `[data-id="${dataId}"]`,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        })
      };
    },
    fadeInTechnologies: (dataId: string) => {
      return {
        from: {
          transform: 'rotateY(90deg)',
          opacity: 0,
          y: 30,
          scale: 0.9
        },
        to: {
          opacity: 1,
          transform: 'rotateY(0deg)',

          y: 0,
          scale: 1,
          duration: 0.7,
          scrollTrigger: {
            trigger: `[data-id="${dataId}"]`,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      };
    }
  };

  return animations;
};
