import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CSS/ProductList.css";


const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);

  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div>
      <h2>Products</h2>
      {status === 'loading' && <p className="loading-message">Loading...</p>}
      {status === 'failed' && <p className="error-message">Error: {error}</p>}
      {status === 'succeeded' && (
        <div className="product-list">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <h3>{product.title}</h3>
              <img src={product.image} alt={product.title} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
