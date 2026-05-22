import React, { useEffect, useMemo, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

type ScrollFloatVariant = 'float' | 'fade' | 'reveal' | 'blur' | 'drop';

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  variant?: ScrollFloatVariant;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const variantConfig: Record<ScrollFloatVariant, {
  from: Record<string, unknown>;
  defaultEase: string;
  willChange: string;
}> = {
  float: {
    willChange: 'opacity, transform',
    defaultEase: 'back.inOut(2)',
    from: {
      opacity: 0,
      yPercent: 120,
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: '50% 0%'
    }
  },
  fade: {
    willChange: 'opacity, transform',
    defaultEase: 'power2.out',
    from: {
      opacity: 0,
      yPercent: 10
    }
  },
  reveal: {
    willChange: 'opacity, transform',
    defaultEase: 'power3.out',
    from: {
      opacity: 0,
      yPercent: 100
    }
  },
  blur: {
    willChange: 'opacity, transform, filter',
    defaultEase: 'power2.out',
    from: {
      opacity: 0,
      yPercent: 8,
      filter: 'blur(8px)'
    }
  },
  drop: {
    willChange: 'opacity, transform',
    defaultEase: 'back.out(1.7)',
    from: {
      opacity: 0,
      yPercent: -120
    }
  }
};

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  variant = 'float',
  animationDuration = 1,
  ease,
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const config = variantConfig[variant];

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span className="char" key={index}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll('.char');

    const tl = gsap.fromTo(
      charElements,
      {
        willChange: config.willChange,
        ...config.from
      },
      {
        duration: animationDuration,
        ease: ease ?? config.defaultEase,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        filter: 'blur(0px)',
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        }
      }
    );

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger, variant, config]);

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
