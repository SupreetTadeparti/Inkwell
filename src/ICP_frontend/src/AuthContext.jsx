import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from '@dfinity/agent';
import { createActor } from "../../declarations/ICP_backend";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authClient, setAuthClient] = useState(null);
    const [actor, setActor] = useState(null);

    const network = process.env.DFX_NETWORK || (process.env.NODE_ENV === "production" ? "ic" : "local");
    const internetIdentityUrl = network === "local" ? `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943/` : `https://identity.ic0.app`

    useEffect(() => {
        init();
    }, [])

    const init = async () => {
        const client = await AuthClient.create();
        setAuthClient(client);
    }

    const isLoggedIn = async () => {
        console.log("Here");
        return await authClient.isAuthenticated()
    }

    const login = async () => {
        await new Promise((resolve) => {
            authClient.login({
                identityProvider: internetIdentityUrl,
                onSuccess: resolve,
                maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
            });
        });
        const identity = authClient.getIdentity();
        const agent = new HttpAgent({ identity });
        const newActor = createActor(process.env.CANISTER_ID_ICP_BACKEND, { agent });

        setAuthClient(authClient);
        setActor(newActor);
    };

    const logout = async () => {
        if (authClient) {
            await authClient.logout();
            setAuthClient(null);
            setActor(null);
        }
    };

    return (
        <AuthContext.Provider value={{ authClient, actor, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);