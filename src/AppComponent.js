import React from 'react';
import ReactDOM from 'react-dom';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ListaPokemon from "./components/listaPokemon";
import DetallePokemon from "./components/detallePokemon";


export default class extends React.Component {
	constructor() {
		super();
		this.state = {
			count: '',
			next: '',
			previous: '',
			pokemonItems: [],
			nombrePokemon:'bulbasaur',
			posPokemon:1,
			editing: false,
			modal: false
		};
		this.appAdelantePokemon = this.appAdelantePokemon.bind(this);
		this.appAtrasPokemon = this.appAtrasPokemon.bind(this);
		this.appDetallePokemon = this.appDetallePokemon.bind(this);
	}

	handleResponseError(response) {
		throw new Error("HTTP error, status = " + response.status);
	}
	handleError(error) {
		console.log(error.message);
	}

	actalizaTabla(request) {
		fetch(request)
			.then(response => {
				if (!response.ok) {
					this.handleResponseError(response);
				}
				return response.json();
			})
			.then(json => {
				console.log("Retrieved items:");
				console.log(json);
				this.setState({
					pokemonItems: json.respuesta.results,
					count: json.respuesta.count,
					next: json.respuesta.next,
					previous: json.respuesta.previous
				})

			})
			.catch(error => {
				this.handleError(error);
			});
	}

	componentDidMount() {
		const request = new Request('http://localhost:8080/o/servicereact/pokemon/josarta', {
			method: 'GET'
		});
		this.actalizaTabla(request);
	}


	appAdelantePokemon() {
		console.log("--->  appAdelantePokemon");
		let params = this.state.next.split('?');
		let _apiUrl = "http://localhost:8080/o/servicereact/pokemon/josarta";
		const request = new Request(
			_apiUrl + "?" + params[1], {
			method: 'GET'
		});
		this.actalizaTabla(request);
	}


	appAtrasPokemon() {
		console.log("--->  appAtrasPokemon");
		let params = this.state.previous.split('?');
		let _apiUrl = "http://localhost:8080/o/servicereact/pokemon/josarta";
		const request = new Request(
			_apiUrl + "?" + params[1], {
			method: 'GET'
		});
		this.actalizaTabla(request);
	}

	appDetallePokemon(pokemon) {
		console.log("--->  appDetallePokemon" + JSON.stringify(pokemon));
		let pos = pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/','');
		this.setState({
			nombrePokemon: pokemon.name,
			posPokemon: pos.replace('/','')
		})
	}

	render() {
		const { editing } = this.state;

		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<Navbar bg="dark" variant="dark">
							<Container>

								<Navbar.Brand>
									<Link to={"/web/react-rest"} className="nav-link">
										React PokèApi.
					  </Link>
								</Navbar.Brand>
							</Container>
						</Navbar>
					</header>

					<Container>
						<div className="wrapper">
							<Row>
								<Col md={6}>
									<ListaPokemon
										appDetallePokemon={this.appDetallePokemon}
										appAtrasPokemon={this.appAtrasPokemon}
										appAdelantePokemon={this.appAdelantePokemon}
										modalEstado={this.state.modal}
										next={this.state.next}
										previous={this.state.previous}
										dataFromParent={this.state.pokemonItems} />
								</Col>
								<Col md={6}>
									<DetallePokemon   nombrePokemon={this.state.nombrePokemon}  posPokemon={this.state.posPokemon} />
								</Col>
							</Row>
						</div>
					</Container>
				</div>
			</Router>
		);
	}
}

