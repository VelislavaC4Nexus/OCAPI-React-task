import { Route, Routes } from "react-router-dom";
import { CartProvider } from './contexts/CartContext';
import useAuth from './hooks/useAuth';
import Header from './header/Header';
import Footer from './footer/Footer';
import ProductDetails from './products/productDetails';
import RouteError from './components/RouteError';
import Cart from './cart/Cart';
import Checkout from './checkout/Checkout';
import Order from './order/Order';
import { AUTH_URL } from "./utils/urlEndpoints";

function App() {
  useAuth(AUTH_URL);
  return (
    <CartProvider>
      <Header />
      <main className="container-lg">
        <Routes>
          <Route path='/' element={<RouteError />}></Route>
          <Route path='/:productId' element={<ProductDetails />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/checkout' element={<Checkout />}></Route>
          <Route path='/order' element={<Order />}></Route>
          <Route path="*" element={<RouteError />}></Route>
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;
