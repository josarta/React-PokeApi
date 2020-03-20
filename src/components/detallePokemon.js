import React, { Component } from "react";
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card'

export default class DetallePokemon extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nombre: 'bulbasaur',
            imagen: 'https://pokeres.bastionbot.org/images/pokemon/'
        };
    }


    render() {

        return (
            <div className="table-wrapper ajustaCard">
                <Card style={{ width: '28rem' }}>
                    <Card.Img variant="top" src={this.state.imagen + this.props.posPokemon + '.png'} />
                    <Card.Body>
                        <Card.Title><h1>{this.props.nombrePokemon}</h1></Card.Title>
                    </Card.Body>
                </Card>

            </div>
        );
    }
}
