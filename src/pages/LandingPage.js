import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import Header from '../components/Header';
import secure from '../components/assets/secure.png'
import users from '../components/assets/Users.png'
import review from '../components/assets/review.png'
import badge from '../components/assets/badge.png'
import food from '../components/assets/food.png'
import shopping from '../components/assets/shopping.png'
import beverage from '../components/assets/beverage.png'
import pie from '../components/assets/piechart.png'
import graph from '../components/assets/graph.png'
import csv_exp from '../components/assets/csv_exp.png'
import csv_imp from '../components/assets/csv_imp.png'
import table from '../components/assets/table.png'
import Footer from '../components/Footer/footer';
import { motion } from 'framer-motion';
import { apiFetch } from '../utils/api';
import { toast } from 'react-toastify';
import { Helmet } from "react-helmet-async";

function LandingPage() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    function dashboard() {
        if (user) {
            navigate("/dashboard");
        } else {
            navigate("/loginFirst");
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const data = await apiFetch("/api/users/profile");
                    setUsername(data?.name || "");
                } catch (e) {
                    console.error(e);
                    // toast.error("User data not found!");
                }
            }
        };

        fetchUserData();
    }, [user]);

    return (

        <div className=''>
            <Helmet>
                <title>FinTrack – Simple & Secure Personal Expense Tracker</title>
                <meta
                    name="description"
                    content="FinTrack helps you track income and expenses, analyze spending, manage budgets, and export reports easily. Simple, secure, and fast money management."
                />
                <meta
                    name="keywords"
                    content="expense tracker, money manager, budget planner, personal finance app, income expense tracker"
                />
                <link rel="canonical" href="https://fintrack-119.web.app/" />

                {/* Open Graph */}
                <meta property="og:title" content="FinTrack – Expense & Budget Tracker" />
                <meta
                    property="og:description"
                    content="Track expenses, manage budgets, analyze spending, and export CSV reports easily."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://fintrack-119.web.app/" />
            </Helmet>

            <Header />
            <div className='w-full lg:h-[60vh] h-[35vh] gap-4 flex justify-center items-center flex-col text-center'>
                <motion.h1
                    initial={{ x: -100, opacity: 0 }}  // Starts off-screen above
                    animate={{ x: 0, opacity: 1 }}     // Slides to original position
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className='lg:text-6xl text-4xl font-semibold text-blue-500'>Simplify Budgeting</motion.h1>
                <motion.h2
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className='lg:text-6xl text-4xl text-gray-500'> with Easy <span className='font-semibold  text-blue-500'>Expense Tracking</span> </motion.h2>
                {user ? <button

                    onClick={dashboard}
                    className='border-2 border-blue-500 mt-9 px-5 py-2 rounded-lg text-blue-500 hover:text-white hover:bg-blue-500 transition-all duration-300'
                >
                    {username ? `${username}'s Dashboard` : "Dashboard"}
                </button> : <button

                    onClick={dashboard}
                    className='border-2 border-blue-500 mt-9 px-5 py-2 rounded-lg text-blue-500 hover:text-white hover:bg-blue-500 transition-all duration-300'
                >
                    Dashboard
                </button>}

            </div>


            <div className='flex justify-center items-center mb-[5rem]'>

                <div className='flex justify-center items-center flex-col lg:flex-row gap-5 w-[80%]'>
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className='flex justify-center shadow1 items-center w-full lg:w-[25%] flex-col gap-1 bg-blue-100 p-7 rounded-md'>
                        <div className='border-[.7rem] border-gray-300 rounded-full p-3 hover:border-blue-500 transition-all duration-200 cursor-pointer'>
                            <img className='w-[5rem]' loading="lazy" src={secure} alt="Secure expense tracking" />
                        </div>
                        <p className='text-lg font-semibold'>100% Secured Data</p>
                    </motion.div>
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className='flex lg:w-[25%] shadow1 w-full justify-center items-center flex-col gap-2 bg-blue-100 p-7 rounded-md'>
                        <div className='border-[.7rem] border-gray-300 rounded-full p-3 hover:border-sky-500 transition-all duration-200 cursor-pointer'>
                            <img className='w-[5rem]' loading="lazy" src={users} alt="Trusted personal finance app users" />
                        </div>
                        <p className='text-lg font-semibold'>Trusted by Thousands</p>
                    </motion.div>
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className='flex lg:w-[25%] shadow1 w-full justify-center items-center flex-col gap-2 bg-blue-100 p-7 rounded-md'>
                        <div className='border-[.7rem] border-gray-300 rounded-full p-3 hover:border-indigo-500 transition-all duration-200 cursor-pointer'>
                            <img className='w-[5rem]' loading="lazy" src={review} alt="Highly rated expense tracking app" />
                        </div>
                        <p className='text-lg font-semibold'>Highly Rated</p>
                    </motion.div>
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className='flex lg:w-[25%] shadow1 w-full justify-center items-center flex-col gap-2 bg-blue-100 p-7 rounded-md'>
                        <div className='border-[.7rem] border-gray-300 rounded-full p-3 hover:border-yellow-500 transition-all duration-200 cursor-pointer'>
                            <img className='w-[5rem]' loading="lazy" src={badge} alt="Award winning expense tracker" />
                        </div>
                        <p className='text-lg font-semibold'>App of the day</p>
                    </motion.div>
                </div>
            </div>


            <div className='flex mb-[6rem] justify-center items-center'>
                <div className='flex flex-col lg:flex-row  justify-center items-center w-[80%] gap-10'>
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className='lg:w-[40%] w-full shadow1 rounded-md p-10 flex flex-row justify-between items-center gap-1'>
                        <div className='flex justify-center items-center flex-col gap-2 '>
                            <p className='border-b-2 border-red-300 text-lg font-semibold text-gray-500'>Food</p>
                            <img src={food} className='w-[5rem]' alt="Food expense tracking" loading="lazy" />
                            <p>₹ 500</p>
                        </div>
                        <div className='flex justify-center items-center flex-col  '>
                            <p className='border-b-2 border-red-300 text-lg font-semibold text-gray-500'>Shop</p>
                            <img src={shopping} className='w-[5rem]' alt="Shopping expense tracking" loading="lazy" />
                            <p>₹ 1,200</p>
                        </div>
                        <div className='flex justify-center items-center flex-col gap-2'>
                            <p className='border-b-2 border-red-300 text-lg font-semibold text-gray-500'>Beverages</p>
                            <img src={beverage} className='w-[5rem]' alt="Beverage expense tracking" loading="lazy" />
                            <p>₹ 1,415</p>
                        </div>


                    </motion.div>
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className='lg:w-[40%] w-full  gap-3 flex flex-col'>
                        <h1 className='text-3xl font-semibold'>Quick & Simple Money Tracker</h1>
                        <p className='text-md text-gray-500'>Record your daily transactions in seconds! Easily categorize them with clear visuals—like Expenses for Food and Shopping, or Income from Salary and Gifts.</p>
                    </motion.div>
                </div>
            </div>


            <div className='flex justify-center mb-[6rem] items-center'>
                <div className='flex lg:flex-row flex-col justify-center items-center w-[80%] gap-10'>

                    <div className='lg:w-[40%] w-full gap-3 flex flex-col'>
                        <h1 className='text-3xl font-semibold'>Everything you need, perfectly in one place.</h1>
                        <p className='text-md text-gray-500'>One report to clearly show your spending habits. Track where your money comes from and where it goes with simple, easy-to-read graphs.</p>
                    </div>
                    <div className='lg:w-[40%] w-full shadow1 rounded-md p-10 flex flex-row justify-between items-center'>

                        <div className='flex justify-center items-center flex-col gap-2 '>
                            <p className='border-b-2 border-red-300 text-lg font-semibold text-gray-500'>Transaction Analysis</p>
                            <img src={graph} className='w-[80%]' alt="Expense analysis graph" loading="lazy" />

                        </div>
                        <div className='flex justify-center items-center flex-col gap-2 '>
                            <p className='border-b-2 border-red-300 text-lg font-semibold text-gray-500'>Expenses</p>
                            <img src={pie} className='w-[80%]' alt="Expense distribution pie chart" loading="lazy" />

                        </div>



                    </div>
                </div>
            </div>



            <div className='flex justify-center mb-[6rem] items-center'>
                <div className='flex lg:flex-row flex-col justify-center items-center w-[80%] gap-10'>


                    <div className='lg:w-[40%] w-full shadow1 rounded-md p-10 flex flex-row justify-between items-center'>

                        <div className='flex justify-center items-center flex-col gap-2 '>
                            <p className='border-b-2 border-red-300 text-lg font-semibold text-gray-500'>CSV Export</p>
                            <img src={csv_exp} className='w-[80%]' alt="Export expenses to CSV" loading="lazy" />

                        </div>
                        <div className='flex justify-center items-center flex-col gap-2 '>
                            <p className='border-b-2 border-red-300 text-lg font-semibold text-gray-500'>CSV Import</p>
                            <img src={csv_imp} className='w-[80%]' alt="Import expenses from CSV" loading="lazy" />

                        </div>
                        <div className='flex justify-center items-center flex-col gap-2 '>
                            <p className='border-b-2 border-red-300 text-lg font-semibold text-gray-500'>Table</p>
                            <img src={table} className='w-[80%]' alt="Expense data table view" loading="lazy" />

                        </div>



                    </div>
                    <div className='lg:w-[40%] w-full gap-3 flex flex-col'>
                        <h1 className='text-3xl font-semibold'>Seamless CSV Import & Export</h1>
                        <p className='text-md text-gray-500'>Effortlessly import and export your data with CSV support. Quickly upload your transaction history or download detailed reports, making it easier than ever to manage and analyze your finances.</p>
                    </div>
                </div>
            </div>

            <Footer />


        </div>
    )
}

export default LandingPage;
