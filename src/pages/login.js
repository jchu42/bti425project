import React from 'react';
import Head from 'next/head';
import Login from './components/Login'; // Import the Login component

const LoginPage = () => {
    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <Login /> {/* Render the Login component */}
        </div>
    );
};

export default LoginPage;
