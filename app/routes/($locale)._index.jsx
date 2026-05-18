import {Await, useLoaderData, useRouteLoaderData} from 'react-router';
import {Suspense} from 'react';
import {HeroCarousel} from '~/components/home/HeroCarousel';
import {SpecialOffersBanner} from '~/components/home/SpecialOffersBanner';
import {CollectionSection} from '~/components/home/CollectionSection';
import {BestSellers} from '~/components/home/BestSellers';
import {InstagramGallery} from '~/components/home/InstagramGallery';
import {Testimonials} from '~/components/home/Testimonials';
import {ProductCard} from '~/components/product/ProductCard';
import {
  collectionHighlights,
  heroSlides,
  instagramGallery,
  specialOfferPromos,
  testimonials,
} from '~/lib/sareeData';
import {isSpecialOfferProduct} from '~/lib/cart';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => [{title: 'Saree Boutique | Luxury South Indian Sarees'}];

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  return loadDeferredData(args);
}

/**
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({context}) {
  const products = context.storefront.query(HOME_PRODUCTS_QUERY).catch((error) => {
    console.error(error);
    return null;
  });

  const collections = context.storefront.query(COLLECTIONS_QUERY).catch((error) => {
    console.error(error);
    return null;
  });

  return {products, collections};
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const {products, collections} = useLoaderData();
  const rootData = useRouteLoaderData('root');

  return (
    <div className="saree-home">
      <HeroCarousel slides={heroSlides} />
      <SpecialOffersBanner messages={specialOfferPromos} />
      <Suspense fallback={<SectionSkeleton title="Collections" />}>
        <Await resolve={collections}>
          {(collectionData) => {
            const collectionsArray = collectionData?.collections?.nodes || [];
            const [first, second, third, fourth] = collectionsArray;
            return (
              <>
                {first && (
                  <CollectionSection
                    title={first.title}
                    description={
                      first.description ||
                      'Fresh silk statements for the season, balanced with a luxury editorial layout.'
                    }
                    items={[mapCollectionData(first)]}
                  />
                )}
                {second && (
                  <CollectionSection
                    title={second.title}
                    description={
                      second.description ||
                      'Rich reds, antique gold, and heirloom drapes selected for a memorable ceremony.'
                    }
                    items={[mapCollectionData(second)]}
                  />
                )}
                {third && (
                  <CollectionSection
                    title={third.title}
                    description={
                      third.description ||
                      'Traditional weaves with a modern finish, perfect for wedding circuits and festive evenings.'
                    }
                    items={[mapCollectionData(third)]}
                  />
                )}
                {fourth && (
                  <CollectionSection
                    title={fourth.title}
                    description={
                      fourth.description ||
                      'Ikat geometry and handloom depth with a refined, modern finish.'
                    }
                    items={[mapCollectionData(fourth)]}
                  />
                )}
              </>
            );
          }}
        </Await>
      </Suspense>
      <Suspense fallback={<SectionSkeleton title="Special Offer Products" />}>
        <Await resolve={rootData?.cart}>
          {(cart) => (
            <Await resolve={products}>
              {(response) => {
                const productNodes = response?.products?.nodes || [];
                const mappedProducts = productNodes.map(mapProductCardData);
                const offerProducts = mappedProducts.filter((product) =>
                  isSpecialOfferProduct(product),
                );

                return (
                  <>
                    <section className="special-offer-products">
                      <div className="section-heading">
                        <div>
                          <p className="eyebrow">Special Offer Products</p>
                          <h2>Festival specials</h2>
                        </div>
                        <p>
                          These tagged products are capped at one per customer and guarded through cart and checkout validation.
                        </p>
                      </div>
                      {offerProducts.length ? (
                        <div className="product-grid">
                          {offerProducts.map((product) => (
                            <ProductCard key={product.id} product={product} cart={cart} />
                          ))}
                        </div>
                      ) : (
                        <p className="section-empty">
                          No tagged special-offer products were returned by the store yet. The UI is ready for them.
                        </p>
                      )}
                    </section>
                    <BestSellers products={mappedProducts} cart={cart} />
                  </>
                );
              }}
            </Await>
          )}
        </Await>
      </Suspense>
      <InstagramGallery items={instagramGallery} />
      <Testimonials items={testimonials} />
    </div>
  );
}

function mapProductCardData(product) {
  const variant = product.selectedOrFirstAvailableVariant;

  return {
    id: product.id,
    title: product.title,
    href: `/products/${product.handle}`,
    image: variant?.image?.url || product.featuredImage?.url,
    category: product.vendor || 'Luxury saree',
    description:
      product.description || 'A premium silk edit selected for the boutique homepage.',
    badge: product.tags?.includes('special-offer') ? 'Special Offer' : 'New Arrival',
    price: variant?.price,
    compareAtPrice: variant?.compareAtPrice,
    variant,
    tags: product.tags || [],
    selectedVariant: variant,
  };
}

function SectionSkeleton({title}) {
  return (
    <section className="section-skeleton">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Loading</p>
          <h2>{title}</h2>
        </div>
      </div>
    </section>
  );
}

function mapCollectionData(collection) {
  return {
    title: collection.title,
    description: collection.description,
    image: collection.image?.url || collectionHighlights[0]?.image,
    href: `/collections/${collection.handle}`,
  };
}

const HOME_PRODUCTS_QUERY = `#graphql
  fragment HomeProductVariant on ProductVariant {
    id
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    selectedOptions {
      name
      value
    }
    title
  }
  fragment HomeProduct on Product {
    id
    title
    handle
    vendor
    tags
    description
    featuredImage {
      id
      url
      altText
      width
      height
    }
    selectedOrFirstAvailableVariant {
      ...HomeProductVariant
    }
  }
  query HomeProducts($country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...HomeProduct
      }
    }
  }
`;

const COLLECTIONS_QUERY = `#graphql
  fragment CollectionData on Collection {
    id
    title
    handle
    description
    image {
      id
      url
      altText
      width
      height
    }
  }
  query Collections($country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    collections(first: 4) {
      nodes {
        ...CollectionData
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
