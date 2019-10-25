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
			lang: localStorage.getItem("lang") || "hu",
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
					projects: [
						{
							title: "Pakura E-Sport",
							p_url: "./assets/projects/pakura.png",
							link: "https://pakura.jelszo.co",
							result: "II. place",
							year: "2018.",
							text:
								"A website for a competetion organized by the Nyíregyházi Széchenyi István Secondary School about an imaginary e-sports team."
						},

						{
							title: "II. Innovation Marathon",
							p_url: "./assets/projects/pakura.png",
							link: "http://bit.ly/laduer",
							result: "III. place",
							year: "2019.",
							text:
								"Our project for the II. Innovation Marathon organized by Lauder Javne Secondary School."
						},

						{
							title: "KFG short movie",
							p_url: "./assets/projects/kfg.png",
							link: "http://bit.ly/kfgfilm",
							result: "",
							year: "2019.",
							text:
								"A short, promotional movie for the Nyíregyházi Kölcsey Ferenc Secondary School."
						},

						{
							title: "Playlist webpage",
							p_url: "./assets/projects/playlist.png",
							link: "https://playlist.jelszo.co",
							result: "",
							year: "2019.",
							text:
								"A webpage for the Nyíregyházi Kölcsey Ferenc Secondary School's studio, where the students can request their favourite songs."
						}
					]
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
					projects: [
						{
							title: "Pakura E-Sport",
							p_url: "./assets/projects/pakura.png",
							result: "II. helyezés",
							year: "2018.",
							text:
								"A Nyíregyházi Széchenyi István Szakgimnázium által meghirdetett webfejlesztő versenyre készített, elképzelt e-sport csapat weboldala."
						},

						{
							title: "II. Innovációs Maraton",
							p_url: "./assets/projects/pakura.png",
							result: "III. helyezés",
							year: "2019.",
							text:
								"A Lauder Javne Gimnázium által szervezett Innovációs Maratonra készített bemutatkozó kisfilmünk, valamint az ott elkészült munkánk."
						},

						{
							title: "KFG Pornóvideó",
							p_url: "./assets/projects/kfg.png",
							link: "http://bit.ly/kfgfilm",
							result: "",
							year: "2019.",
							text: "A Nyíregyházi Kölcsey Ferenc Gimnáziumnak készített népszerűsítő kisfilm."
						},

						{
							title: "Playlist weboldal",
							p_url: "./assets/projects/playlist.png",
							link: "https://playlist.jelszo.co",
							result: "",
							year: "2019.",
							text:
								"A Nyíregyházi Kölcsey Ferenc Gimnázium stúdiósainak készített weboldal. ahová a diákok a saját kedvenc zenéiket küldhetik be."
						}
					]
				}
			},
			currentPage: 2,
			paginationDots: newPagDots,
			isAutoNightActive: JSON.parse(localStorage.getItem("isAutoNightActive")) || false,
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
			[".sm-wrapper", ".lang-selector", ".ctrl", ".dots-wrapper", ".night-selector"],
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
		document.querySelector("#wCanvas").width = window.innerWidth;
		document.querySelector("#wCanvas").height = 400 + CL.work.projects.length * 500;

		// Hide pagination on scroll
		document.addEventListener("scroll", () => {
			if (window.pageYOffset >= 10) {
				document.querySelector(".dots-wrapper").style.opacity = 0;
				document.getElementsByClassName("ctrl")[0].style.opacity = 0;
				document.getElementsByClassName("ctrl")[1].style.opacity = 0;
			} else {
				document.querySelector(".dots-wrapper").style.opacity = 1;
				document.getElementsByClassName("ctrl")[0].style.opacity = 1;
				document.getElementsByClassName("ctrl")[1].style.opacity = 1;
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
		}
		if (state.currentPage === 1) {
			window.scrollTo(0, 0);
			document.querySelector("html").style.overflowY = "scroll";
		} else {
			// TODO: change to hidden
			document.querySelector("html").style.overflowY = "scroll";
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
		const toRad = (deg) => {
			return deg * (Math.PI / 180);
		};
		const goto_work = () => {
			console.log("work");
			const canvas = document.getElementById("wCanvas");
			const ctx = canvas.getContext("2d");
			const tlW = new TimelineMax();
			tlW.to("#rect-landing", 0.5, { opacity: 0, ease: Power4.easeInOut }, "+=0.2");
			tlW.to([".sm-wrapper", ".lang-selector", ".night-selector"], 0.5, { opacity: 0 }, "-=0.5");
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
			tlW.to("#ionic", 0.9, { opacity: 1, rotation: 360, ease: Power4.easeOut }, "+=0");
			tlW.to("#wCanvas", 0, { display: "block" });
			tlW.to("#wCanvas", 0.5, { opacity: 1 });
			const cWidth = canvas.width;
			const cHeight = canvas.height;
			console.log(cWidth, cHeight);

			// Main line
			ctx.beginPath();
			ctx.moveTo(cWidth / 2, 0);
			ctx.lineTo(cWidth / 2, 200);
			ctx.moveTo(cWidth / 2 + 100, 300);
			ctx.arc(cWidth / 2 + 100, 200, 100, toRad(90), toRad(180), false);
			for (let i = 0; i < CL.work.projects.length; i++) {
				console.log(CL.work.projects[i]);
				let multiplier = i * 500,
					cf,
					cfd1,
					cfd3,
					df;
				if (i % 2 === 1) {
					cf = -1;
					df = -2;
					cfd1 = -180;
					cfd3 = true;
				} else {
					cf = 1;
					df = 0;
					cfd1 = 0;
					cfd3 = false;
				}
				ctx.moveTo(cWidth / 2 + 100 * cf, 300 + multiplier);
				ctx.lineTo((cWidth / 4) * (3 + df), 300 + multiplier);
				ctx.arc((cWidth / 4) * (3 + df), 400 + multiplier, 100, toRad(-90), toRad(0 + cfd1), cfd3);
				ctx.lineTo((cWidth / 4) * (3 + df) + 100 * cf, 700 + multiplier);
				ctx.arc((cWidth / 4) * (3 + df), 700 + multiplier, 100, toRad(0 + cfd1), toRad(90), cfd3);
				if (i === CL.work.projects.length - 1) {
					ctx.lineTo((cWidth / 4) * 2 + 100 * cf, 800 + multiplier);
				} else {
					ctx.lineTo((cWidth / 4) * 2 + 100 * cf * -1, 800 + multiplier);
				}
			}
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = 3;
			ctx.setLineDash([30, 10]);
			ctx.stroke();
			let scf, scf2;
			for (let i = 0; i < CL.work.projects.length; i++) {
				let multiplier = i * 500;
				if (i % 2 === 1) {
					scf = -2;
					scf2 = -100;
				} else {
					scf = 0;
					scf2 = 100;
				}
				ctx.beginPath();
				ctx.setLineDash([]);
				ctx.arc(
					(cWidth / 4) * (3 + scf) + scf2,
					550 + multiplier,
					100,
					toRad(0),
					toRad(360),
					false
				);
				ctx.strokeStyle = "#000000";
				ctx.fillStyle = "#fff";
				ctx.lineWidth = 6;
				ctx.fill();
				ctx.stroke();
			}
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
								this.state.isAutoNightActive ? "nightswitch-colored" : "nightswitch-gray"
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
										<span id={`df${dot.id}`} className='dot-flavor dot-flavor-active'>
											{CL.pageNames[dot.id]}
										</span>
										<span id={`dfl${dot.id}`} className='dot-flavor-line'></span>
									</React.Fragment>
								);
							} else {
								return (
									<React.Fragment key={dot.id}>
										<span id={`df${dot.id}`} className='dot-flavor'>
											{CL.pageNames[dot.id]}
										</span>
										<span id={`dfl${dot.id}`} className='dot-flavor-line'></span>
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
