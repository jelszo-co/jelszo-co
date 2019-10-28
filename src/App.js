import React, { Component } from "react";
import "./App.scss";
import { TimelineMax, Power4 } from "gsap/all";
import axios from "axios";

import { ReactComponent as LandingCenter } from "./assets/Landing_main.svg";
import { ReactComponent as NightSwitch } from "./assets/Nightswitch.svg";
import { ReactComponent as LandingCube } from "./assets/Landing_cube.svg";
import { ReactComponent as Ionic } from "./assets/Bulb.svg";
import { ReactComponent as Inf } from "./assets/Infinite.svg";

import { ReactComponent as Mail } from "./assets/social/email.svg";
import { ReactComponent as Github } from "./assets/social/github.svg";
import { ReactComponent as Ig } from "./assets/social/ig.svg";
import { ReactComponent as Ms } from "./assets/social/ms.svg";

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
		// TODO: find out more
		// document.addEventListener("resize", () => {
		// 	this.forceUpdate();
		// });
		this.state = {
			lang: localStorage.getItem("lang") || "hu",
			tl: new TimelineMax(),
			CL: {},
			EN: {
				name: "en",
				opposName: "hu",
				introText: ["innovativity", "creativity"],
				pageNames: ["contact", "work", "home", "about", "team"],
				work: {
					header: "The beginning",
					main:
						"In 2018, three high school students wanted to do more than what they did in the IT classes. They wanted to do breathtaking things. They soon found each other, and started working. It was the birth of these awesome works.",
					endtitle: "The future",
					endtext:
						"What comes with the future? No one knows. But we know one thig for sure: we love what we do, and we won't stop.",
					toTop: "Back to top",
					projects: [
						{
							title: "Pakura E-Sports",
							p_url: "./projects/pakura.png",
							link: "https://pakura.jelszo.co",
							result: "II. place",
							year: "2019.04.",
							text:
								"A website for a competition, organized by the Nyíregyházi Széchenyi István Secondary School, about an imaginary e-sports team."
						},

						{
							title: "II. Lauder Innovation Marathon",
							p_url: "./projects/lauder.jpg",
							link: "http://bit.ly/laduer",
							result: "III. place",
							year: "2019.05.",
							text:
								"Our project for the II. Lauder Innovation Marathon organized by Lauder Javne Secondary School."
						},

						{
							title: "KFG short movie",
							p_url: "./projects/kfg.png",
							link: "http://bit.ly/kfgfilm",
							year: "2019.06.",
							text:
								"A short, promotional movie for the Nyíregyházi Kölcsey Ferenc Secondary School."
						},

						{
							title: "Playlist",
							p_url: "./projects/playlist.png",
							link: "https://playlist.jelszo.co",
							year: "2019.09.",
							text:
								"A webpage for the Nyíregyházi Kölcsey Ferenc Secondary School's radio, where the students can request their favourite songs to be played in the radio."
						}
					]
				},
				contact: {
					contactHeader: "Contact us",
					profiles: [
						"support@jelszo.co",
						"@jelszoco",
						"jelszo-co",
						"Jelszo co"
					],
					profileFlavors: [
						"Write email",
						"Visit profile",
						"Visit Github",
						"Write message"
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
						"2018-ban, három középiskolás diák többet akart, mint amit az informatika órákon tanultak. Ők igazán nagyszerű dolgokat akartak csinálni. Hamar egymásra is találtak, és el is kezdtek munkálkodni. Így születtek meg ezek a remek munkák.",
					endtitle: "A jövő",
					toTop: "Vissza a tetejére",
					endtext:
						"Vajon mit hoz a jövő? Senki sem tudja. De egy dolog biztos: szeretjük amit csinálunk, és semmi sem állíthat meg minket.",
					projects: [
						{
							title: "Pakura E-Sports",
							p_url: "./projects/pakura.png",
							result: "II. helyezés",
							year: "2019.04",
							text:
								"A Nyíregyházi Széchenyi István Szakgimnázium által meghirdetett webfejlesztő versenyre készített, egy képzeletbeli e-sport csapat weboldala."
						},

						{
							title: "II. Innovációs Maraton",
							p_url: "./projects/lauder.jpg",
							result: "III. helyezés",
							year: "2019.05",
							text:
								"A Lauder Javne Iskola által szervezett Innovációs Maratonra készített bemutatkozó kisfilmünk, valamint az ott elkészült munkánk."
						},

						{
							title: "KFG Promóvideó",
							p_url: "./projects/kfg.png",
							link: "http://bit.ly/kfgfilm",
							year: "2019.06",
							text:
								"A Nyíregyházi Kölcsey Ferenc Gimnáziumnak készített promocionális rövidfilm."
						},

						{
							title: "Playlist weboldal",
							p_url: "./projects/playlist.png",
							link: "https://playlist.jelszo.co",
							year: "2019.09",
							text:
								"A Nyíregyházi Kölcsey Ferenc Gimnázium stúdiósainak készített weboldal, ahová a diákok a saját kedvenc zenéiket küldhetik be."
						}
					]
				},
				contact: {
					contactHeader: "Kapcsolat",
					profiles: [
						"support@jelszo.co",
						"@jelszoco",
						"jelszo-co",
						"Jelszo co"
					],
					profileFlavors: ["Email írása", "Profil", "GitHub", "Üzenet"]
				}
			},
			currentPage: 2,
			paginationDots: newPagDots,
			isAutoNightActive:
				JSON.parse(localStorage.getItem("isAutoNightActive")) || false,
			isNight: null,
			scrollTopIndicator: false
		};
	}
	componentDidMount() {
		const { CL, tl } = this.state;
		tl.to("#landing-center-text", 1, { text: CL.introText[0] }, "+=1");
		tl.to("#landing-center-text", 0.5, { text: "" }, "+=1");
		tl.to("#landing-center-text", 1, { text: CL.introText[1] }, "+=0.5");
		tl.to("#landing-center-text", 0.5, { text: "" }, "+=1");
		tl.to("#landing-center-text", 1, { text: "Jelszo Co." }, "+=0.5");
		tl.to("#playhead", 0.5, { opacity: 0, animation: "none" }, "+=0.5");
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
			[".sm-wrapper", ".br-menu", ".ctrl", ".dots-wrapper"],
			0.5,
			{ opacity: 1 },
			"+=0.2"
		);
		tl.addLabel("end");
		// TODO: remove animation if user have seen it
		// REMINDER: Move "end" label before array opacity toggle

		document.body.onkeyup = function(e) {
			if (e.keyCode === 32) {
				// tl.currentLabel("elements");
				tl.currentLabel("end");
			}
		};

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
		// set wCanvas width
		document.querySelector("#wCanvas").width = window.innerWidth;
		document.querySelector("#wCanvas").height =
			800 + CL.work.projects.length * 500;
		// Set Inf height
		document.querySelector("#inf").style.top =
			CL.work.projects.length * 500 + window.innerHeight * 0.65 + 590 + "px";
		document.querySelector("#work__end-wrapper").style.top =
			CL.work.projects.length * 500 + window.innerHeight * 0.65 + 740 + "px";
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
			document.querySelector("html").style.overflowY = "scroll";
		} else {
			// TODO: change to hidden
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
		const toRad = (deg) => {
			return deg * (Math.PI / 180);
		};
		const goto_contact = () => {
			const { CL, tl } = this.state;
			tl.currentLabel("end_work");
			tl.to("#wCanvas", 0.5, { opacity: 0 });
			tl.to("#wCanvas", 0, { display: "none" });
			tl.to(".dots-wrapper", 0, { display: "block" }, "-=1");
			tl.to(".dots-wrapper", 0.5, { opacity: 1 }, "-=0");
			tl.to(".work__main-wrapper", 0.3, { opacity: 0 }, "-=0.2");
			tl.to("#ionic", 0.5, { opacity: 0, ease: Power4.easeOut }, "+=0");
			tl.to(
				"#rect-main-obj",
				1,
				{
					strokeWidth: 3,
					ease: Power4.easeInOut
				},
				"-=0.5"
			);
			tl.call(
				() => {
					document.querySelector("#anim-W-rect").beginElement();
					document.querySelector("#fill-W-rect").beginElement();
				},
				null,
				null,
				"-=0.5"
			);
			tl.to("#contact-header", 1, { text: CL.contact.contactHeader }, "+=0");
			tl.to("#rect-main", 1, { top: "22%", ease: Power4.easeInOut }, "+=0.2");
			// DECIDE: together / 2ms delay
			tl.to(
				"#contact-header",
				1,
				{ top: "22%", ease: Power4.easeInOut },
				"-=0.98"
			);
			tl.to(".ct-list-item", 0, { display: "block" }, "-=1");
			tl.staggerFromTo(
				".ct-list-item",
				0.8,
				{ opacity: 0 },
				{ opacity: 1 },
				-0.1,
				"-=0.6"
			);
			tl.addLabel("end_contact");
		};
		const goto_work = (from) => {
			if (from === "right") {
				const canvas = document.getElementById("wCanvas");
				const ctx = canvas.getContext("2d");
				const { CL, tl } = this.state;
				tl.currentLabel("end");
				tl.to(
					"#rect-landing",
					0.5,
					{ opacity: 0, ease: Power4.easeInOut },
					"+=0.2"
				);
				tl.to([".sm-wrapper", ".br-menu"], 0.5, { opacity: 0 }, "-=0.5");
				tl.to("#rect-main", 0.5, { opacity: 1 }, "-=0.5");
				tl.call(() => {
					document.querySelector("#anim-W-circle").beginElement();
					document.querySelector("#fill-W-circle").beginElement();
				});
				tl.to("#landing-center-text", 0.5, { opacity: 0 }, "-=0");
				tl.to("#rect-main", 1, {
					top: "65%",
					ease: Power4.easeInOut
				});
				tl.to(
					"#rect-main-obj",
					1,
					{
						strokeWidth: 6,
						ease: Power4.easeInOut
					},
					"-=1"
				);
				tl.to(".work__main-wrapper", 0.5, { opacity: 1 });
				tl.to("#ionic", 0.5, { opacity: 1, ease: Power4.easeOut }, "+=0");
				tl.to(".dots-wrapper", 0.5, { opacity: 0 }, "-=0.8");
				tl.to(".dots-wrapper", 0, { display: "none" });
				tl.to("#wCanvas", 0, { display: "block" }, "-=0.5");
				tl.to("#wCanvas", 0.5, { opacity: 1 });
				tl.addLabel("end_work");
				const cWidth = canvas.width;

				// Main line
				ctx.beginPath();
				ctx.moveTo(cWidth / 2, 0);
				ctx.lineTo(cWidth / 2, 200);
				ctx.moveTo(cWidth / 2 + 100, 300);
				ctx.arc(cWidth / 2 + 100, 200, 100, toRad(90), toRad(180), false);
				for (let i = 0; i < CL.work.projects.length; i++) {
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
					ctx.arc(
						(cWidth / 4) * (3 + df),
						400 + multiplier,
						100,
						toRad(-90),
						toRad(0 + cfd1),
						cfd3
					);
					ctx.lineTo((cWidth / 4) * (3 + df) + 100 * cf, 700 + multiplier);
					ctx.arc(
						(cWidth / 4) * (3 + df),
						700 + multiplier,
						100,
						toRad(0 + cfd1),
						toRad(90),
						cfd3
					);
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

				// Circles
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

				// Tailing line and circle
				ctx.beginPath();
				if (CL.work.projects.length % 2 === 0) {
					// even
					ctx.arc(
						(cWidth / 4) * 2 - 100,
						400 + CL.work.projects.length * 500,
						100,
						toRad(-90),
						toRad(0),
						false
					);
				} else {
					// odd
					ctx.arc(
						(cWidth / 4) * 2 + 100,
						400 + CL.work.projects.length * 500,
						100,
						toRad(-90),
						toRad(-180),
						true
					);
				}
				ctx.lineTo((cWidth / 4) * 2, 600 + CL.work.projects.length * 500);
				ctx.strokeStyle = "#000000";
				ctx.lineWidth = 3;
				ctx.setLineDash([30, 10]);
				ctx.stroke();

				ctx.beginPath();
				ctx.arc(
					(cWidth / 4) * 2,
					600 + CL.work.projects.length * 500,
					100,
					toRad(0),
					toRad(360),
					false
				);
				ctx.strokeStyle = "#000000";
				ctx.fillStyle = "#fff";
				ctx.lineWidth = 6;
				ctx.setLineDash([]);
				ctx.fill();
				ctx.stroke();

				document.addEventListener("scroll", () => {
					if (
						window.innerHeight + window.scrollY >=
						document.querySelector("#wCanvas").height + window.innerHeight * 0.9
					) {
						this.setState({ scrollTopIndicator: true });
					} else {
						this.setState({ scrollTopIndicator: false });
					}
				});
			}
		};
		const goto_landing = (from) => {
			if (from === "right") {
			} else if (from === "left") {
				const { tl } = this.state;
				tl.currentLabel("end_work");
				tl.to("#wCanvas", 0.5, { opacity: 0 });
				tl.to("#wCanvas", 0, { display: "none" });
				tl.to(".dots-wrapper", 0, { display: "block" }, "-=1");
				tl.to(".dots-wrapper", 0.5, { opacity: 1 }, "-=0");
				tl.to(".work__main-wrapper", 0.3, { opacity: 0 }, "-=0.2");
				tl.to("#ionic", 0.5, { opacity: 0, ease: Power4.easeOut }, "+=0");
				tl.to(
					"#rect-main-obj",
					1,
					{
						strokeWidth: 3,
						ease: Power4.easeInOut
					},
					"-=0.5"
				);
				tl.to(
					"#rect-main",
					1,
					{
						top: "48%",
						ease: Power4.easeInOut
					},
					"-=1"
				);
				tl.call(
					() => {
						document.querySelector("#anim-W-rect").beginElement();
						document.querySelector("#fill-W-rect").beginElement();
					},
					null,
					null,
					"-=0.5"
				);
				tl.to("#landing-center-text", 0.5, { opacity: 1 }, "+=0");
				tl.to("#rect-main", 0.5, { opacity: 0 }, "-=0.5");
				tl.to(
					"#rect-landing",
					0.5,
					{ opacity: 1, ease: Power4.easeInOut },
					"-=0.5"
				);
				tl.to([".sm-wrapper", ".br-menu"], 0.5, { opacity: 1 }, "+=0.2");
				tl.addLabel("end_landing");
			}
		};
		const goto_about = (from) => {};
		const goto_team = () => {};
		const navigate = (dir) => {
			console.group("Navigator");
			console.log("to:", dir);
			console.log("from:", this.state.CL.pageNames[currentPage]);
			if (dir === "left") {
				if (currentPage !== 0) {
					this.setState({ currentPage: this.state.currentPage - 1 });
					switch (currentPage) {
						case 1:
							console.log("dest: contact");
							goto_contact();
							break;
						case 2:
							console.log("dest: work");
							goto_work("right");
							break;
						case 3:
							console.log("dest: landing");
							goto_landing("right");
							break;
						case 4:
							console.log("dest: about");
							goto_about("right");
							break;
					}
				}
			} else if (dir === "right") {
				if (currentPage !== 4) {
					this.setState({ currentPage: this.state.currentPage + 1 });
					switch (currentPage) {
						case 0:
							console.log("dest: work");
							goto_work("left");
							break;
						case 1:
							console.log("dest: landing");
							goto_landing("left");
							break;
						case 2:
							console.log("dest: about");
							goto_about("left");
							break;
						case 3:
							console.log("dest: team");
							goto_team("left");
							break;
					}
				}
			}
			console.groupEnd();
		};

		const tlCt = new TimelineMax();
		const onCtHover = (n) => {
			console.log("Hovered", n);

			tlCt.to(`.ct-playhead-${n}`, 0.6, {
				width: "100%",
				ease: Power4.easeInOut
			});
			tlCt.to(`.ct-text-${n}`, 0, { opacity: 0 });
			tlCt.to(
				`.ct-playhead-${n}`,
				0.6,
				{
					left: "111%",
					width: 0,
					ease: Power4.easeInOut
				},
				"-=0.1"
			);
			tlCt.to(
				`.ct-hover-${n}`,
				0.6,
				{ width: "100%", ease: Power4.easeInOut },
				"-=0.6"
			);
			tlCt.to(`.ct-playhead-${n}`, 0, {
				left: "20px",
				ease: Power4.easeInOut
			});
		};
		const onCtLeave = () => {
			console.log("Left areas");
			tlCt.kill();
			// DECIDE: kill VS clear
			// tlCt.to(".ct-playhead", 0.4, { width: 0, ease: Power4.easeInOut });
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
					<div className='br-menu'>
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
							Automatic night mode{" "}
							<i
								className={`fas fa-check-circle`}
								style={{ opacity: this.state.isAutoNightActive ? 1 : 0 }}
							></i>
						</p>
					</div>
				</div>

				{/* Work */}
				<div id='work'>
					<div className='work__main-wrapper'>
						<h2>{CL.work.header}</h2>
						<p>{CL.work.main}</p>
					</div>
					<Ionic id='ionic' />
					<Inf id='inf' />
					<canvas id='wCanvas'></canvas>
					{CL.work.projects.map((pr) => {
						let styleCard,
							ta = {
								textAlign:
									CL.work.projects.indexOf(pr) % 2 === 0 ? "right" : "left"
							};
						if (CL.work.projects.indexOf(pr) % 2 === 0) {
							styleCard = {
								// jobb
								top:
									window.innerHeight * 0.65 +
									CL.work.projects.indexOf(pr) * 500 +
									538 +
									"px",
								right: window.innerWidth / 4 - 212 + "px"
							};
						} else {
							styleCard = {
								// bal
								top:
									window.innerHeight * 0.65 +
									CL.work.projects.indexOf(pr) * 500 +
									538 +
									"px",
								left: window.innerWidth / 4 - 212 + "px"
							};
						}
						return (
							<div key={pr.title} className='pr-card' style={styleCard}>
								<h4
									style={{
										left: CL.work.projects.indexOf(pr) % 2 === 0 ? "" : "100px",
										right:
											CL.work.projects.indexOf(pr) % 2 === 0 ? "100px" : "",
										transform:
											CL.work.projects.indexOf(pr) % 2 === 0
												? "translate(50%, -50%)"
												: "translate(-50%, -50%)"
									}}
								>
									{pr.year}
								</h4>
								<div
									className='content-wrapper'
									style={{
										left: CL.work.projects.indexOf(pr) % 2 === 0 ? "" : "250px",
										right: CL.work.projects.indexOf(pr) % 2 === 0 ? "250px" : ""
									}}
								>
									<img
										src={pr.p_url}
										alt={pr.title}
										style={{
											float:
												CL.work.projects.indexOf(pr) % 2 === 0
													? "right"
													: "left"
										}}
									/>
									<div className='text-wrapper'>
										<h3 style={ta}>{pr.title}</h3>
										{pr.result ? <h5 style={ta}>{pr.result}</h5> : ""}
										<p style={ta}>{pr.text}</p>
										<p
											className='pr__link'
											style={ta}
											onClick={() => {
												window.location.href = pr.link;
											}}
										>
											[Link]
										</p>
									</div>
								</div>
							</div>
						);
					})}
					<div id='work__end-wrapper'>
						<h2>{CL.work.endtitle}</h2>
						<p>{CL.work.endtext}</p>
					</div>
					<div
						id='scroller'
						style={{
							transform:
								this.state.scrollTopIndicator === true
									? "translate(-50%, -100%)"
									: "translate(-50%, 100%)"
						}}
						onClick={() => {
							window.scrollTo(0, 0);
						}}
					>
						<i className='fas fa-chevron-up'></i> {CL.work.toTop}
					</div>
				</div>

				{/* Contact */}
				<div id='contact'>
					<h2 id='contact-header'> </h2>
					<ul>
						{CL.contact.profiles.map((li) => {
							let icon = null;
							let i = CL.contact.profiles.indexOf(li);
							switch (i) {
								case 0:
									icon = <Mail className='ct-icon ct-mail' />;
									break;
								case 1:
									icon = <Ig className='ct-icon ct-ig' />;
									break;
								case 2:
									icon = <Github className='ct-icon ct-github' />;
									break;
								case 3:
									icon = <Ms className='ct-icon ct-ms' />;
									break;
								default:
									icon = null;
							}
							return (
								<li key={i} className='ct-list-item'>
									<span className='ct-circle'></span>
									{icon}
									<p
										onMouseEnter={() => {
											onCtHover(i);
										}}
										onMouseLeave={() => {
											onCtLeave();
										}}
										className={`ct-text-${i}`}
									>
										{CL.contact.profiles[i]}
									</p>
									<span className={`ct-playhead ct-playhead-${i}`}></span>
									<p className={`ct-hover ct-hover-${i}`}>
										{CL.contact.profileFlavors[i]}
									</p>
								</li>
							);
						})}
					</ul>
				</div>

				{/* All pages */}
				<div
					className='ctrl ctrl-left'
					onClick={() => {
						navigate("left");
					}}
				>
					<i className='fas fa-caret-left'></i>
					<span></span>
					<p>{CL.pageNames[currentPage - 1]}</p>
				</div>
				<div
					className='ctrl ctrl-right'
					onClick={() => {
						navigate("right");
					}}
				>
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
