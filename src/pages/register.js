// pages/register.js
import Head from 'next/head';
import Register from './components/Register';

const RegisterPage = () => {
    return (
        <div>
            <Head>
                <title>Register</title>
            </Head>
            <Register />
        </div>
    );
};

export default RegisterPage;
