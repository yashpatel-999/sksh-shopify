import {AnimatePresence, motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import {Button} from '~/components/ui/Button';

export function SpecialOffersBanner({messages}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [messages.length]);

  return (
    <section className="special-offers-banner">
      <AnimatePresence mode="wait">
        <motion.div
          key={messages[index]}
          className="special-offers-banner-inner"
          initial={{opacity: 0, y: 16}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -16}}
          transition={{duration: 0.35}}
        >
          <div>
            <p className="eyebrow">Special Offer Products</p>
            <h2>{messages[index]}</h2>
          </div>
          <div className="special-offers-banner-actions">
            <Button as="a" href="/collections">
              Shop Now
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}