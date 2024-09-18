import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

function LoginFirst() {
    const navigate = useNavigate();
    function loginfirst(){
        navigate("/");
    }
  return (
    <div>
            <Header />
            <h1>Login First</h1>
            <button
                onClick={loginfirst}
                className='border-2 border-blue-500 p-2 rounded-sm text-blue-500 hover:text-white hover:bg-blue-500 transition-all duration-300'
            >
                Login
            </button>
        </div>
  )
}

export default LoginFirst
