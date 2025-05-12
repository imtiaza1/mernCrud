import React from "react";
import User from "./page/User";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<div>
			<ToastContainer />
			<User />
		</div>
	);
};

export default App;
