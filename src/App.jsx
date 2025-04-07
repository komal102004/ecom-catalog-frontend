import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import ProductList from "./ProductList.jsx";
import CategoryFilter from "./CategoryFilter.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

// ✅ Private Route Component
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("user"); // Check if user exists
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));

    fetch("http://localhost:8080/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleSortChange = (event) => setSortOrder(event.target.value);
  const handleCategorySelect = (categoryId) => setSelectedCategory(categoryId ? Number(categoryId) : null);

  const filteredProducts = products
    .filter((product) =>
      (selectedCategory ? product.category.id === selectedCategory : true) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <div className="container">
                <h1 className="my-4">Product Catalog</h1>
                <div className="row align-items-center mb-4">
                  <div className="col-md-3 col-sm-12 mb-2">
                    <CategoryFilter categories={categories} onSelect={handleCategorySelect} />
                  </div>
                  <div className="col-md-5 col-sm-12 mb-2">
                    <input type="text" className="form-control" placeholder="Search for products" onChange={handleSearchChange} />
                  </div>
                  <div className="col-md-4 col-sm-12 mb-2">
                    <select className="form-control" onChange={handleSortChange}>
                      <option value="asc">Sort by Price: Low to High</option>
                      <option value="desc">Sort by Price: High to Low</option>
                    </select>
                  </div>
                </div>
                <div>{filteredProducts.length ? <ProductList products={filteredProducts} /> : <p>No Products Found</p>}</div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
