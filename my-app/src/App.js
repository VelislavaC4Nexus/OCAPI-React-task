import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { CartProvider } from './contexts/CartContext';
import useAuth from './hooks/useAuth';
import Header from './header/Header';
import Footer from './footer/Footer';
import ProductDetails from './products/productDetails';
import RouteError from './components/RouteError';
import Cart from './cart/Cart';
import Checkout from './checkout/Checkout';
import Order from './order/Order';

function App() {
  const authurl =
    'https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/customers/auth';

  useAuth(authurl);
  return (
    <div>
      <CartProvider>
        <Header />
        <main>
          <Routes>
            <Route path='/'element={<RouteError />}></Route>
            <Route path='/:id' element={<ProductDetails />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
            <Route path='/order' element={<Order />}></Route>
            <Route path="*" element={<RouteError />}></Route>
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </div >
  );
}

export default App;
