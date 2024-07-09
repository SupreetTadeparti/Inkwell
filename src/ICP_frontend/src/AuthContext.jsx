import React, { createContext, useState, useContext, useEffect } from "react";
import { createActor } from "../../declarations/ICP_backend";
import { AuthClient, LocalStorage } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);
  const [authClient, setAuthClient] = useState(null);
  const [actor, setActor] = useState(null);

  const network =
    process.env.DFX_NETWORK ||
    (process.env.NODE_ENV === "production" ? "ic" : "local");

  const internetIdentityUrl =
    network === "local"
      ? `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943/`
      : `https://identity.ic0.app`;

  const init = async () => {
    const client = await AuthClient.create();
    setAuthClient(client);
    setAuthenticated(await client.isAuthenticated());
  };

  const getActor = async () => {
    if (!actor && authClient && (await authClient.isAuthenticated())) {
      const identity = authClient.getIdentity();
      const agent = new HttpAgent({ identity });
      const newActor = createActor(process.env.CANISTER_ID_ICP_BACKEND, {
        agent,
      });
      setActor(newActor);
      return newActor;
    }
    return actor;
  };

  const login = async () => {
    if (authClient === null) return console.error("Auth Client is null");

    await new Promise((resolve) => {
      authClient.login({
        identityProvider: internetIdentityUrl,
        onSuccess: resolve,
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
      });
    });

    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    const newActor = createActor(process.env.CANISTER_ID_ICP_BACKEND, {
      agent,
    });

    setActor(newActor);
    setAuthenticated(true);
  };

  const logout = async () => {
    if (authClient === null) return console.error("Auth Client is null");

    await authClient.logout();

    setActor(null);
    setAuthenticated(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authClient, actor, login, logout, authenticated, getActor }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
