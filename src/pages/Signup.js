import React from 'react'
import Header from '../components/Header'
import SignUpSignIn from '../components/SignupSignin'

function Signup() {
  return (
    <div>
      <Header/>
      <div className="wrapper flex justify-center items-center w-[100%] h-[90vh] border-2 border-solid ">
        <SignUpSignIn/>
      </div>
    </div>
  )
}

export default Signup
