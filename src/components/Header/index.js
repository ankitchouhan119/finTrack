import React, { useEffect } from 'react'
import './style.css'
import { auth } from '../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import userImg from '../../components/assets/profile.png'

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     navigate("/dashboard");
  //   }
  // }, [user, loading]);

  useEffect(() => {
    if (user && window.location.pathname !== "/landingPage") {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);
  

  function logoutFunc() {
    try {
      signOut(auth)
      .then(() => {
        toast.success("Logged Out Successfully!")
        navigate("/");
      })

      .catch((error) => {
        toast.error(error.message);
      });
      
    } catch (e) {
      toast.error(e.message);
    }
  }

  function home(){
    navigate("/landingPage")
  }
  console.log("environment", process.env.REACT_APP_PROJECT_ID)

  // useEffect(() => {
  //   if (user) {
  //     console.log("Full User Details:", user);
  //     console.log("User UID:", user.uid);
  //     console.log("User Display Name:", user.displayName);
  //     console.log("User Email:", user.email);
  //     console.log("User Photo URL:", user.photoURL);
  //   }
  // }, [user]);

  return (
    <div className='navbar py-[0.2rem] px-[1.5rem] sticky top-0 left-0 flex justify-between item-center'>
      <div 
       className="logo font-medium  text-xl m-0 text-white flex justify-start items-center">
        <img src="logo2.png" className='w-[10%] cursor-pointer' alt="Logo" onClick={home}/>
        
        <p className='font-semibold  text-xl px-2 cursor-pointer' onClick={home}>
          FinTrack
        </p>
      </div>
      {user && (

      <div className='logout link font-medium  text-xl m-0 text-white flex justify-start items-centert py-3 gap-2 mr-3'>
        <img src={user.photoURL ? user.photoURL: userImg} alt="" className='rounded-full  border-1SSSS border-white h-[2rem] w-[2rem]' style={{}}/>
        <p onClick={logoutFunc} className='cursor-pointer opacity-[0.8] hover:opacity-[1] hover:transition-all  '>Logout</p>
      </div>
      )}
    </div>
  )
}

export default Header
