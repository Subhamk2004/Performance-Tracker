import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../reduxSlices/TaskSlice.mjs";
import { addTask as addDailyTasks } from "../reduxSlices/DailyTasks.mjs";

function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [dailyActivity, setDailyActivity] = useState([]);
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
                let normalTasks = data.tasks.filter((task) => task?.type !== 'daily');
                let dailyTasks = data.tasks.filter((task) => task?.type === 'daily');
                console.log(dailyTasks, 'daily');
                dispatch(addDailyTasks(dailyTasks));
                dispatch(addTask(normalTasks));
                setTasks(normalTasks);
                setDailyActivity(dailyTasks);
                console.log('Tasks:', normalTasks);
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

    return { tasks, loading, error, dailyActivity };
}


export default useTasks;