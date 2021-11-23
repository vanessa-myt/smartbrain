import "./App.css";
import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";
import Rank from "./components/Rank";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Clarifai from "clarifai";

const particlesParams = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 800,
			},
		},
	},
};

const app = new Clarifai.App({
	apiKey: "7072e617f15749498f53e1997d308c17",
});

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: "",
			imageURL: "",
			box: {},
			route: "signin",
			isSignedIn: false,
		};
	}

	onRouteChange = (route) => {
		if (route === "signout") {
			this.setState({ isSignedIn: false });
		} else if (route === "home") {
			this.setState({ isSignedIn: true });
		}

		this.setState({ route: route });
	};

	calculateFaceLocation = (data) => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputimg");
		const height = Number(image.height);
		const width = Number(image.width);
		console.log(width, height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	displayFaceBox = (box) => {
		console.log(box);
		this.setState({ box: box });
	};

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	onButtonSubmit = () => {
		this.setState({ imageURL: this.state.input });
		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then((response) =>
				this.displayFaceBox(this.calculateFaceLocation(response))
			)
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<div className="App">
				<Particles className="particles" params={particlesParams} />
				<Navigation
					isSignedIn={this.state.isSignedIn}
					onRouteChange={this.onRouteChange}
				/>
				<Logo />
				{this.state.route === "home" ? (
					<div>
						{/* <Logo /> */}
						<Rank />
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onButtonSubmit={this.onButtonSubmit}
						/>
						<FaceRecognition
							box={this.state.box}
							imageURL={this.state.imageURL}
						/>
					</div>
				) : this.state.route === "signin" ? (
					<SignIn onRouteChange={this.onRouteChange} />
				) : (
					<Register onRouteChange={this.onRouteChange} />
				)}
			</div>
		);
	}
}

export default App;
