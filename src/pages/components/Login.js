import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router'; 
import axios from 'axios';
import {atom, useAtom} from 'jotai';
import {loggedInAtom, favoritesAtom, historyAtom} from '../../user.js';

import styles from '../../styles/Login.module.css'; // Import CSS file for styling

const Login = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm(); // React Hook Form
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
    const [favorites, setFavorites] = useAtom(favoritesAtom);
    const [history, setHistory] = useAtom(historyAtom);
    const router = useRouter();

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            // Make API call to login endpoint
            const response = await axios.post('/api/login', data);
            // console.log(response.data); // Log success message
            setSuccessMessage(response.data.message); // Set success message
            localStorage.setItem('token', response.data.token); // Store token in local storage
            setLoggedIn(true);
            
            setFavorites(response.data.favorites)
            localStorage.setItem('favorites', response.data.favorites);
            setHistory(response.data.history)
            localStorage.setItem('history', response.data.history);

            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response && error.response.status === 401) {
                setErrorMessage('Invalid username or password'); // Set error message for authentication failure
            } else {
                setErrorMessage('An error occurred. Please try again later.'); // Generic error message
            }

            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    };

    const username = watch("username");
    const password = watch("password");

    return (
        <div className={styles.container}>
            <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        {...register('username', { required: 'Username is required' })}
                    />
                    {errors.username?.type === "required" && <span className={styles.error}>Username is required</span>}
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password?.type === "required" && <span className={styles.error}>Password is required</span>}
                </Form.Group>

                {errorMessage && <Alert variant="danger" style={{ margin: '20px 5px' }}>{errorMessage}</Alert>} {/* Display error message */}
                {successMessage && <Alert variant="success" style={{ margin: '20px 5px' }}>{successMessage}</Alert>} {/* Display success message */}
                <Button variant="danger" type="submit" style={{ margin: '20px 5px' }} disabled={!username || !password || Object.keys(errors).length > 0}>
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Login;
