import Home from "./routes/home/home.component.jsx";
import { Route, Routes } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component.jsx";
import SignIn from "./routes/sign-in/sign-in.component.jsx";

const Shop = () => {
	return <h1> I am the shop page </h1>;
};
const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />}></Route>
				<Route path='shop' element={<Shop />}></Route>
				<Route path='sign-in' element={<SignIn />}></Route>
			</Route>
		</Routes>
	);
};

export default App;

// Navigation Bar Added, HomePage Added, Shop Inititalized
