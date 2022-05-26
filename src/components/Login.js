import Button from '@mui/material/Button';
import { useAuth } from "../hooks/useAuth";

function Login() {
    const { signInWithGoogle } = useAuth();

    return (
    <> 
        <h1> Login </h1>
        <Button variant="contained" color="primary" onClick={signInWithGoogle}>
            Sign in with Google
        </Button>
    </>
    );
}

export default Login

