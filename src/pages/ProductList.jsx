import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories } from '../features/products/productsSlice';
import { setSearch, setCategory, setSort } from '../features/filters/filtersSlice';
import { selectFilteredProducts } from '../features/filters/filtersSlice';
import ProductCard from '../components/ProductCard';
import { debounce } from '../utils/debounce';

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const { categories, status } = useSelector((state) => state.products);
  const { search, category, sort } = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const debouncedSearch = debounce((value) => {
    dispatch(setSearch(value));
  }, 500);

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  if (status === 'loading') return <div className="text-center">Loading...</div>;
  if (status === 'failed') return <div className="text-center text-red-500">Error loading products</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          onChange={handleSearch}
          defaultValue={search}
          className="border p-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search products"
        />
        <select
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          className="border p-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
          className="border p-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Sort by price"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;