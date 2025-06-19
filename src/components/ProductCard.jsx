import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleFavorite } from '../features/favorites/favoritesSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.includes(product.id);

  return (
    <div className="border rounded-lg p-4 flex flex-col items-center bg-white shadow-md">
      <img src={product.image} alt={product.title} className="h-40 w-40 object-contain" />
      <h3 className="text-lg font-semibold mt-2 text-center">{product.title}</h3>
      <p className="text-gray-600">${product.price}</p>
      <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline mt-2">
        View Details
      </Link>
      <button
        onClick={() => dispatch(toggleFavorite(product.id))}
        className={`mt-2 px-4 py-2 rounded ${isFavorite ? 'bg-red-500' : 'bg-blue-500'} text-white`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? 'Remove Favorite' : 'Add to Favorite'}
      </button>
    </div>
  );
}

export default ProductCard;