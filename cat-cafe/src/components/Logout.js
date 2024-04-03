import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {
    const navigate = useNavigate();


    useEffect(() => {
        // Clear user data from the state
        props.userLogout(null);
        console.log("Successful logout");

        // Redirect to login page
        navigate('/login');
    }, []);

    return null;
};

export default Logout;