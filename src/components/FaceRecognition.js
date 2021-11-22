import React from "react";

const FaceRecognition = ({ imageURL }) => {
	return (
		<div className="center ma">
			<div className=" mt2">
				<img alt="detect" width="500px" height="auto" src={imageURL} />
			</div>
		</div>
	);
};
export default FaceRecognition;
