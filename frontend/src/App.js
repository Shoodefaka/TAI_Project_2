import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Games from './components/Games';
import { useState } from 'react';

function App() {

  const [name, setName] = useState("");
  const [priceMin, setPriceMin] = useState("0");
  const [priceMax, setPriceMax] = useState("700");
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartList, setCartList] = useState([]);

  return (
    <div className='container-app'>
        <Sidebar cart={cart} category={category} cartList={cartList} setCategory={setCategory} setProducts={setProducts} setShowCart={setShowCart} setCartList={setCartList}/>
        <Navbar category={category} products={products} name={name} priceMin={priceMin} priceMax={priceMax}
        setProducts={setProducts} setName={setName} setPriceMin={setPriceMin} setPriceMax={setPriceMax}/>
        <Games products={products} cart={cart} showCart={showCart} cartList={cartList} setProducts={setProducts} setCart={setCart} setShowCart={setShowCart}/>
    </div>
  );
}

export default App;
