import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../features/productSlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './CSS/productDetail.css'; 

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  return (
    <div className="product-details-container">
      <h2>Product Details</h2>
      {status === 'loading' && <p className="loading-message">Loading...</p>}
      {status === 'failed' && <p className="error-message">Error: {error}</p>}
      {status === 'succeeded' && product && (
        <div>
          <img src={product.image} alt={product.title} className="product-image" />
          <h3 className="product-title">{product.title}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ${product.price}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
