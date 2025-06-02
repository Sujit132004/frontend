import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            // console.log(res.data.user);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user',JSON.stringify(res.data.user));
            toast.success('Login successfull!');
            navigate('/dashboard');
        }

        catch (err) {
            const msg = err.response?.data?.message || 'Login Failed';
            setError(msg);
            toast.error(msg);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>

                {error && (
                    <div className="mb-4 text-red-600 font-semibold text-center">
                        {error}
                    </div>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="border p-2 rounded w-full mb-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="border p-2 rounded w-full mb-6"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded py-2 w-full hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </form>

            <p className="text-center mt-4">
                Don’t have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">
                    Register here
                </Link>
            </p>
            </div>
        </div>
    )
}

export default Login