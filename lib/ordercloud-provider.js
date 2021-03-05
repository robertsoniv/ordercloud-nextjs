import decode from 'jwt-decode';
import { Auth, Configuration, Tokens, Me } from 'ordercloud-javascript-sdk';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types'

const OrderCloudContext = createContext();

function OrderCloudProvider({ 
    clientId,
    scope,
    baseApiUrl,
    allowAnonymous,
    children 
}) {
    if (baseApiUrl) {
        Configuration.Set({ baseApiUrl })
    }
    
    if (!clientId) {
        throw new Error("[OrderCloudProvider Error]: clientId is required")
    }
    if (!scope) {
        throw new Error("[OrderCloudProvider Error]: clientId is required")
    }
    
    const parsedScope = useMemo(() => {
        return typeof scope === 'string' ? scope.split(',') : scope;
    }, [scope])

    const [state, setState] = useState({
        user: undefined,
        accessToken: Tokens.GetAccessToken(),
        refreshToken: Tokens.GetRefreshToken(),
        validated: false,
        pending: false,
    })

    const handleAuthResponse = ({access_token, refresh_token, user}, shouldValidate, shouldForget) => {
        if (refresh_token !== undefined && !shouldForget) {
            Tokens.SetRefreshToken(refresh_token)
        }
        if (access_token !== undefined) {
            Tokens.SetAccessToken(access_token)
        }
        setState(s => ({
            user: user === undefined ? s.user : user,
            pending: false,
            accessToken: access_token === undefined ? s.accessToken : access_token,
            refreshToken: refresh_token === undefined ? shouldForget ? undefined : s.refreshToken : refresh_token,
            validated: !!shouldValidate,
        }))
    }

    const isAnonymous = useMemo(() => {
        return state.accessToken ? !!decode(state.accessToken).orderid : true
    }, [state.accessToken])

    const login = useCallback(async (username, password, remember) => {
        setState(s => {
            s.pending = true;
            return s;
        })
        const response = await Auth.Login(username, password, clientId, parsedScope)
        handleAuthResponse(response, false, !remember);
    }, [
        clientId,
        parsedScope
    ])

    const logout = () => {        
        Tokens.RemoveAccessToken()
        Tokens.RemoveRefreshToken()
        setState({
            user: null,
            pending: true,
            validated: false,
            accessToken: null,
            refreshToken: null,
        })
    }

    const attemptAuth = useCallback(async () => {
        setState(s => {
            s.pending = true;
            return s;
        })
        try {
            const response = await Auth.Anonymous(clientId, parsedScope)
            handleAuthResponse({access_token: response.access_token, refresh_token: null});
        } catch (ex) {
            console.error('[OrderCloud ProviderError]: Authentication failed', ex);
        }
    }, [
        clientId,
        parsedScope,
    ])

    const attemptRefresh = useCallback(async (refreshToken) => {
        setState(s => {
            s.pending = true;
            return s;
        })
        try {
            const response = await Auth.RefreshToken(refreshToken, clientId)
            handleAuthResponse({access_token: response.access_token}, true);
        } catch (ex) {
            attemptAuth()
        }
    }, [
        clientId,
        attemptAuth
    ])

    const validateToken = useCallback(async () => {
        setState(s => {
            s.pending = true;
            return s;
        })
        try {
            const response = await Me.Get();
            handleAuthResponse({user: response}, true);
        } catch (ex) {
            setState(s => {
                return {
                    pending: s.pending,
                    validated: false,
                    refreshToken: s.refreshToken
                }
            })
        } 
    }, [state.accessToken])

    useEffect(() => {
        if (!state.validated) {
            if (state.accessToken) {
                validateToken();
            } else if (state.refreshToken) {
                attemptRefresh(state.refreshToken)
            } else if (allowAnonymous) {
                attemptAuth()
            }
        }
    }, [
        state.validated,
        state.accessToken,
        state.refreshToken,
        allowAnonymous,
        validateToken,
        attemptRefresh,
        attemptAuth
    ])

    const result = useMemo(() => {
        return {
            isLoading: !!state.pending,
            isAuthenticated: !!state.accessToken,
            isAnonymous,
            user: state.user,
            login,
            logout
        }
    }, [
        state.user,
        state.accessToken,
        state.pending,
        isAnonymous,
        login
    ])

    return (
        <OrderCloudContext.Provider value={result}>
            {children}
        </OrderCloudContext.Provider>
    ) 
}

OrderCloudProvider.propTypes = {
    clientId: PropTypes.string.isRequired,
    scope: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    baseApiUrl: PropTypes.string,
    allowAnonymous: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired
}

export default OrderCloudProvider;

export function useOrderCloud() {
    return useContext(OrderCloudContext)
}