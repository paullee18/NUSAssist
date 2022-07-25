import { useAuth } from "../hooks/useAuth";
import Calendar from "./Calendar";
import { sendEmailVerification } from "firebase/auth";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Paper from '@mui/material/Paper';
import logo150 from "../logo150.png";
import Grid from '@mui/material/Grid';



function EmailVerification() {
    const { user } = useAuth(); 

        return (
            <>
                <ResponsiveAppBar />
                <Paper elevation={6} style={{ padding: 30, margin: 'auto', marginTop: 50, width: 600, height: 350}} alignItems="center"
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
                    <p> A verification email has been sent to your email. (Could be in spam)</p>
                    </Grid>
                    <Grid item xs={12}>
                    <p> Please refresh the page after verifying your email.</p>
                    </Grid>
                    </Grid>
                </Paper>
            </>
        )
    
}

export default EmailVerification;