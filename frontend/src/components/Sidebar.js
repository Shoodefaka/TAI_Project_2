import React, { useEffect } from 'react'
 //import {Row, Col} from 'react-bootstrap'
import "../styles/Sidebar.css"
import {SidebarData} from './SidebarData'
import axios from 'axios';

function Sidebar(props) {

  useEffect ( () => {
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

  return (
    <div className='container-sidebar'>
      <div className='sidebar'>
        <div className='sidebar-element sidebar-first'  id={window.location.pathname === "/" ? "active": ""} 
        onClick={ () => {window.location.pathname = "/"}}>
          <i className='sidebar-icon'>{SidebarData[0].icon}</i>
          {SidebarData[0].title}
        </div>
        <div className='sidebar-element' id={window.location.pathname === "/category/rodzinne" ? "active": ""}
        onClick={ () => {props.setCategory("rodzinne")}}>
          <i className='sidebar-icon'>{SidebarData[1].icon}</i>
          {SidebarData[1].title}
        </div>
        <div className='sidebar-element' id={window.location.pathname === "/category/imprezowe" ? "active": ""}
        onClick={ () => {props.setCategory("imprezowe")}}>
          <i className='sidebar-icon'>{SidebarData[2].icon}</i>
          {SidebarData[2].title}
        </div>
        <div className='sidebar-element' id={window.location.pathname === "/category/strategiczne" ? "active": ""}
        onClick={ () => {props.setCategory("strategiczne")}}>
          <i className='sidebar-icon'>{SidebarData[3].icon}</i>
          {SidebarData[3].title}
        </div>
        <div className='sidebar-element' id={window.location.pathname === "/category/fantasy" ? "active": ""}
        onClick={ () => {props.setCategory("fantasy")}}>
          <i className='sidebar-icon'>{SidebarData[4].icon}</i>
          {SidebarData[4].title}
        </div>
        <div className='sidebar-element' id={window.location.pathname === "/category/przygodowe" ? "active": ""}
        onClick={ () => {props.setCategory("przygodowe")}}>
          <i className='sidebar-icon'>{SidebarData[5].icon}</i>
          {SidebarData[5].title}
        </div>
        <div className='sidebar-element' id={window.location.pathname === "/category/dodatki-do-gier" ? "active": ""}
        onClick={ () => {props.setCategory("dodatki-do-gier")}}>
          <i className='sidebar-icon'>{SidebarData[6].icon}</i>
          {SidebarData[6].title}
        </div>
        <div className='sidebar-element' id={window.location.pathname === "/category/karciane" ? "active": ""}
        onClick={ () => {props.setCategory("karciane")}}>
          <i className='sidebar-icon'>{SidebarData[7].icon}</i>
          {SidebarData[7].title}
        </div>
        <div className='sidebar-element sidebar-last' id={window.location.pathname === "/cart" ? "active": ""}
        onClick={ () => {window.location.pathname = "/cart"}}>
          <i className='sidebar-icon'>{SidebarData[8].icon}</i>
          {SidebarData[8].title}
        </div>
      </div>
    </div>
  )
}

export default Sidebar