import React, { useState } from 'react';
import CardGamesModal from './CardGamesModal';

function CardGames(props) {

  const[showModal, setShowModal] = useState(false)

  return (
    <div className="card" style={{width: '300px'}}>
      {showModal && <CardGamesModal product = {props.product} cart={props.cart} setShowModal={setShowModal} setCart={props.setCart}/>}
      <img src={props.product.preview} width='300px' height='300px' className="card-img-top" alt='preview'></img>
      <div className="card-body">
        <h5 className="card-title">{props.product.name}</h5>
        <p className="card-text">{props.product.price} zł</p>
        <a href="#" className="btn btn-primary" onClick={ () => setShowModal(true)}>Podgląd</a>
      </div>
    </div>
  )
}

export default CardGames;