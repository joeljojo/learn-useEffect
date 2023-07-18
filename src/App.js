import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    // fetch data from API
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();

        if (isMounted) {
          setProducts(data.products);
        }
      } catch (error) {
        console.log("Sever error, try again later");
      }
    };

    // call the function
    fetchProducts();
    // Add clean up
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className="app">
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              <img src={product.thumbnail} alt={product.title} />
            </div>
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">&#36; {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
