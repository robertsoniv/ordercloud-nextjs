import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { Configuration, Tokens, Auth } from 'ordercloud-javascript-sdk'
import decode from 'jwt-decode'

if (process.env.NEXT_PUBLIC_OC_BASE_API_URL) {
    Configuration.Set({
        baseApiUrl: process.env.NEXT_PUBLIC_OC_BASE_API_URL
    })
}

const clientId = process.env.NEXT_PUBLIC_OC_CLIENT_ID;
const scopeString = process.env.NEXT_PUBLIC_OC_SCOPE;
const anonymous = Boolean(process.env.NEXT_PUBLIC_OC_ALLOW_ANONYMOUS === "true");

if (!clientId) {
    throw new Error("Missing environment variable NEXT_PUBLIC_OC_CLIENT_ID")
}
if (!scopeString) {
    throw new Error("Missing environment variable NEXT_PUBLIC_OC_SCOPE")
}

const scope = scopeString.split(',')

const OrderCloudContext = createContext();

export default function OrderCloudProvider({ children }) {
    const [tokens, setTokens] = useState({
        access: Tokens.GetAccessToken(),
        refresh: Tokens.GetRefreshToken(),
        validated: false,
        anonymous: false,
        pending: true,
    })

    const handleAuthResponse = ({access_token, refresh_token}, validate) => {
        let anonymous = true;
        Tokens.SetAccessToken(access_token)
        if (refresh_token !== undefined) {
            Tokens.SetRefreshToken(refresh_token)
        }
        if (access_token) {
            const decoded = decode(access_token);
            anonymous = !!decoded.orderid
        }
        setTokens(t => ({
            pending: false,
            access: access_token,
            refresh: refresh_token === undefined ? t.refresh : refresh_token,
            validated: !!validate,
            anonymous
        }))
    }

    const login = async (username, password) => {
        setTokens(t => {
            t.pending = true;
            return t;
        })
        const response = await Auth.Login(username, password, clientId, scope)
        handleAuthResponse(response, true);
    }

    const logout = () => {        
        Tokens.RemoveAccessToken()
        Tokens.RemoveRefreshToken()
        setTokens({
            pending: true,
            validated: false,
            access: undefined,
            refresh: null,
            anonymous: true,
        })
    }

    const attemptAuth = async () => {
        try {
            setTokens(t => {
                t.pending = true;
                return t;
            })
            const response = await Auth.Anonymous(clientId, scope)
            handleAuthResponse(response, true);
        } catch (ex) {
            console.log('Authentication Failed', ex);
        }
    }

    const attemptRefresh = async (refreshToken) => {
        try {
            setTokens(t => {
                t.pending = true;
                return t;
            })
            const response = await Auth.RefreshToken(refreshToken, clientId)
            handleAuthResponse({access_token: response.access_token}, true);
        } catch (ex) {
            attemptAuth()
        }
    }

    const validateToken = async (accessToken, refreshToken) => {
        try {
            setTokens(t => {
                t.pending = true;
                return t;
            })
            const response = await Tokens.GetValidToken(accessToken);
            handleAuthResponse({access_token: response}, true);
        } catch (ex) {
            setTokens(t => {
                return {
                    pending: t.pending,
                    validated: false,
                    refresh: t.refresh
                }
            })
        } 
    }

    useEffect(() => {
        if (!tokens.validated) {
            if (tokens.access) {
                validateToken(tokens.access, tokens.refresh);
            } else if (tokens.refresh) {
                attemptRefresh(tokens.refresh)
            } else if (anonymous) {
                attemptAuth()
            }
        }
    }, [tokens])

    const result = useMemo(() => {
        return {
            isLoading: !!tokens.pending,
            isAuthenticated: !!tokens.access,
            isAnonymous: !!tokens.anonymous,
            login,
            logout
        }
    }, [tokens.access, tokens.pending])

    return (
        <OrderCloudContext.Provider value={result}>
            {children}
        </OrderCloudContext.Provider>
    ) 
}

export function useOrderCloud() {
    return useContext(OrderCloudContext)
}