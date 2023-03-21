import { Box, Button, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
        p: "20px",
      }}
    >
      <Box sx={{display: 'flex'}}>
        <Typography
          sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.5rem" }}
        >
          Xin chào: {authContext.userInfo && authContext.userInfo.email}
        </Typography>
        <NavLink
          to="/images"
          className={"nav-link"}
          style={{ color: "#fff", textDecoration: "none", marginLeft: "20px", fontWeight: "bold", borderLeft: '1px solid black', paddingLeft: '10px'}}
        >
          Images
        </NavLink>
      </Box>

      <Button
        variant="text"
        sx={{ color: "#fff", fontSize: "1.5rem" }}
        onClick={handleLogout}
      >
        Đăng xuất
      </Button>
    </Box>
  );
};

export default Header;
