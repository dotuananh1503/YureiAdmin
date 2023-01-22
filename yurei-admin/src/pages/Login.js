import { Box, Button, Grid, Input } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { notification } from "../utils/notification";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("access_token", user.accessToken);
        notification("success", "Đăng nhập thành công");
        navigate("/home");
        //console.log(user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        notification("error", errorMessage);
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#999",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{ m: "auto", p: "20px", backgroundColor: "#fff", width: "400px" }}
      >
        <Grid container>
          <Grid item xs={12}>
            {/* <FormLabel>Email</FormLabel> */}
            <Input
              sx={{ width: "100%" }}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid marginTop="20px" item xs={12}>
            {/* <FormLabel>Password</FormLabel> */}
            <Input
              sx={{ width: "100%" }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid marginTop="20px" item xs={12}>
            <Button
              sx={{ width: "100%" }}
              variant="contained"
              color="primary"
              onClick={onLogin}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
