export const SPECIAL_OFFER_TAG = 'special-offer';

export function isSpecialOfferProduct(product) {
  const tags = product?.tags || [];
  return tags.some((tag) => String(tag).toLowerCase() === SPECIAL_OFFER_TAG);
}

export function isSpecialOfferLine(line) {
  return isSpecialOfferProduct(line?.merchandise?.product);
}

export function cartHasProduct(cart, productId) {
  return Boolean(
    cart?.lines?.nodes?.some(
      (line) => line?.merchandise?.product?.id === productId,
    ),
  );
}

export function cartHasSpecialOfferQuantityViolation(cart) {
  return Boolean(
    cart?.lines?.nodes?.some(
      (line) => isSpecialOfferLine(line) && Number(line.quantity || 0) > 1,
    ),
  );
}

export function getSpecialOfferLineMessage(cart) {
  if (!cart?.lines?.nodes?.length) return null;

  const offendingLine = cart.lines.nodes.find(
    (line) => isSpecialOfferLine(line) && Number(line.quantity || 0) > 1,
  );

  if (!offendingLine) return null;

  return `${offendingLine.merchandise?.product?.title || 'Offer item'} can only be purchased in a quantity of 1.`;
}