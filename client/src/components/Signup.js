import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { useAuth } from "../hooks/useAuth";
import ResponsiveAppBar from './ResponsiveAppBar';
import {useState, useEffect} from 'react';
import { red } from '@mui/material/colors';
import { NavLink } from "react-router-dom";

function Signup() {
    const { signup } = useAuth();
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [invalidUser, setInvalidUser] = useState(false);
    const [passwordLongEnough, setPasswordLongEnough] = useState(true);
    const [emptyEmail, setEmptyEmail] = useState(false);
    const [emptyPassword, setEmptyPassword] = useState(false);
    const [emptyConfirmPass, setEmptyConfirmPass] = useState(false);

    const [state, setState] = useState({
        email : '',
        password : '',
        confirmedPassword : '',
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
                if (value.length < 6) {
                    setPasswordLongEnough(false);
                } else if (!passwordLongEnough) {
                    setPasswordLongEnough(true);
                }
                if (!passwordsMatch && value === state.confirmedPassword) {
                    setPasswordsMatch(true);
                }
                break;
            case 'confirmedPassword':
                setEmptyConfirmPass(false);
                if (!passwordsMatch && value === state.password) {
                    setPasswordsMatch(true);
                }
                break;
            default:
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        let canSignUp = true;
        if (state.email === "") {
            setEmptyEmail(true);
            canSignUp = false;
        }
        if (state.password === "") {
            setEmptyPassword(true);
            canSignUp = false;
        }
        if (state.confirmedPassword === "") {
            setEmptyConfirmPass(true);
            canSignUp = false;
        }
        if (state.password !== state.confirmedPassword) {
            setPasswordsMatch(false);
            canSignUp = false;
        } else if (state.password.length < 6) {
            setPasswordLongEnough(false);
            canSignUp = false;
        }
        if (canSignUp) {
            signup(state.email, state.password).catch(err => {
                setInvalidUser(true);
            });
        }
    }

    return (
    <> 
        <ResponsiveAppBar />
            <Paper elevation={6} style={{ padding: 30, margin: 'auto', width: 400, height: 500}} alignItems="center"
  justifyContent="center">
                <Grid 
                    container
                    spacing={3}
                    direction={'column'}
                    justify={'center'}
                    alignItems={'center'}
                >
                    <Grid item xs={12}>
                        <h2> NUSAssist</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Email" id='email' value={state.email} onChange={handleChange}/>
                        {emptyEmail && <p style={{color: 'red',}}> Please fill in Email </p>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label="Password" type={'password'} id='password' value={state.password} onChange={handleChange}/>
                        {!passwordLongEnough && <p style={{color: 'red',}}> Password min. 6 characters </p>}
                        {emptyPassword && <p style={{color: 'red',}}> Please fill in password </p>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label="Confirm Password" type={'password'} id='confirmedPassword' value={state.confirmedPassword} onChange={handleChange}/>
                        {emptyConfirmPass && <p style={{color: 'red',}}> Please refill in password </p>}
                        {!passwordsMatch && <p style={{color: 'red',}}> Passwords don't match </p>}
                        {invalidUser && <p style={{color: 'red',}}> Registered/Invalid email </p>}
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}> Signup </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <p> Already have an account? <NavLink to="/" color='blue'>Signin</NavLink></p>
                    </Grid>


                </Grid>
            </Paper>
    </>
    );
}

export default Signup

