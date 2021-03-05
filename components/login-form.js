import { useOrderCloud } from "../lib/ordercloud-provider"
import utilStyles from '../styles/utils.module.css'

export default function LoginForm() {
    const {login, logout, isAnonymous} = useOrderCloud()

    const loginUser = async event => {
        event.preventDefault()
        try {
            await login(event.target.username.value, event.target.password.value);
        } catch (ex) {
            alert(`Login Error: ${JSON.stringify(ex, null, 2)}`)
        }
    }

    return isAnonymous ? (
        <form onSubmit={loginUser}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" required className={utilStyles.input}/>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required className={utilStyles.input}/>
            <button type="submit" className={utilStyles.button}>Login</button>
        </form>
    ) : (
        <button type="button" onClick={logout} className={utilStyles.button}>Log Out</button>
    )
}