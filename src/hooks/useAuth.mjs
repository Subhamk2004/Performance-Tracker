import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../reduxSlices/UserSlice.mjs";

function useAuth() {
    let dispatch = useDispatch();
    const [authData, setAuthData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    let server_url = import.meta.env.VITE_SKILLSLOG_SERVER_URL;

    const authStatus = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${server_url}/api/login/status`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setAuthData(data);

            if (data.user) {
                dispatch(authenticate(data.user));
                console.log('Auth data:', data.user);
            }
        } catch (error) {
            console.error('Error in authStatus:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        authStatus();
    }, []);

    return { authData, isLoading, error };
}

export default useAuth;