import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export default class ListaPokemon extends Component {

  constructor(props) {
    super(props)
    this.state = {
      next: '',
      previous: ''
    };
  }


  render() {
    const handleHide = () => this.props.cerraModal();

    return (
      <div className="table-wrapper">
        <br />
        <div>
          <Alert show={this.props.modalEstado} variant="success">
            <Alert.Heading>Cliente removido con éxito !!!</Alert.Heading>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={handleHide} variant="outline-success">
                Cerrar !!!!!!
            </Button>
            </div>
          </Alert>
        </div>

        <br />
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.dataFromParent.length > 0 ? (
                this.props.dataFromParent.map((obj, i) => (
                  <React.Fragment key={i}>
                    <tr>
                      <td className="centrar" ><h3>{obj.name}</h3></td>
                      <td className="centrar" >
                        <Button size="sm" onClick={() => this.props.appDetallePokemon(obj)} variant="info">Detalles</Button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                  <tr>
                    <td colSpan={2}>Sin pokemones :(</td>
                  </tr>
                )


            }
            {

              this.props.previous == null ? (
                <tr>
                  <td className="centrar" >
               
                  </td>
                  <td className="centrar" >
                    <Button size="sm" onClick={() => this.props.appAdelantePokemon()} variant="success">adelante</Button>
                  </td>
                </tr>
              ) : (
                  <tr>
                    <td className="centrar" >
                      <Button size="sm" onClick={() => this.props.appAtrasPokemon()} variant="danger"> atras</Button>
                    </td>
                    <td className="centrar" >
                      <Button size="sm" onClick={() => this.props.appAdelantePokemon()} variant="success">adelante</Button>
                    </td>
                  </tr>
                )

            }


          </tbody>
        </Table>


      </div>
    );
  }
}
