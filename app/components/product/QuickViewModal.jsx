import {AnimatePresence, motion} from 'framer-motion';
import {Button} from '~/components/ui/Button';

export function QuickViewModal({product, open, onClose}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="quick-view-backdrop"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          onClick={onClose}
        >
          <motion.div
            className="quick-view-modal"
            initial={{opacity: 0, y: 40, scale: 0.98}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 30, scale: 0.98}}
            transition={{duration: 0.25}}
            onClick={(event) => event.stopPropagation()}
          >
            <img src={product.image} alt={product.title} className="quick-view-image" />
            <div className="quick-view-copy">
              <p className="eyebrow">Luxury saree edit</p>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <div className="quick-view-actions">
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
                <Button as="a" href={product.href}>
                  Explore
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}