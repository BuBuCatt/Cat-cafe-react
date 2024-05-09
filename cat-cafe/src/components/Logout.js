import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Logout = (props) => {
    const navigate = useNavigate();
    const { loginUser, logout } = useContext(AuthContext);

    useEffect(() => {
        // Clear user data from the state
        // logout(loginUser);

        // Redirect to login page
        // navigate('/login');
    }, []);

    return null;
};

export default Logout;