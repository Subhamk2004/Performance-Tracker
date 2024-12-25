import React, { useState, useEffect } from 'react'


function getGithubRepos() {

    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/github-repos", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch repos");
                }
                const data = await response.json();
                console.log(data);
                
                setRepos(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchRepos();
    }, []);

    console.log(repos);
    return { repos };
}

export default getGithubRepos