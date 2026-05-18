import {useEffect, useState} from 'react';

const STORAGE_KEY = 'saree-boutique-wishlist';

export function WishlistButton({productId, className = ''}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const current = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    setSaved(current.includes(productId));
  }, [productId]);

  function toggleWishlist() {
    const current = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    const next = current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSaved(next.includes(productId));
  }

  return (
    <button
      type="button"
      aria-pressed={saved}
      className={`wishlist-button ${className}`.trim()}
      onClick={toggleWishlist}
    >
      {saved ? '♥' : '♡'}
    </button>
  );
}