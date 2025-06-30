import React from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, duration = 1.2, className }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const count = useMotionValue(0);
  const spring = useSpring(count, { duration, stiffness: 80, damping: 20 });
  const [display, setDisplay] = React.useState(0);
  const [pulse, setPulse] = React.useState(false);

  React.useEffect(() => {
    if (inView) {
      count.set(0);
      spring.set(0);
      spring.set(value);
    }
  }, [inView, value, count, spring]);

  React.useEffect(() => {
    return spring.on('change', (latest) => {
      const hasDecimals = value % 1 !== 0;
      setDisplay(hasDecimals ? parseFloat(latest.toFixed(1)) : Math.floor(latest));
      if (hasDecimals ? parseFloat(latest.toFixed(1)) === value : Math.floor(latest) === value) {
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
      }
    });
  }, [spring, value]);

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: 'inline-block' }}
      animate={pulse ? { scale: [1, 1.2, 1], boxShadow: [
        '0 0 0px #fff0',
        '0 0 12px #60a5fa99',
        '0 0 0px #fff0',
      ] } : {}}
      transition={{ duration: 0.6, times: [0, 0.5, 1] }}
    >
      {display}
    </motion.span>
  );
};

export default AnimatedNumber; 