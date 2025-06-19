import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.items.find((p) => p.id === parseInt(id)));
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.includes(parseInt(id));

  if (!product) return <div className="text-center">Product not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={product.image} alt={product.title} className="h-64 w-64 object-contain" />
        <div>
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>
          <p className="mt-4">{product.description}</p>
          <p className="mt-2 text-gray-500">Category: {product.category}</p>
          <button
            onClick={() => dispatch(toggleFavorite(product.id))}
            className={`mt-4 px-4 py-2 rounded ${isFavorite ? 'bg-red-500' : 'bg-blue-500'} text-white`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;