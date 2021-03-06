import React, { useState } from 'react';
import "../styles/Games.css";
import axios from 'axios';
import CardGames from './CardGames';

function Games(props) {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const removeFromCart = (productToRemove) => {
    props.setCart(props.cart.filter((prod) => prod !== productToRemove));
  };

  const getTotalSum = () => {
    var temp = props.cart.reduce((sum, {price}) => sum + price, 0);
    return parseFloat(temp).toFixed(2);
  }

  const clearCart = () => {
    props.setCart([]);
  }

  const handlePayClick = () => {
    if(firstname === "" || lastname === "" || email === "" || phone === "") {
      setShowWarning(true);
    }
    else {
      setShowWarning(false);

      axios
      .post('http://localhost:8000/payment', {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        total_cost: (getTotalSum()*100)
      }
      )
      .then(function (response) {
        console.log(response);
        window.open(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

      clearCart();
      setFirstname("");
      setLastname("");
      setEmail("");
      setPhone("");
    }
  }

  return (
    <div>
      {!props.showCart && 
      <div className="games-app">
        {props.products.map(product => <CardGames product={product} key={product.id} cart={props.cart} setCart={props.setCart}/>)}
      </div>
      }
      {props.showCart &&
      <div className='cart-app'>
        <div>
          <table className='table table-bordered border-secondary' style={{width: '1000px'}}>
            <thead>
              <tr>
                <th className='text-center align-middle' scope='col' style={{width: '250px'}}>Zdjęcie</th>
                <th className='text-center align-middle' scope='col' style={{width: '250px'}}>Nazwa</th>
                <th className='text-center align-middle' scope='col' style={{width: '250px'}}>Cena</th>
                <th className='text-center align-middle' scope='col' style={{width: '250px'}}>Usuwanie</th>
              </tr>
            </thead>
            <tbody>
              {props.cart.map(cartProduct =>
                <tr>
                  <th className='table-position align-middle'><img height={100} src={cartProduct.preview} alt="cart"/></th>
                  <th className='table-position align-middle'>{cartProduct.name}</th>
                  <th className='table-position align-middle'>{cartProduct.price} zł</th>
                  <th className='table-position align-middle'><button type='button' className='btn btn-secondary btn-lg' onClick={() => removeFromCart(cartProduct)}>Usuń</button></th>
                </tr>
              )}
            </tbody>
          </table>
          <div className='sum-flex'>
            <label className='sum-text'>Do zapłaty: {getTotalSum()} zł</label>
            <button type='button' className='btn btn-secondary btn-lg' onClick={() => clearCart()}>Wyczyść koszyk</button>
          </div>
          <div className='pay-data-position'>Dane do zapłaty</div>
          <div className='form-position'>
            <div className='container container-positon'>
              <div className='row'>
                <div className='col-lg-3 col-name'>
                  Imię:
                </div>
                <div className='col col-input'>
                  <input type='text' value={firstname} onInput={e => setFirstname(e.target.value)}/>
                </div>
              </div>
              <div className='row'>
              <div className='col-lg-3  col-name'>
                  Nazwisko:
                </div>
                <div className='col col-input'>
                  <input type='text' value={lastname} onInput={e => setLastname(e.target.value)}/>
                </div>
              </div>
              <div className='row'>
              <div className='col-lg-3  col-name'>
                  Email:
                </div>
                <div className='col col-input'>
                  <input type='email' value={email} onInput={e => setEmail(e.target.value)}/>  
                </div>
              </div>
              <div className='row'>
              <div className='col-lg-3  col-name'>
                  Telefon:
                </div>
                <div className='col col-input'>
                  <input type='number' value={phone} onInput={e => setPhone(e.target.value)}/>
                </div>
              </div>
            </div>
          </div>
          <button type='button' className='btn btn-primary btn-lg button-position' onClick={() => handlePayClick()}>Zapłać z PayU</button>
          {showWarning && <div className='warning-position'>Proszę uzupełnić puste pola</div>}
        </div>
      </div>
      }
    </div>
  )
}

export default Games;