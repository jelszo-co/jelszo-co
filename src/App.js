import React, { Component } from "react";
import "./App.scss";
import { TimelineMax, Power4 } from "gsap/all";
import axios from "axios";

import { ReactComponent as LandingCenter } from "./assets/Landing_main.svg";
// import { ReactComponent as LandingCube } from "./assets/Landing_cube.svg";

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
			lang: "hu",
			CL: {},
			EN: {
				name: "en",
				opposName: "hu",
				introText: ["innovativity", "creativity"],
				pageNames: ["contact", "work", "home", "about", "team"]
			},
			HU: {
				name: "hu",
				opposName: "en",
				introText: ["innovativitás", "kreativitás"],
				pageNames: ["kapcsolat", "munkáink", "kezdőlap", "rólunk", "csapatunk"]
			},
			currentPage: 2,
			paginationDots: newPagDots,
			isAutoNightActive: false,
			isNight: null
		};
	}
	componentDidMount() {
		const { CL } = this.state;
		const tl = new TimelineMax();
		tl.to("#landing-center-text", 1, { text: CL.introText[0] }, "+=2");
		tl.to("#landing-center-text", 0.5, { text: "" }, "+=1.5");
		tl.to("#landing-center-text", 1, { text: CL.introText[1] }, "+=1");
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
		tl.to(".line-long", 0.2, { opacity: 1 });
		tl.to(
			".line-long",
			1.5,
			{
				strokeDasharray: "900 1000",
				ease: Power4.easeInOut
			},
			"-=0.2"
		);
		tl.addLabel("elements");
		tl.to(
			[".sm-wrapper", ".lang-selector", ".ctrl", ".dots-wrapper"],
			0.5,
			{ opacity: 1 },
			"+=0.8"
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
		let newPagDots = state.paginationDots,
			tempLang,
			tempIsNight;
		for (let i = 0; i < 5; i++) {
			if (i === state.currentPage) {
				newPagDots[i].current = true;
			} else {
				newPagDots[i].current = false;
			}
		}
		if (state.lang === "en") {
			tempLang = state.EN;
		} else {
			tempLang = state.HU;
		}
		if (state.isAutoNightActive) {
			let currentDate = new Date();
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						console.log("Location granted.");

						axios
							.get(
								`https://api.sunrise-sunset.org/json?lat=${position.coords.latitude}&lng=${position.coords.longitude}&formatted=0`
							)
							.then((res) => {
								let sunriseMs = new Date(res.data.results.sunrise).getTime();
								let sunsetMs = new Date(res.data.results.sunset).getTime();
								if (sunriseMs < currentDate && sunsetMs > currentDate) {
									return { IsNight: false };
								} else {
									return { IsNight: true };
								}
							});
					},
					() => {
						console.log("Location denied.");
						console.log("Country Code: ", window.navigator.language.split("-")[1]);
						axios
							.get(
								`http://api.worldbank.org/v2/country/${window.navigator.language
									.split("-")[1]
									.toLowerCase()}?format=json`
							)
							.then((res) => {
								axios
									.get(
										`https://api.sunrise-sunset.org/json?lat=${res.data[1][0].latitude}&lng=${res.data[1][0].longitude}&formatted=0`
									)
									.then((res) => {
										let sunriseMs = new Date(res.data.results.sunrise).getTime();
										let sunsetMs = new Date(res.data.results.sunset).getTime();
										if (sunriseMs < currentDate && sunsetMs > currentDate) {
											return { IsNight: false };
										} else {
											return { IsNight: true };
										}
									});
							});
					}
				);
			} else {
				console.log("Geolocation not available.");
				console.log("Country Code: ", window.navigator.language.split("-")[1]);

				axios
					.get(
						`http://api.worldbank.org/v2/country/${window.navigator.language
							.split("-")[1]
							.toLowerCase()}?format=json`
					)
					.then((res) => {
						axios
							.get(
								`https://api.sunrise-sunset.org/json?lat=${res.data[1][0].latitude}&lng=${res.data[1][0].longitude}&formatted=0`
							)
							.then((res) => {
								let sunriseMs = new Date(res.data.results.sunrise).getTime();
								let sunsetMs = new Date(res.data.results.sunset).getTime();
								if (sunriseMs < currentDate && sunsetMs > currentDate) {
									return { IsNight: false };
								} else {
									return { IsNight: true };
								}
							});
					});
			}
		}
		console.log(tempIsNight);

		return { ...state, paginationDots: newPagDots, CL: tempLang };
	}
	changeLang = () => {
		if (this.state.lang === "en") {
			this.setState({ lang: "hu" });
		} else {
			this.setState({ lang: "en" });
		}
	};
	render() {
		const { currentPage, CL } = this.state;
		return (
			<div className='App'>
				<LandingCenter />
				{/* <LandingCube /> */}
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
					<h3>{CL.name}</h3>
					<h3>{CL.opposName}</h3>
				</div>
				<div
					className='night-selector'
					onClick={() => {
						this.setState({ isAutoNightActive: !this.state.isAutoNightActive });
					}}
				>
					<button>Toggle Auto night mode</button>
				</div>
				<div
					className='ctrl ctrl-left'
					onClick={() => {
						this.setState({ currentPage: this.state.currentPage - 1 });
					}}
				>
					<i className='fas fa-caret-left'></i>
					<span></span>
					<p>{CL.pageNames[currentPage - 1]}</p>
				</div>
				<div
					className='ctrl ctrl-right'
					onClick={() => {
						this.setState({ currentPage: this.state.currentPage + 1 });
					}}
				>
					<i className='fas fa-caret-right'></i>
					<span></span>
					<p>{CL.pageNames[currentPage + 1]}</p>
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
