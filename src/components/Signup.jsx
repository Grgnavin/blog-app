import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState("");

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.CreateAccount(data);
            if(userData){
                await authService.getCurrentUser();
                if(userData) dispatch(login(userData))
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
        
        </div>
    )
}

export default Signup
