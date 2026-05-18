import {motion} from 'framer-motion';

export function InstagramGallery({items}) {
  return (
    <section className="instagram-gallery">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Instagram / Reels</p>
          <h2>Styled in motion</h2>
        </div>
        <p>Editorial reels, close-up textures, and social-first imagery designed to feel premium on mobile.</p>
      </div>
      <div className="instagram-grid">
        {items.map((item, index) => (
          <motion.figure
            key={item.caption}
            className="instagram-card"
            whileHover={{scale: 1.02}}
            transition={{duration: 0.2, delay: index * 0.02}}
          >
            <img src={item.image} alt={item.caption} />
            <figcaption>{item.caption}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}