import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import Contacts from './components/Contacts';
import AddContact from './components/AddContact';

function App() {

	return (
		<Router>
			<div className="App">
				<header>
					<Link to="/" className="App__header">
						<h1>Contacts App</h1>
					</Link>
				</header>
				<Switch>

					<Route path="/" exact>
						<Contacts />
					</Route>
					<Route path="/addcontact" exact>
						<AddContact />
					</Route>

				</Switch>
			</div>
		</Router>
	)
}

export default App