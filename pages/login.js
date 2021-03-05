import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../components/layout";
import LoginForm from "../components/login-form";
import { useOrderCloud } from "../lib/ordercloud-provider";


export default function Login() {
    const {isAnonymous} = useOrderCloud()
    const router = useRouter()

    useEffect(() => {
        if (!isAnonymous) {
            router.push('/')
        }
    }, [isAnonymous])

    return <LoginForm/>
}