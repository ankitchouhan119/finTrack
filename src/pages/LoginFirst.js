import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import loginFirst from '../../src/components/assets/loginFirst.jpg'

function LoginFirst() {
    const navigate = useNavigate();
    function loginfirst() {
        navigate("/signup");
    }
    return (
        <div>
            <Header />
            <div className='flex flex-col justify-center items-center h-[80vh]'>
                <img src={loginFirst} alt="login first image" className='w-[40%] h-[90%]' />
                <h1 className='-mt-[3rem] text-xl text-gray-500'>Login First to unlock your personal finance dashboard and start tracking your money effortlessly!</h1>
                <button
                    onClick={loginfirst}
                    className='border-2 mt-3 border-blue-500 py-2 px-5 rounded-lg  text-blue-500 hover:text-white hover:bg-blue-500 transition-all duration-300'
                >
                    Login
                </button>
            </div>

        </div>
    )
}

export default LoginFirst
