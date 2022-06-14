import React, {useState, useEffect} from 'react';
import "../styles/Games.css";
import axios from 'axios';
import CardGames from './CardGames';

function Games(props) {

  useEffect( () => {
    axios
      .get('http://localhost:8000/product/all')
      .then(res => {
        console.log(res)
        props.setProducts(res.data)
      })
      .catch (err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <div className="games-app">
        {props.products.map(product => <CardGames product={product} key={product.id}/>)}
      </div>
    </div>
  )
}

export default Games;