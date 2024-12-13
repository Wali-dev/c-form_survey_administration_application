import React, { useState, useContext, ReactNode } from "react";

// Define a TypeScript interface for the auth context value
interface AuthContextType {
    authUser: any;
    setAuthUser: React.Dispatch<React.SetStateAction<any>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    login: (userData: any, authToken: string) => void;
    logout: () => void;
}

// Creating context with default values
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authUser, setAuthUser] = useState<any>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);

    const login = (userData: any, authToken: string) => {
        setAuthUser(userData);
        setToken(authToken);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setAuthUser(null);
        setToken(null);
        setIsLoggedIn(false);
    };

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
