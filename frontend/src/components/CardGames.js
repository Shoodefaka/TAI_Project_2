import React, { useState, useEffect } from 'react';
import {Modal, Button} from 'react-bootstrap';
import CardGamesModal from './CardGamesModal';
import axios from 'axios';

function CardGames(props) {

  const[showModal, setShowModal] = useState(false)

  return (
    // <Card style={{ width: '300px' }}>
    //   {showModal && <CardGamesModal/>}
    //     <Card.Img variant="top" width='300px' height='300px' src={props.product.preview} />
    //     <Card.Body>
    //         <Card.Title>{props.product.name}</Card.Title>
    //         <Card.Text>{props.product.price} zł</Card.Text>
    //         <Button variant="primary" onClick={ () => setShowModal(true)}>Podgląd</Button>
    //     </Card.Body>
    // </Card>
    <div className="card" style={{width: '300px'}}>
      {showModal && <CardGamesModal product = {props.product} cart={props.cart} setShowModal={setShowModal} setCart={props.setCart}/>}
      <img src={props.product.preview} width='300px' height='300px' className="card-img-top"></img>
      <div className="card-body">
        <h5 className="card-title">{props.product.name}</h5>
        <p className="card-text">{props.product.price} zł</p>
        <a href="#" className="btn btn-primary" onClick={ () => setShowModal(true)}>Podgląd</a>
      </div>
    </div>
  )
}

export default CardGames;