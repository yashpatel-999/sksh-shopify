import {useMemo, useState} from 'react';
import {motion} from 'framer-motion';
import {Badge} from '~/components/ui/Badge';
import {Button} from '~/components/ui/Button';
import {AddToCartButton} from '~/components/AddToCartButton';
import {ProductPrice} from '~/components/ProductPrice';
import {cartHasProduct, isSpecialOfferProduct} from '~/lib/cart';
import {WishlistButton} from './WishlistButton';
import {QuickViewModal} from './QuickViewModal';

export function ProductCard({product, cart}) {
  const [open, setOpen] = useState(false);
  const variant = product.selectedVariant || product.variant;
  const isSpecialOffer = isSpecialOfferProduct(product);
  const alreadyInCart = useMemo(
    () => cartHasProduct(cart, product.id),
    [cart, product.id],
  );
  const canAddToCart = Boolean(variant?.id) && variant?.availableForSale && !(isSpecialOffer && alreadyInCart);
  const disabledMessage = isSpecialOffer && alreadyInCart ? 'Only 1 offer item allowed per customer' : null;

  return (
    <motion.article
      className="product-card"
      whileHover={{y: -4}}
      transition={{duration: 0.2}}
    >
      <div className="product-card-media">
        {product.badge ? <Badge>{product.badge}</Badge> : null}
        {product.compareAtPrice ? <Badge className="badge-sale">Sale</Badge> : null}
        <WishlistButton productId={product.id} />
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-card-body">
        <p className="eyebrow">{product.category}</p>
        <h3>{product.title}</h3>
        <p className="product-card-description">{product.description}</p>
        <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} />
        <div className="product-card-actions">
          <Button variant="secondary" onClick={() => setOpen(true)}>
            Quick view
          </Button>
          {canAddToCart ? (
            <AddToCartButton
              disabled={!canAddToCart}
              lines={[
                {
                  merchandiseId: variant.id,
                  quantity: 1,
                  selectedVariant: variant,
                },
              ]}
            >
              {isSpecialOffer ? 'Claim offer' : 'Add to cart'}
            </AddToCartButton>
          ) : (
            <Button disabled variant="ghost">
              {disabledMessage || 'Sold out'}
            </Button>
          )}
        </div>
        {disabledMessage ? <p className="product-card-note">{disabledMessage}</p> : null}
      </div>
      <QuickViewModal product={product} open={open} onClose={() => setOpen(false)} />
    </motion.article>
  );
}