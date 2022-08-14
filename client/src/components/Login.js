import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { useAuth } from "../hooks/useAuth";
import ResponsiveAppBar from './ResponsiveAppBar';
import {useState, useEffect} from 'react';
import { red } from '@mui/material/colors';
import Signup from './Signup';
import { NavLink } from "react-router-dom";
import logo150 from "../logo150.png";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


function Login() {
    const { signInWithGoogle, signin } = useAuth();
    const [wrongCredentials, setWrongCredentials] = useState(false);
    const [emptyEmail, setEmptyEmail] = useState(false);
    const [emptyPassword, setEmptyPassword] = useState(false);

    const [state, setState] = useState({
        email : '',
        password : ''
    })

    const handleChange = e => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
        switch(id) {
            case 'email':
                setEmptyEmail(false);
                break;
            case 'password':
                setEmptyPassword(false);
                break;
            default:
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        let canSignIn = true;
        if (state.email === "") {
            setEmptyEmail(true);
            canSignIn = false;
        }
        if (state.password === "") {
            setEmptyPassword(true);
            canSignIn = false;
        }
        if (canSignIn) {
            signin(state.email, state.password).catch(err => {
                setWrongCredentials(true);
            });
        }
    }

    return (
    <> 
        <ResponsiveAppBar />
            <Alert style={{ marginTop:20 }} severity="info">
            <AlertTitle>Demo Account</AlertTitle>
            If you do not wish to sign up using your actual email, feel free to log in with this demo account! — <strong>Email: nusassistdemo@gmail.com Password: 123456</strong>
            </Alert>
            <Paper elevation={6} style={{ padding: 30, margin: 'auto', marginTop: 50, width: 440, height: 630}} alignItems="center"
  justifyContent="center">
                <Grid 
                    container
                    spacing={3}
                    direction={'column'}
                    justify={'center'}
                    alignItems={'center'}
                >
                    <Grid item xs={12}>
                        <img src={logo150} alt="logo" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Email" id='email' value={state.email} onChange={handleChange}/>
                        {emptyEmail && <p style={{color: 'red',}}> Please fill in Email </p>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label="Password" type={'password'} id='password' value={state.password} onChange={handleChange}/>
                        {emptyPassword && <p style={{color: 'red',}}> Please fill in password </p>}
                        {wrongCredentials && <p style={{color: 'red',}}> Invalid Username/Password </p>}
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}> Signin </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <p> ----- OR ----- </p>
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={signInWithGoogle}>
                        Sign in with Google
                    </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <p> Don't have an account? <NavLink to="/signup" color='blue'><strong>Signup</strong></NavLink></p>
                    </Grid>
                </Grid>
            </Paper>
    </>
    );
}

export default Login

