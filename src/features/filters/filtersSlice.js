import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    search: '',
    category: '',
    sort: '',
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setSearch, setCategory, setSort } = filtersSlice.actions;

export const selectFilteredProducts = (state) => {
  const { items } = state.products;
  const { search, category, sort } = state.filters;
  let filtered = [...items];

  if (search) {
    filtered = filtered.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    filtered = filtered.filter((item) => item.category === category);
  }

  if (sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
};

export default filtersSlice.reducer;