import React, {useContext, useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom'
import { notification } from '../utils/notification';
import AuthContext from '../context';
import { Box, Button, Grid, Input } from '@mui/material';
 
const Login = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            localStorage.setItem('access_token', user.accessToken)
            notification("success", "Đăng nhập thành công")
            authContext.setUserInfo(user)
            navigate("/home")
            //console.log(user);
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            notification("error", errorMessage)
        });
       
    }
 
    return(
        <Box sx={{backgroundColor: '#999', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{m: 'auto', p: '20px', backgroundColor: '#fff', width: '400px'}}>
                <Grid container>
                    <Grid item xs={12}>
                        {/* <FormLabel>Email</FormLabel> */}
                        <Input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        {/* <FormLabel>Password</FormLabel> */}
                        <Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Grid>
                    <Grid marginTop="20px" item xs={12}>
                        <Button variant='contained' color="primary" onClick={onLogin}>Login</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
 
export default Login