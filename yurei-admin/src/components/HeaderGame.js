import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export const HeaderGame = () => {
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
      <Typography
        sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.5rem" }}
      >
        Xin chào: {localStorage.getItem("playerName") || "Vô danh"}-sama
      </Typography>
      <Box>
        <NavLink
          to="/polls"
          className={"nav-link"}
          style={{ color: "#fff", textDecoration: "none", marginRight: "20px"}}
        >
          Polls
        </NavLink>
        <NavLink
          to="/scores"
          className={"nav-link"}
          style={{ color: "#fff", textDecoration: "none", marginRight: "20px"}}
        >
          Top Scores
        </NavLink>
        <NavLink
          to="/games"
          className={"nav-link"}
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Games
        </NavLink>
      </Box>
    </Box>
  );
};

export default HeaderGame;
