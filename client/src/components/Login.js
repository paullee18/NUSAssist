import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { useAuth } from "../hooks/useAuth";
import ResponsiveAppBar from './ResponsiveAppBar';
import {useState} from 'react';
import { red } from '@mui/material/colors';

function Login() {
    const wrongCredentials = true;
    const { signInWithGoogle, signin } = useAuth();

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
    }

    const handleSubmit = e => {
        e.preventDefault();
        signin(state.email, state.password).catch(err => {
            console.log("Wrong Email/Password");
        });
    }

    return (
    <> 
        <ResponsiveAppBar />
            <Paper elevation={6} style={{ padding: 30, display: 'inline-block', margin: 50, width: 400, height: 500}}>
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
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Password" type={'password'} id='password' value={state.password} onChange={handleChange}/>
                    </Grid>
                    {wrongCredentials && <p style={{color: 'red',}}> Wrong Username/Password </p>}
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}> Signin </Button>
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={signInWithGoogle}>
                        Sign in with Google
                    </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary"> Signup </Button>
                    </Grid>
                </Grid>
            </Paper>
    </>
    );
}

export default Login

