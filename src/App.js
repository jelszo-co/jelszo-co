import React, { Component } from "react";
import "./App.scss";
import { TimelineMax, Power4 } from "gsap/all";

import { ReactComponent as LandingCenter } from "./assets/Landing_main.svg";

export default class App extends Component {
	constructor(props) {
		super(props);
		let newPagDots = [];
		for (let i = 0; i < 5; i++) {
			newPagDots[i] = {
				id: i,
				current: false
			};
		}
		this.state = {
			lang: "en",
			currentPage: 2,
			pageNames: ["contact", "work", "home", "about", "team"],
			paginationDots: newPagDots
		};
	}
	componentDidMount() {
		const tl = new TimelineMax();
		tl.to("#landing-center-text", 1, { text: "innovativity" }, "+=2");
		tl.to("#landing-center-text", 0.5, { text: "" }, "+=1.5");
		tl.to("#landing-center-text", 1, { text: "creativity" }, "+=1");
		tl.to("#landing-center-text", 0.5, { text: "" }, "+=1.5");
		tl.to("#landing-center-text", 1, { text: "Jelszo Co." }, "+=1");
		tl.to("#playhead", 0.5, { opacity: 0, animation: "none" }, "+=1");
		tl.addLabel("svg");
		tl.to("#rect-main", 0.2, { opacity: 1 });
		tl.to(
			".line-short",
			1.5,
			{
				strokeDasharray: "238 1000",
				ease: Power4.easeInOut
			},
			"-=0.2"
		);
		tl.to(".line-long", 0.1, { opacity: 1 });
		tl.to(
			".line-long",
			1.5,
			{
				strokeDasharray: "900 1000",
				ease: Power4.easeInOut
			},
			"-=0.1"
		);
		tl.addLabel("elements");
		tl.to(
			[".sm-wrapper", ".lang-selector", ".ctrl", ".dots-wrapper"],
			0.5,
			{ opacity: 1 },
			"+=1"
		);
		tl.addLabel("end");
		// REMINDER: Move "end" label before array opacity toggle

		document.body.onkeyup = function(e) {
			if (e.keyCode === 32) {
				tl.currentLabel("elements");
			}
		};
	}
	static getDerivedStateFromProps(props, state) {
		let newPagDots = state.paginationDots;
		for (let i = 0; i < 5; i++) {
			if (i === state.currentPage) {
				newPagDots[i].current = true;
			} else {
				newPagDots[i].current = false;
			}
		}
		return { ...state, paginationDots: newPagDots };
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
				<LandingCenter />
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
					<i
						className='fab fa-instagram'
						onClick={() => {
							window.location.href = "https://instagram.com/jelszoco";
						}}
					></i>
					<i
						className='fab fa-github'
						onClick={() => {
							window.location.href = "https://github.com/jelszo-co";
						}}
					></i>
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
				<div className='dots-wrapper'>
					{this.state.paginationDots.map((dot) => {
						if (dot.current === true) {
							return <span className='dot dot-active' key={dot.id}></span>;
						} else {
							return (
								<span
									key={dot.id}
									className='dot'
									onClick={() => {
										this.setState({ currentPage: dot.id });
									}}
								></span>
							);
						}
					})}
				</div>
			</div>
		);
	}
}
