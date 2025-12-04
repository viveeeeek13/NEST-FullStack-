import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            // Fetch user data
            fetch(`${API}/auth/me`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
                .then(res => res.json())
                .then(data => {
                    setUser(data.user);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        // Fetch user data after login
        fetch(`${API}/auth/me`, {
            headers: { Authorization: `Bearer ${newToken}` }
        })
            .then(res => res.json())
            .then(data => setUser(data.user))
            .catch(err => console.error(err));
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, isLoggedIn: !!token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
