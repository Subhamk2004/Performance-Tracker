import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../reduxSlices/TaskSlice.mjs";

function useTasks() {
    const [tasks, setTasks] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let server_url = import.meta.env.VITE_SKILLSLOG_SERVER_URL;

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${server_url}/api/tasks`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            let data = await response.json();
            if (data.isSaved) {
                dispatch(addTask(data.tasks));
                setTasks(data.tasks);
                console.log('Tasks:', data.tasks);

            }
            else {
                console.error('Error in fetchTasks:', data.message);
                setError(data.message);
            }

        } catch (error) {
            console.error('Error in fetchTasks:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchTasks();
    }, []);

    return { tasks, loading, error };
}


export default useTasks;