import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Button} from '~/components/ui/Button';

export function HeroCarousel({slides}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const slide = slides[index];

  return (
    <section className="hero-carousel">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.title}
          className="hero-slide"
          style={{backgroundImage: `linear-gradient(120deg, rgba(32, 12, 7, 0.84), rgba(79, 14, 22, 0.45)), url(${slide.image})`}}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.6}}
        >
          <div className="hero-copy">
            <p className="eyebrow">{slide.eyebrow}</p>
            <h1>{slide.title}</h1>
            <p>{slide.body}</p>
            <div className="hero-actions">
              <Button as="a" href={slide.href}>
                {slide.cta}
              </Button>
              <Button variant="secondary" onClick={() => setIndex((current) => (current + 1) % slides.length)}>
                View next
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="hero-dots" aria-label="Hero slides">
        {slides.map((entry, slideIndex) => (
          <button
            key={entry.title}
            className={`hero-dot${slideIndex === index ? ' active' : ''}`}
            onClick={() => setIndex(slideIndex)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}