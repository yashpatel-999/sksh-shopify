import {motion} from 'framer-motion';
import {Button} from '~/components/ui/Button';

export function CollectionSection({title, description, items}) {
  return (
    <section className="collection-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Curated edit</p>
          <h2>{title}</h2>
        </div>
        <p>{description}</p>
      </div>
      <div className="collection-grid">
        {items.map((item, index) => (
          <motion.a
            key={item.title}
            className="collection-card"
            href={item.href}
            whileHover={{y: -6}}
            transition={{duration: 0.2, delay: index * 0.03}}
          >
            <img src={item.image} alt={item.title} />
            <div className="collection-card-copy">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Button as="span" variant="secondary">
                Explore
              </Button>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}