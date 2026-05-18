import {motion} from 'framer-motion';

export function Testimonials({items}) {
  return (
    <section className="testimonials">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Client notes</p>
          <h2>What shoppers say</h2>
        </div>
        <p>Luxury is as much about the experience as the product. These notes keep the tone warm and credible.</p>
      </div>
      <div className="testimonial-grid">
        {items.map((item, index) => (
          <motion.blockquote
            key={item.name}
            className="testimonial-card"
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.3, delay: index * 0.05}}
          >
            <p>“{item.quote}”</p>
            <footer>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}