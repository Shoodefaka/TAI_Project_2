import React, { useEffect, useState } from 'react'
import {Modal, Button, Carousel} from 'react-bootstrap';
import '../styles/CardGamesModal.css'
import axios from 'axios';

function CardGamesModal(props) {

  const handleClose = () => props.setShowModal(false)
  const addToCart = (productToAdd) => props.setCart([...props.cart, {...productToAdd}]);
  const[images, setImages] = useState([]);

  useEffect( () => {
    axios
      .get(`http://localhost:8000/images/${props.product.id}`)
      .then(res => {
        console.log(res)
        setImages(res.data)
      })
      .catch (err => {
        console.log(err)
      })
  }, []);

  return (
    <Modal show={true} onHide={handleClose} centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{props.product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Carousel>
                {images.map(image => { 
                    return <Carousel.Item interval={null} key={image.id}>
                        <img className="d-block w-10 imageCenter" height={400} src={image.image_base64} alt="First slide"/>
                    </Carousel.Item>
                })}
            </Carousel>
            <div>
                {props.product.price} zł 
            </div>
            <div>
                {props.product.available} pozostało 
            </div>
            <div>
                {props.product.score} ocena
            </div>
            <div>
                {props.product.description}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>Zamknij</Button>
          <Button variant="primary" onClick={() => addToCart(props.product)}>Dodaj do koszyka</Button>
        </Modal.Footer>
    </Modal>    
  )
}

export default CardGamesModal