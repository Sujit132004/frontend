import React, { useState } from 'react'
import {toast} from  'react-toastify';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
const Register = () => {

    const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [name,setName]=useState('');
    const navigate=useNavigate();

    const handleRegister=async(e)=>{
        e.preventDefault();

        try{
            const res=await axios.post('http://localhost:5000/api/auth/register',{name,email,password});
            localStorage.setItem('token',res.data.token);
            toast.success('Registration successfull');
            navigate('/');
        }
        catch(err){
            const msg=err?.esponse?.data?.message || 'Registration Failed!';
            toast.error(msg);
        }
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-4 font-bold text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 rounded w-full mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded w-full mb-6"
        />

        <button
          type="submit"
          className="bg-green-600 text-white rounded py-2 w-full hover:bg-green-700 transition"
        >
          Register
        </button>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register