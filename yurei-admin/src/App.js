import Box from "@mui/material/Box";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AuthContext from "./context";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ userInfo: user, setUserInfo: setUser }}>
      <Box sx={{width: '100vw', height: '100vh'}}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </AuthContext.Provider>
  );
}

export default App;
