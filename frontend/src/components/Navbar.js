import React, { useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import "../styles/Navbar.css";
import axios from 'axios';

function Navbar(props) {

  const [inputName, setInputName] = useState("")
  const [inputPriceMin, setInputPriceMin] = useState("0")
  const [inputPriceMax, setInputPriceMax] = useState("700")

  const inputSetName = (name) => {
    props.setName(name);
  }

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
            <input type="text" placeholder='' value={inputName} onInput={e => setInputName(e.target.value)}></input>
            <Button className='name-search-button' variant="warning" onClick={() => inputSetName(inputName)}>Szukaj</Button>{' '}
        </div>
        <div className='price-filter-container'>
            <label className='price-min'>Cena minimalna:</label>
            <label className='price-max'>Cena maksymalna:</label> <br/>
            <input type="number" placeholder='' value={inputPriceMin} onInput={e => setInputPriceMin(e.target.value)}></input>
            <input type="number" placeholder='' value={inputPriceMax} onInput={e => setInputPriceMax(e.target.value)}></input>
            <Button className='price-search-button' variant="warning" onClick={() => inputSetPrice(inputPriceMin, inputPriceMax)}>Szukaj</Button>{' '}
        </div>
    </div>
  )
}

export default Navbar;