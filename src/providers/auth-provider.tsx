import React, { createContext, useState } from "react";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string | null;
    setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, userId, setUserId }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
