import "./App.css";
import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";
import Rank from "./components/Rank";
import Clarifai from "clarifai";

const particlesParams = {
	particles: {
		number: {
			value: 50,
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
		};
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	onButtonSubmit = () => {
		this.setState({ imageURL: this.state.input });
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
			function (response) {
				console.log(
					response.outputs[0].data.regions[0].region_info.bounding_box
				);
			},
			function (err) {}
		);
	};

	render() {
		return (
			<div className="App">
				{/* <Particles className="particles" params={particlesParams} /> */}
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm
					onInputChange={this.onInputChange}
					onButtonSubmit={this.onButtonSubmit}
				/>
				<FaceRecognition imageURL={this.state.imageURL} />
			</div>
		);
	}
}

export default App;
