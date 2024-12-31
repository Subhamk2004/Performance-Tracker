import { useState, useEffect } from "react";

function useStreak() {
    const [streak, setStreak] = useState(0);
    let [longestStreak, setLongestStreak] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let server_url = import.meta.env.VITE_SKILLSLOG_SERVER_URL;

    const fetchStreak = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${server_url}/api/streak`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            let data = await response.json();
            if (data.success) {
                setStreak(data.streak);
                setLongestStreak(data.longestStreak)
                console.log('Streak:', data.streak);
            }
            else {
                console.error('Error in fetchStreak:', data.message);
                setError(data.message);
            }

        } catch (error) {
            console.error('Error in fetchStreak:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchStreak();
    }, []);

    return { streak, loading, error, longestStreak };
}

export default useStreak;