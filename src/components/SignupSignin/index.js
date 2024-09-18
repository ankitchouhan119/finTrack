import React, { useState } from 'react'
import './style.css'
import Input from '../Input/input'
import Button from '../Button/button';
import { setDoc, doc, db, provider, provider1 } from '../../firebase';
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/facebook'
import 'react-social-icons/google'
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth/web-extension';

function SignUpSignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const navigate = useNavigate();

  function Login() {
    console.log("email", email);
    console.log("password", password)
    setLoading(true);

    if (email != "" && password != "") {

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success("User Logged In")
          console.log("user logged in ", user)
          setLoading(false);
          navigate("/")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error("Invalid Email or Password!");
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }

  }

  function signUp() {
    setLoading(true);
    console.log("Name", name)
    console.log("email", email)
    console.log("password", password)
    console.log("confirmPassword", confirmPassword)


    // Authenticate the user, or basically create a new account using email and password


    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {

        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("User>>>", user)
            toast.success("User Created!");
            setLoading(false);
            setName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            createDoc(user);
            navigate("/")

            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and Confirm Password must be same !")
        setLoading(false);
      }

    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }

  }
  async function createDoc(user) {
    // make sure that the doc with the uid doesn't exist
    setLoading(true);

    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {

      try {
        await setDoc(doc(db, "users", user.uid,), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created")
        setLoading(false);
      } catch (e) {
        toast.error(e.message);

        setLoading(false);

      }
    } else {
      toast.error("Doc already exists")
      setLoading(false);
    }
  }


  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user>>", user)
        createDoc(user);
        navigate("/")
        toast.success("user authenticated!")
        setLoading(false);
        // IdP data available using getAdditionalUserInfo(result)
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
        
      });
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
    
  }

  function facebookAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider1)
        .then((result) => {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user>>", user);
          createDoc(user); // Save user to Firestore or your database
          navigate("/");
          toast.success("User authenticated!");
          setLoading(false);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className='signup-wrapper w-[70%] max-w-[450px] h-auto rounded-[1rem] px-[1.5rem] py-[1rem]'>
          <h2 className='title font-medium text-[1.2rem] text-center mb-3'>
            Login on <span style={{ color: "var(--theme)" }} className='text-xl font-semibold'>FinTrack</span>
          </h2>
          <form className='gap-2' >
            <Input label={"Email"}
              type={"email"}
              state={email}
              setState={setEmail}
              placeholder={"xyz@abc.com"} />
            <Input
              label={"Password"}
              type={"password"}
              state={password}
              setState={setPassword}
              placeholder={"Password"}
              showPasswordToggle={true}
            />
            <Button
              disabled={loading}
              text={loading ? "Login In..." : "Sign In"} onClick={Login} />
            <p className='text-center mb-[1rem] cursor-pointer' onClick={() => setLoginForm(!loginForm)}>Don't have an account? <span className='cursor-pointer underline text-blue-700'>Create Account</span></p>
            <div className='flex flex-row justify-between mb-3'>
              <div className='w-[43%] border-t-2 border-solid mt-3'></div>
              <p className='text-center m-0'>Or</p>
              <div className='w-[43%] border-t-2 border-solid mt-3'></div>
            </div>
            {/* <Button text={"Sign Up Using Google"} blue={true}/> */}

            <div className='flex justify-center w-full mt-2 text-sm gap-3'>
              <button onClick={googleAuth}>
                <SocialIcon
                  url="https://www.google.com"
                  style={{ width: '2.5rem', height: '2.5rem' }}
                />
              </button>
              <button onClick={facebookAuth}>
                <SocialIcon
                  url="https://www.facebook.com"
                  style={{ width: '2.5rem', height: '2.5rem' }}
                />
              </button>
            </div>


          </form>
        </div>)
        :

        <div className='signup-wrapper w-[70%] max-w-[450px] h-auto rounded-[1rem] px-[1.5rem] py-[1rem]'>
          <h2 className='title font-medium text-[1.2rem] text-center mb-3'>
            Sign Up on <span style={{ color: "var(--theme)" }} className='text-xl font-semibold'>FinTrack</span>
          </h2>
          <form className='gap-2' >
            <Input label={"Full Name"}
              type={"text"}
              state={name}
              setState={setName}
              placeholder={"Full Name"} />
            <Input label={"Email"}
              type={"email"}
              state={email}
              setState={setEmail}
              placeholder={"xyz@abc.com"} />
            <Input
              label={"Password"}
              type={"password"}
              state={password}
              setState={setPassword}
              placeholder={"Password"}
              showPasswordToggle={true}
            />
            <Input
              label={"Confirm Password"}
              type={"password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Confirm Password"}
              showPasswordToggle={true}
            />
            <Button
              disabled={loading}
              text={loading ? "Creating Account..." : "Sign Up"} onClick={signUp} />
            <p className='text-center mb-[1rem] cursor-pointer' onClick={() => setLoginForm(true)}>Already have an account? <span className='cursor-pointer underline text-blue-700'>Login</span></p>
            <div className='flex flex-row justify-between mb-3'>
              <div className='w-[43%] border-t-2 border-solid mt-3'></div>
              <p className='text-center m-0'>Or</p>
              <div className='w-[43%] border-t-2 border-solid mt-3'></div>
            </div>
            {/* <Button text={"Sign Up Using Google"} blue={true}/> */}

            <div className='flex justify-center w-full mt-2 text-sm gap-3'>
              <button onClick={googleAuth}>
                <SocialIcon
                  url="https://www.google.com"
                  style={{ width: '2.5rem', height: '2.5rem' }}
                />
              </button>

              <button>
                <SocialIcon
                  url="https://www.facebook.com"
                  style={{ width: '2.5rem', height: '2.5rem' }}
                />
              </button>
            </div>


          </form>
        </div>}


    </>
  )
}

export default SignUpSignIn
