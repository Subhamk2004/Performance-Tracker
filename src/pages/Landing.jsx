import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Landing() {
    let isAuthenticated = false;
    let navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, []);

    return (
        <div className='text-white'>
            Landing
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Landing