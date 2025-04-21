import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import Model from "./components/Model";
import Result from "./components/Result";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/model" element={<Model />} />
				<Route path="/result" element={<Result />} />
			</Routes>
		</Router>
	);
}

export default App;
