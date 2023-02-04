import { Box, Button, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context";
import { auth } from "../utils/firebase";

export const Header = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem("access_token");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <Box
      sx={{
        backgroundColor: "#29b0ff",
        width: "auto",
        height: "auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: '20px'
      }}
    >
      <Typography sx={{ color: "#fff", fontWeight: "bold", fontSize: '1.5rem' }}>
        Xin chào: {authContext.userInfo && authContext.userInfo.email}
      </Typography>
      <Button variant="text" sx={{color: '#fff', fontSize: '1.5rem'}} onClick={handleLogout}>Sign out</Button>
    </Box>
  );
};

export default Header;
