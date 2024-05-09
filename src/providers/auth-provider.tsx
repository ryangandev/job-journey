import React, { createContext, useState } from "react";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>(
        "3f0c7659-b023-422b-9b49-9b9d43cf2e26",
    );

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, userId, setUserId }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
