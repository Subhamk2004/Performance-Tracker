import React, { useState, useEffect } from 'react'
import { set } from 'zod';


function getGithubRepos() {

    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    let server_url = import.meta.env.VITE_SKILLSLOG_SERVER_URL;

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${server_url}/api/github-repos`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch repos");
                }
                const data = await response.json();

                setRepos(data);
            } catch (error) {
                console.log("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRepos();
    }, []);

    return { repos, loading };
}

export default getGithubRepos