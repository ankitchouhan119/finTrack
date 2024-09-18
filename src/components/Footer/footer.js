import React from 'react'
import { useNavigate } from 'react-router-dom'

function Footer() {
    const navigate = useNavigate();
    function home(){
        navigate("/landingPage")
      }
    return (
        <footer className="px-3 pt-4 lg:px-9 border-t-2 bg-blue-400">
            <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">

                <div className="sm:col-span-2">
                    <div
                        className="logo font-medium  text-xl m-0 text-white flex justify-start items-center">
                        <img src="logo2.png" className='w-[10%] cursor-pointer' alt="Logo" onClick={home} />

                        <p className='font-semibold  text-xl px-2 cursor-pointer' onClick={home}>
                            FinTrack
                        </p>
                    </div>
                    <div className="mt-6 lg:max-w-xl">
                        <p className="text-sm text-white">
                        FinTrack helps you effortlessly manage daily transactions with quick recording and easy categorization for income and expenses. Get clear insights into your spending habits through simple, visually appealing reports. Seamlessly import and export data using CSV support to analyze your finances with ease.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col text-white justify-center items-center  gap-2 text-sm">
                    <p className="text-base font-bold tracking-wide text-white">Popular Features</p>
                    <a href="#">Transaction Analysis</a>
                    <a href="#">Expenses</a>
                    <a href="#">Export CSV</a>
                    <a href="#">Import CSV</a>
                   
                </div>

                <div className='flex flex-col justify-center items-center'>
                    {/* <p className="text-base font-bold tracking-wide text-white">COMPANY IS ALSO AVAILABLE ON</p>
                    <div className="flex items-center gap-1 px-2">
                        <a href="#" className="w-full min-w-xl">
                            <img src="https://mcqmate.com/public/images/icons/playstore.svg" alt="Playstore Button"
                                className="h-10" />
                        </a>
                        <a className="w-full min-w-xl" href="https://www.youtube.com/channel/UCo8tEi6SrGFP8XG9O0ljFgA">
                            <img src="https://mcqmate.com/public/images/icons/youtube.svg" alt="Youtube Button"
                                className="h-28" />
                        </a>
                    </div> */}
                    <p className="text-base font-bold tracking-wide text-white">Contacts</p>
                    <div className="flex text-white">
                        <p className="mr-1 text-white">Email:</p>
                        <a href="#" title="send email">admin@company.com</a>
                    </div>
                </div>

            </div>

            <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
                <p className="text-sm text-white">© Copyright 2024 FinTrack. All rights reserved.</p>
                <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                    <li>
                        <a href="#"
                            className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400">Privacy
                            &amp; Cookies Policy
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400">Disclaimer
                        </a>
                    </li>
                </ul>
            </div>

        </footer>
    )
}

export default Footer
