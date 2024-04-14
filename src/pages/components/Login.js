import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import styles from '../../styles/Login.module.css'; // Import CSS file for styling

const Login = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm(); // React Hook Form
    const [errorMessage, setErrorMessage] = useState(null);

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            // Make API call to login endpoint
            const response = await axios.post('/api/login', data);
            console.log(response.data); // Log success message

            // Optionally, you can redirect the user to another page or display a success message
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
                
                <Button variant="danger" type="submit" style={{ margin: '20px 5px' }} disabled={!username || !password || Object.keys(errors).length > 0}>
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Login;
