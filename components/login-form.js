import Box from "@material-ui/core/box";
import Button from "@material-ui/core/button";
import Checkbox from '@material-ui/core/checkbox';
import FormControlLabel from '@material-ui/core/formControlLabel';
import TextField from "@material-ui/core/textField";
import Typography from "@material-ui/core/typography";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useOcAuth from "../lib/useOcAuth";
import { login } from "../redux/slices/ocAuth";
import Link from "./link";

export default function LoginForm() {
    const dispatch = useDispatch()
    const {isAnonymous, loginError} = useOcAuth()
    const router = useRouter();

    const loginUser = async event => {
        event.preventDefault()
        dispatch(login({
            username: event.target.username.value, 
            password: event.target.password.value, 
            remember: event.target.remember_me.checked
        }))
    }

    useEffect(() => {
        if (!isAnonymous) {
            router.push('/')
        }
    }, [isAnonymous])

    return (
        <form onSubmit={loginUser}>
            <Typography align="center" variant="h5" component="h2" paragraph>Sign into your account</Typography>
            <TextField id="username" name="username" label="Username" variant="outlined" fullWidth margin="normal" />
            <TextField id="password" name="password" label="Password" variant="outlined" fullWidth margin="normal" type="password" />
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={3}>
                <FormControlLabel
                    control={<Checkbox id="remember_me" name="remember_me" />}
                    label="Remember me"
                />
                <Link variant="body1" href="/forgot-password">Forgot your password?</Link>
            </Box>
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>Sign in</Button>
        </form>
    )  
}