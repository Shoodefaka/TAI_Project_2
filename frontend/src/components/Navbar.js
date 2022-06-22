import React, { useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import "../styles/Navbar.css";
import axios from 'axios';

function Navbar(props) {


  const inputSetPrice = (priceMin, priceMax) => {
    props.setPriceMin(priceMin);
    props.setPriceMax(priceMax);
  }

  useEffect ( () => {
    axios
      .get(`http://localhost:8000/category/${props.category}?name=${props.name}&priceMin=${props.priceMin}&priceMax=${props.priceMax}`)
      .then(res => {
        console.log(res)
        props.setProducts(res.data)
      })
      .catch (err => {
        console.log(err)
    })
  }, [props.name, props.priceMax, props.priceMin])

  return (
    <div className='navbar-app'>
        <div className='icon-container'>
            <img className='shop-icon' src='https://cdn-icons-png.flaticon.com/512/1390/1390283.png' alt='Shop Icon' width={150}></img>
            <label className='shop-icon-text'>Uśmiechnięte planszówki</label>
        </div>
        <div className='name-filter-container'>
            <label className='name-search'>Nazwa gry:</label> <br/>
            <input type="text" placeholder='' value={props.inputName} onInput={e => props.setInputName(e.target.value)}></input>
            <Button className='name-search-button' variant="warning" onClick={() => {props.setName(props.inputName)}}>Szukaj</Button>{' '}
        </div>
        <div className='price-filter-container'>
            <label className='price-min'>Cena minimalna:</label>
            <label className='price-max'>Cena maksymalna:</label> <br/>
            <input type="number" placeholder='' value={props.inputPriceMin} onInput={e => props.setInputPriceMin(e.target.value)}></input>
            <input type="number" placeholder='' value={props.inputPriceMax} onInput={e => props.setInputPriceMax(e.target.value)}></input>
            <Button className='price-search-button' variant="warning" onClick={() => inputSetPrice(props.inputPriceMin, props.inputPriceMax)}>Szukaj</Button>{' '}
        </div>
    </div>
  )
}

export default Navbar;