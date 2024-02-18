import React, { useState } from 'react';
import './LoginSignup/LoginSignup.css';
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/apiCalls/authApiCall';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        if (email.trim() === "") {
            setErrorMessage("Email is required");
            return;
        }
        if (password.trim() === "") {
            setErrorMessage("Password is required");
            return;
        }

        try {
            // Send login request to server
            const response = await fetch("https://virtual-surgery.onrender.com/api/auth/login", {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Check server response
            if (response.ok) {
                // Authentication successful, redirect user to authenticated part of the application
                const userData = await response.json();
                dispatch(loginSuccess(userData)); // Dispatch action to store user data in Redux state
                navigate('/Home'); // Redirect to dashboard or any other authenticated route
            } else {
                // Authentication failed, display error message
                setErrorMessage("Invalid email or password");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("An unexpected error occurred");
        }
    };

    return (
        <div className='login'>
            <div className='pic'>
                    <div className="header">
                        <div className="text">Login</div>
                        <div className="underline"></div>
                    </div>
                    <form onSubmit={formSubmitHandler}>
                        <div className="inputs">
                            <div className="input">
                                <input type="text" id="username" autoComplete="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                                <FaUser className='icon' />
                            </div>
                            <div className="input">
                                <input type="password" id="email" autoComplete="current-password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
                                <FaLock className='icon' />
                            </div>
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                            <div className="forgot-password">
                                <label>
                                    <input type="checkbox" name='rememberme' id='rememberme' />Remember me
                                </label>
                                <a href="ForgotPassword">Forgot Password?</a>
                            </div>
                            <div className="submit-container">
                                <center><button type='submit' className='submit'> Login </button></center>
                            </div>
                        </div>
                    </form>
                <div class="add">
                    <h3>New here ?</h3>
                    <p>Become  a part of our community!</p>
                    <button class="btn transparent" id="sign-up-btn" onClick={() => window.location="/signup" }>
                    Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};