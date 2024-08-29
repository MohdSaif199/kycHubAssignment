import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import ProductsPage from "./pages/ProductsPage";
import CompareProducts from "./pages/CompareProducts";
import { ProductsContextProvider } from "./context/ProductsContext";

function App() {
  return (
    <div>
      <ProductsContextProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/productdetails" element={<ProductsPage />} />
            <Route path="/compareproducts" element={<CompareProducts />} />
          </Route>
        </Routes>
      </ProductsContextProvider>
    </div>
  );
}

export default App;
