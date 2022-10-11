import { Navigate, Route, Routes } from "react-router-dom";
import { useCurrentUser } from "./context/currentUserContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
	const userCtx = useCurrentUser();
	const user = userCtx?.currentUser;
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signin" element={user ? <Navigate to="/profile" /> : <SignIn />} />
			<Route path="/signup" element={user ? <Navigate to="/profile" /> : <SignUp />} />
			<Route path="/profile" element={!user ? <Navigate to="/signin" /> : <Profile />} />
		</Routes>
	);
}

export default App;
