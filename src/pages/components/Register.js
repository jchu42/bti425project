import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import styles from '../../styles/Register.module.css'; // Import CSS file for styling

const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm(); // React Hook Form
    const [errorMessage, setErrorMessage] = useState(null);

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/register', data);
            console.log(response.data); // Log success message

            // Optionally, you can redirect the user to a login page or display a success message
        } catch (error) {
            console.error('Error registering user:', error);
            if (error.response && error.response.data.code === 'USER_EXISTS') {
                setErrorMessage('Username already exists'); // Set error message for existing username
            } else {
                setErrorMessage('An error occurred. Please try again later.'); // Generic error message
            }
    
            // Clear error message after 5 seconds
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    };

    const password = watch("password"); // Watch for changes in the "password" field

    // Function to check if form is valid
    const isFormValid = () => {
        return !errors.username && !errors.password && !errors.confirmPassword;
    };
    const handleInputFocus = () => {
        setErrorMessage(null);
    };

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
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters long'
                            }
                        })}
                    />
                    {errors.password?.message && <span className={styles.error}>{errors.password.message}</span>}
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        {...register('confirmPassword', {
                            required: 'Confirm Password is required',
                            validate: value =>
                                value === password || 'The passwords do not match'
                        })}
                    />
                    {errors.confirmPassword?.message && <span className={styles.error}>{errors.confirmPassword.message}</span>}
                </Form.Group>

                {errorMessage && <Alert variant="danger" style={{ margin: '20px 5px' }}>{errorMessage}</Alert>} {/* Display error message */}
                
                <Button variant="danger" type="submit" disabled={!isFormValid()} style={{ margin: '20px 5px' }} >
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Register;
