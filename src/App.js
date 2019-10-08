import React, { Component } from "react";
import "./App.scss";
import "gsap/all";

export default class App extends Component {
	render() {
		return (
			<div className='App'>
				<div id='rect-main'></div>
				<div className='rect-extension rect-extension-1'></div>
				<div className='rect-extension rect-extension-2'></div>
				<div id='landing-center-wrapper'>
					<h1 id='landing-center-text'>Innovativity</h1>
					<span id='playhead'></span>
				</div>
			</div>
		);
	}
}
