import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import { useAppContext } from "./context/AppContext";
import { Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Search from "./pages/Search";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Routes>
      <Route
        path="/register"
        element={isLoggedIn ? <Navigate to="/" /> : <Register />}
      />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/"
        element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/search"
        element={isLoggedIn ? <Search /> : <Navigate to="/search" />}
      />
    </Routes>
  );
}
export default App;
