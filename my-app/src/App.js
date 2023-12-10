import Header from './header/Header';
import Footer from './footer/Footer';
import { Route, Routes } from "react-router-dom";
import Home from './home/Home';
import ProductDetails from './products/productDetails';
import RouteError from './components/RouteError';
import { CartProvider } from './contexts/CartContext';
import Cart from './cart/Cart';
import Checkout from './checkout/Checkout';
import useAuth from './hooks/useAuth';

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
            <Route path='/' element={<Home />}></Route>
            <Route path='/:id' element={<ProductDetails />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
            <Route path="*" element={<RouteError />}></Route>
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </div >
  );
}

export default App;
