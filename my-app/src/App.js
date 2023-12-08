import Header from './header/Header';
import Footer from './footer/Footer';
import { Route, Routes } from "react-router-dom";
import Home from './home/Home';
import ProductDetails from './products/productDetails';
import RouteError from './components/RouteError';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <div>
      <CartProvider>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/:id' element={<ProductDetails />}></Route>
            <Route path="*" element={<RouteError />}></Route>
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </div >
  );
}

export default App;
