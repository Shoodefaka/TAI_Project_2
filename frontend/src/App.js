import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Games from './components/Games';
import { useState } from 'react';

function App() {

  const [name, setName] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);

  return (
    <div className='container-app'>
        <Sidebar setCategory={setCategory} category={category} setProducts={setProducts}/>
        <Navbar category={category} products={products} name={name} priceMin={priceMin} priceMax={priceMax} 
        setProducts={setProducts} setName={setName} setPriceMin={setPriceMin} setPriceMax={setPriceMax}/>
        <Games products={products} setProducts={setProducts}/>
    </div>
  );
}

export default App;
