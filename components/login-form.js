import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useOrderCloud } from "../lib/ordercloud-provider"

export default function LoginForm() {
    const {login, isAnonymous} = useOrderCloud()
    const router = useRouter()
    const [message, setMessage] = useState()

    const loginUser = async event => {
        event.preventDefault()
        setMessage()
        try {
            await login(event.target.username.value, event.target.password.value, event.target.remember_me.checked);
        } catch (ex) {
            setMessage(ex.response.data.error_description);
        }
    }

    useEffect(() => {
        if (!isAnonymous) {
            router.push('/')
        }
    }, [isAnonymous])

    return isAnonymous && (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <p className={`block px-4 pt-3 pb-4 bg-yellow-500 border-yellow-700 rounded transform ${message ? 'scale-100' : 'scale-0'} transition-transform duration-300`}>
                    {message}
                </p>
                <form className="mt-8 space-y-6" onSubmit={loginUser}>
                    <input type="hidden" name="remember" value="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input id="username" name="username" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" placeholder="Username"/>
                        </div>
                        <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" placeholder="Password"/>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                        <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"/>
                        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                        </div>

                        <div className="text-sm">
                        <Link href="/forgot-password">
                            <a className="font-medium text-red-600 hover:text-red-500">
                                Forgot your password?
                            </a>
                        </Link>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg className="h-5 w-5 text-red-500 group-hover:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                        </span>
                        Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )  
}