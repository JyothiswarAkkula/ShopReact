import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

function Favorites() {
  const favorites = useSelector((state) => state.favorites.items);
  const products = useSelector((state) => state.products.items.filter((p) => favorites.includes(p.id)));

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Favorites</h2>
      {products.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;