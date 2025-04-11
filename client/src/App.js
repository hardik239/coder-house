import { Routes, Route } from "react-router-dom";
import Activate from "./components/activate/Activate";
import Authenticate from "./components/authenticate/Authenticate";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Room from "./pages/rooms/room/Room";
import Rooms from "./pages/rooms/Rooms";
import GuestRoute from "./protected-routes/GeustProtected";
import SemiProtectedRoute from "./protected-routes/SemiProtected";
import ProtectedRoute from "./protected-routes/Protected";
import { useRefreshApp } from "./hooks/useRefreshApp";
import Loader from "./components/loader/Loader";

function App() {
  const { loading } = useRefreshApp();

  if (loading)
    return (
      <div className="body-wrapper">
        <Loader message="Loading, please wait.." />
      </div>
    );

  return (
    <div className="app-wrapper">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Home />
            </GuestRoute>
          }
        />
        <Route
          path="/authenticate"
          element={
            <GuestRoute>
              <Authenticate />
            </GuestRoute>
          }
        />
        <Route
          path="/activate"
          element={
            <SemiProtectedRoute>
              <Activate />
            </SemiProtectedRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/room/:id"
          element={
            <ProtectedRoute>
              <Room />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
