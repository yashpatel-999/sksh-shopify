import {motion} from 'framer-motion';
import {ProductCard} from '~/components/product/ProductCard';

export function BestSellers({products, cart, title = 'Best Sellers'}) {
  return (
    <section className="best-sellers">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Luxury staples</p>
          <h2>{title}</h2>
        </div>
        <p>Popular pieces with compare-at pricing, quick views, and the one-customer offer guard for tagged items.</p>
      </div>
      <motion.div
        className="product-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, amount: 0.2}}
        variants={{
          hidden: {},
          visible: {transition: {staggerChildren: 0.08}},
        }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={{hidden: {opacity: 0, y: 20}, visible: {opacity: 1, y: 0}}}
          >
            <ProductCard product={product} cart={cart} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}