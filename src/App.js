import React, { Component } from "react";
import "./App.scss";
import { TimelineMax, Power4 } from "gsap/all";
import axios from "axios";

import { ReactComponent as LandingCenter } from "./assets/Landing_main.svg";
import { ReactComponent as NightSwitch } from "./assets/Landing_nightswitch.svg";
import { ReactComponent as LandingCube } from "./assets/Landing_cube.svg";
import { ReactComponent as Ionic } from "./assets/ionic.svg";
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
			lang: localStorage.getItem("lang"),
			CL: {},
			EN: {
				name: "en",
				opposName: "hu",
				introText: ["innovativity", "creativity"],
				pageNames: ["contact", "work", "home", "about", "team"],
				work: {
					header: "The beginning",
					main:
						"In 2018, three high school students wanted to do more than what they did in the IT classes. They wanted to do breathtaking things. They soon found each other, and started working. It was the birth of these awesome works...",
					projects: []
				}
			},
			HU: {
				name: "hu",
				opposName: "en",
				introText: ["innovativitás", "kreativitás"],
				pageNames: ["kapcsolat", "munkáink", "kezdőlap", "rólunk", "csapatunk"],
				work: {
					header: "A kezdetek",
					main:
						"2018-ban, három középiskolás diák többet akart, mint amit az informatika órákon tanultak. Ők igazán nagyszerű dolgokat akartak csinálni. Hamar egymásra találtak, és el is kezdtek munkálkodni. Így születtek meg ezek a remek munkák...",
					projects: []
				}
			},
			currentPage: 2,
			paginationDots: newPagDots,
			isAutoNightActive:
				JSON.parse(localStorage.getItem("isAutoNightActive")) || false,
			isNight: null
		};
	}
	componentDidMount() {
		const { CL } = this.state;
		const tl = new TimelineMax();
		tl.to("#landing-center-text", 1, { text: CL.introText[0] }, "+=1");
		tl.to("#landing-center-text", 0.5, { text: "" }, "+=1");
		tl.to("#landing-center-text", 1, { text: CL.introText[1] }, "+=0.5");
		tl.to("#landing-center-text", 0.5, { text: "" }, "+=1");
		tl.to("#landing-center-text", 1, { text: "Jelszo Co." }, "+=0.5");
		tl.to("#playhead", 0.5, { opacity: 0, animation: "none" }, "+=0.5");
		tl.addLabel("svg");
		tl.to("#rect-landing", 0.2, { opacity: 1 });
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
			[
				".sm-wrapper",
				".lang-selector",
				".ctrl",
				".dots-wrapper",
				".night-selector"
			],
			0.5,
			{ opacity: 1 },
			"+=0.8"
		);
		tl.addLabel("end");
		// REMINDER: Move "end" label before array opacity toggle

		document.body.onkeyup = function(e) {
			if (e.keyCode === 32) {
				tl.currentLabel("end");
			}
		};

		// Set wCanvas width
		document.querySelector("#wCanvas").style.width =
			window.innerWidth * 0.8 + "px";
		document.querySelector("#wCanvas").style.height =
			400 + CL.work.projects.length * 500 + "px";

		// Hide pagination on scroll
		document.addEventListener("scroll", () => {
			console.log(window.pageYOffset);

			if (window.pageYOffset >= 10) {
				document.querySelector(".dots-wrapper").style.opacity = 0;
			} else {
				document.querySelector(".dots-wrapper").style.opacity = 1;
			}
		});
	}
	static getDerivedStateFromProps(props, state) {
		let newPagDots = state.paginationDots,
			tempLang;
		for (let i = 0; i < 5; i++) {
			if (i === state.currentPage) {
				newPagDots[i].current = true;
			} else {
				newPagDots[i].current = false;
			}
		}

		if (state.lang === "en") {
			tempLang = state.EN;
		} else if (state.lang === "hu") {
			tempLang = state.HU;
		} else {
			if (localStorage.getItem("lang") === null) {
				if (window.navigator.language.split("-")[0].toLowerCase() === "en") {
					console.log("Auto-parsed language EN");
					tempLang = state.EN;
					localStorage.setItem("lang", "en");
				} else {
					console.log("Auto-parsed language HU");
					tempLang = state.HU;
					localStorage.setItem("lang", "en");
				}
			}
		}

		if (state.currentPage === 1) {
			document.querySelector("html").style.overflowY = "scroll";
		} else {
			document.querySelector("html").style.overflowY = "hidden";
		}

		return {
			paginationDots: newPagDots,
			CL: tempLang
		};
	}
	changeLang = () => {
		if (this.state.lang === "en") {
			this.setState({ lang: "hu" });
			localStorage.setItem("lang", "hu");
		} else {
			this.setState({ lang: "en" });
			localStorage.setItem("lang", "en");
		}
	};
	setAutoNight = () => {
		this.setState({
			isAutoNightActive: !this.state.isAutoNightActive
		});
		if (this.state.isAutoNightActive === false) {
			this.setState({ isNight: false });
		}
		localStorage.setItem("isAutoNightActive", !this.state.isAutoNightActive);
	};
	render() {
		const { currentPage, CL } = this.state;
		if (this.state.isAutoNightActive === true) {
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
									console.log("day");
									if (this.state.isNight !== false) {
										this.setState({ isNight: false });
									}
								} else {
									console.log("night");
									if (this.state.isNight !== true) {
										this.setState({ isNight: true });
									}
								}
							});
					},
					() => {
						console.log("Location denied.");
						console.log(
							"Country Code: ",
							window.navigator.language.split("-")[1]
						);
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
										let sunriseMs = new Date(
											res.data.results.sunrise
										).getTime();
										let sunsetMs = new Date(res.data.results.sunset).getTime();
										if (sunriseMs < currentDate && sunsetMs > currentDate) {
											console.log("day");
											if (this.state.isNight !== false) {
												this.setState({ isNight: false });
											}
										} else {
											console.log("night");
											if (this.state.isNight !== true) {
												this.setState({ isNight: true });
											}
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
									console.log("day");
									if (this.state.isNight !== false) {
										this.setState({ isNight: false });
									}
								} else {
									console.log("night");
									if (this.state.isNight !== true) {
										this.setState({ isNight: true });
									}
								}
							});
					});
			}
		}
		const goto_work = () => {
			console.log("work");

			const tlW = new TimelineMax();
			tlW.to(
				"#rect-landing",
				0.5,
				{ opacity: 0, ease: Power4.easeInOut },
				"+=0.2"
			);
			tlW.to(
				[".sm-wrapper", ".lang-selector", ".night-selector"],
				0.5,
				{ opacity: 0 },
				"-=0.5"
			);
			tlW.to("#rect-main", 0.5, { opacity: 1 }, "-=0.5");
			tlW.call(() => {
				document.querySelector("#anim-circle").beginElement();
				document.querySelector("#fillW-circle").beginElement();
			});
			tlW.to("#landing-center-text", 0.5, { opacity: 0 }, "-=0");
			tlW.to("#rect-main", 1, {
				top: "65%",
				ease: Power4.easeInOut
			});
			tlW.to(
				"#rect-main-obj",
				1,
				{
					strokeWidth: 6,
					ease: Power4.easeInOut
				},
				"-=1"
			);
			tlW.to(".work__main-wrapper", 0.5, { opacity: 1 });
			tlW.to(
				"#ionic",
				0.9,
				{ opacity: 1, rotation: 360, ease: Power4.easeOut },
				"+=0"
			);
			tlW.to("#wCanvas", 0, { display: "block" });
			tlW.to("#wCanvas", 0.5, { opacity: 1 });
		};
		const goto_contact = () => {
			console.log("contact");
		};
		const nextPage = () => {
			if (currentPage !== 4) {
				this.setState({ currentPage: this.state.currentPage + 1 });
			}
		};
		const prevPage = () => {
			if (currentPage !== 0) {
				this.setState({ currentPage: this.state.currentPage - 1 });
				switch (currentPage) {
					case 1:
						goto_contact();
						break;
					case 2:
						goto_work();
						break;
				}
			}
		};
		return (
			<div className='App'>
				<LandingCube id='rect-main' />

				{/* Landing */}
				<div id='landing'>
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
						<h3>{CL.name}</h3>
						<h3>{CL.opposName}</h3>
					</div>
					<div className='night-selector' onClick={this.setAutoNight}>
						<NightSwitch
							className={`${
								this.state.isAutoNightActive
									? "nightswitch-colored"
									: "nightswitch-gray"
							}`}
						/>
					</div>
					<p
						className='nightswitch-tooltip'
						style={{
							color: `${this.state.isAutoNightActive ? "#bf0b6e" : "#000000"}`
						}}
					>
						Automatic night mode
					</p>
				</div>

				{/* Work */}
				<div id='work'>
					<div className='work__main-wrapper'>
						<h2>{CL.work.header}</h2>
						<p>{CL.work.main}</p>
					</div>
					<Ionic id='ionic' />
					<canvas id='wCanvas'></canvas>
				</div>

				{/* All pages */}
				<div className='ctrl ctrl-left' onClick={prevPage}>
					<i className='fas fa-caret-left'></i>
					<span></span>
					<p>{CL.pageNames[currentPage - 1]}</p>
				</div>
				<div className='ctrl ctrl-right' onClick={nextPage}>
					<i className='fas fa-caret-right'></i>
					<span></span>
					<p>{CL.pageNames[currentPage + 1]}</p>
				</div>
				<div className='dots-wrapper'>
					<div className='dot-hover-container'>
						{this.state.paginationDots.map((dot) => {
							if (dot.current === true) {
								return <span className='dot dot-active' key={dot.id}></span>;
							} else {
								return <span key={dot.id} className='dot'></span>;
							}
						})}
					</div>
					<div className='dots-flavor'>
						{this.state.paginationDots.map((dot) => {
							if (dot.current === true) {
								return (
									<React.Fragment key={dot.id}>
										<span
											id={`df${dot.id}`}
											className='dot-flavor dot-flavor-active'
										>
											{CL.pageNames[dot.id]}
										</span>
										<span
											id={`dfl${dot.id}`}
											className='dot-flavor-line'
										></span>
									</React.Fragment>
								);
							} else {
								return (
									<React.Fragment key={dot.id}>
										<span id={`df${dot.id}`} className='dot-flavor'>
											{CL.pageNames[dot.id]}
										</span>
										<span
											id={`dfl${dot.id}`}
											className='dot-flavor-line'
										></span>
									</React.Fragment>
								);
							}
						})}
					</div>
				</div>
			</div>
		);
	}
}
