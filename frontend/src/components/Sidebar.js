import React, { useEffect } from 'react'
 //import {Row, Col} from 'react-bootstrap'
import "../styles/Sidebar.css"
import {SidebarData} from './SidebarData'
import axios from 'axios';

function Sidebar(props) {

  useEffect ( () => {
    console.log(props.category)
    axios
      .get(`http://localhost:8000/category/${props.category}`)
      .then(res => {
        console.log(res)
        props.setProducts(res.data)
      })
      .catch (err => {
        console.log(err)
    })
  }, [props.category])

  const makeCartList = () => {
    props.setCartList(...props.cartList, 
      props.cart.map(product => {
        return {
          unitPrice: product.price*100,
          name: product.name,
          quantity: "1"
        }
      })
    )
  }

  return (
    <div className='container-sidebar'>
      <div className='sidebar'>
        <div className='sidebar-element sidebar-first'  id={window.location.pathname === "/" ? "active": ""} 
        onClick={ () => {props.setCategory("all"); props.setShowCart(false)}}>
          <i className='sidebar-icon'>{SidebarData[0].icon}</i>
          {SidebarData[0].title}
        </div>
        <div className='sidebar-element' id={window.location.pathname === "/category/rodzinne" ? "active": ""}
        onClick={ () => {props.setCategory("rodzinne"); props.setShowCart(false)}}>
          <i className='sidebar-icon'>{SidebarData[1].icon}</i>
          {SidebarData[1].title}
        </div>
        <div className='sidebar-element' id={window.location.pathname === "/category/imprezowe" ? "active": ""}
        onClick={ () => {props.setCategory("imprezowe"); props.setShowCart(false)}}>
          <i className='sidebar-icon'>{SidebarData[2].icon}</i>
          {SidebarData[2].title}
        </div>
        <div className='sidebar-element' id={window.location.pathname === "/category/strategiczne" ? "active": ""}
        onClick={ () => {props.setCategory("strategiczne"); props.setShowCart(false)}}>
          <i className='sidebar-icon'>{SidebarData[3].icon}</i>
          {SidebarData[3].title}
        </div>
        <div className='sidebar-element' id={window.location.pathname === "/category/fantasy" ? "active": ""}
        onClick={ () => {props.setCategory("fantasy"); props.setShowCart(false)}}>
          <i className='sidebar-icon'>{SidebarData[4].icon}</i>
          {SidebarData[4].title}
        </div>
        <div className='sidebar-element' id={window.location.pathname === "/category/przygodowe" ? "active": ""}
        onClick={ () => {props.setCategory("przygodowe"); props.setShowCart(false)}}>
          <i className='sidebar-icon'>{SidebarData[5].icon}</i>
          {SidebarData[5].title}
        </div>
        <div className='sidebar-element' id={window.location.pathname === "/category/dodatki-do-gier" ? "active": ""}
        onClick={ () => {props.setCategory("dodatki-do-gier"); props.setShowCart(false)}}>
          <i className='sidebar-icon'>{SidebarData[6].icon}</i>
          {SidebarData[6].title}
        </div>
        <div className='sidebar-element' id={window.location.pathname === "/category/karciane" ? "active": ""}
        onClick={ () => {props.setCategory("karciane"); props.setShowCart(false)}}>
          <i className='sidebar-icon'>{SidebarData[7].icon}</i>
          {SidebarData[7].title}
        </div>
        <div className='sidebar-element sidebar-last' id={window.location.pathname === "/cart" ? "active": ""}
        onClick={ () => {props.setShowCart(true); makeCartList()}}>
          <i className='sidebar-icon'>{SidebarData[8].icon}</i>
          {SidebarData[8].title} ({props.cart.length})
        </div>
      </div>
    </div>
  )
}

export default Sidebar