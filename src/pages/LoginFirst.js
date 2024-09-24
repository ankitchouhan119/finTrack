import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import loginFirst from '../../src/components/assets/loginFirst.jpg'
import Footer from '../components/Footer/footer';

function LoginFirst() {
    const navigate = useNavigate();
    function loginfirst() {
        navigate("/signup");
    }
    return (
        <div>
            <Header />
            <div className='flex flex-col justify-center items-center h-[95vh] '>
                <img src={loginFirst} alt="login first image" className='lg:w-[40rem] lg:h-[35rem] md:w-[40rem] md:h-[40rem] h-[25rem] w-[25rem]' />
                <p className='-mt-[3rem] text-xl text-center mx-3 text-gray-500'>Login First to unlock your personal finance dashboard and start tracking your money effortlessly!</p>
                <button
                    onClick={loginfirst}
                    className='border-2 mt-3 border-blue-500 py-2 px-5 rounded-lg  text-blue-500 hover:text-white hover:bg-blue-500 transition-all duration-300'
                >
                    Login
                </button>
            </div>
            <Footer/>

        </div>
    )
}

export default LoginFirst
