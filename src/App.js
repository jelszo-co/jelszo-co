import React, { Component } from "react";
import "./App.scss";
import { TimelineMax } from "gsap/all";

export default class App extends Component {
	state = {
		lang: "en"
	};
	componentDidMount() {
		const tl = new TimelineMax();
		tl.to("#landing-center-text", 1, { text: "innovativity" }, "+=2");
		tl.to("#landing-center-text", 0.5, { text: "" }, "+=1.5");
		tl.to("#landing-center-text", 1, { text: "creativity" }, "+=1");
		tl.to("#landing-center-text", 0.5, { text: "" }, "+=1.5");
		tl.to("#landing-center-text", 1, { text: "Jelszo Co." }, "+=1");
		tl.to("#playhead", 0.5, { opacity: 0, animation: "none" }, "+=1");
		tl.to("#rect-main", 0.5, { opacity: 1 });
		tl.to([".sm-wrapper", ".lang-selector"], 0.5, { opacity: 1 }, "+=0.5");
	}
	changeLang = () => {
		if (this.state.lang === "hu") {
			this.setState({ lang: "en" });
		} else {
			this.setState({ lang: "hu" });
		}
	};
	render() {
		return (
			<div className='App'>
				<div id='rect-main'></div>
				<div id='landing-center-wrapper'>
					<h1 id='landing-center-text'> </h1>
					<span id='playhead'></span>
				</div>
				<div className='sm-wrapper'>
					<i
						className='fab fa-facebook-messenger'
						onClick={() => {
							window.location.href = "https://m.me/jelszoco";
						}}
					></i>
					<i className='fab fa-instagram'></i>
					<i className='fab fa-github'></i>
				</div>
				<div className='lang-selector' onClick={this.changeLang}>
					<h3>En</h3>
					<h3>Hu</h3>
				</div>
			</div>
		);
	}
}
