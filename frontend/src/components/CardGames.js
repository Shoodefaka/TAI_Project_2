import React from 'react';
import {Card, Button} from 'react-bootstrap';

function CardGames(props) {
  return (
    <Card style={{ width: '300px' }}>
        <Card.Img variant="top" width='300px' height='300px' src={props.product.preview} />
        <Card.Body>
            <Card.Title>{props.product.name}</Card.Title>
            <Card.Text>{props.product.price} zł</Card.Text>
            <Button variant="primary">Podgląd</Button>
        </Card.Body>
    </Card>
  )
}

export default CardGames;