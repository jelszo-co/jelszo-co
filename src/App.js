import React, { Component } from "react";
import "./App.scss";
import { TimelineMax } from "gsap/all";

export default class App extends Component {
	state = {
		lang: "en",
		currentPage: 2,
		pageNames: ["contact", "work", "home", "about", "team"]
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
		tl.to([".sm-wrapper", ".lang-selector", ".ctrl"], 0.5, { opacity: 1 }, "+=0.5");
		tl.addLabel("end");

		document.body.onkeyup = function(e) {
			if (e.keyCode === 32) {
				tl.currentLabel("end");
			}
		};
	}
	changeLang = () => {
		if (this.state.lang === "hu") {
			this.setState({ lang: "en" });
		} else {
			this.setState({ lang: "hu" });
		}
	};
	render() {
		const { currentPage, pageNames } = this.state;
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
				<div
					className='ctrl ctrl-left'
					onClick={() => {
						this.setState({ currentPage: this.state.currentPage - 1 });
					}}
				>
					<i className='fas fa-caret-left'></i>
					<span></span>
					<p>{pageNames[currentPage - 1]}</p>
				</div>
				<div
					className='ctrl ctrl-right'
					onClick={() => {
						this.setState({ currentPage: this.state.currentPage + 1 });
					}}
				>
					<i className='fas fa-caret-right'></i>
					<span></span>
					<p>{pageNames[currentPage + 1]}</p>
				</div>
			</div>
		);
	}
}
