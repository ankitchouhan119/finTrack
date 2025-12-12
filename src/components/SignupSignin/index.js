import { useState } from 'react'
import './style.css'
import Input from '../Input/input'
import Button from '../Button/button';
import { auth, provider, provider1 } from '../../firebase';
import { SocialIcon } from 'react-social-icons'

import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function SignUpSignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const navigate = useNavigate();

  function Login() {
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          toast.success("User Logged In");
          setLoading(false);
          navigate("/");
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Invalid Email or Password!");
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  async function signUp() {
    setLoading(true);
    if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          toast.success("User Created!");
          // create profile on backend
          const token = await user.getIdToken();
          await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/users/profile`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              profile: {
                name: name,
                email: user.email,
                photoURL: user.photoURL || "",
                createdAt: new Date().toISOString()
              }
            })
          });
          setLoading(false);
          setName(""); setEmail(""); setPassword(""); setConfirmPassword("");
          navigate("/");
        } catch (error) {
          setLoading(false);
          toast.error(error.message || "Signup failed");
        }
      } else {
        toast.error("Password and Confirm Password must be same !");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/users/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({
          profile: {
            name: user.displayName || name,
            email: user.email,
            photoURL: user.photoURL || "",
            createdAt: new Date().toISOString()
          }
        })
      });
      toast.success("Doc created");
    } catch (e) {
      console.error(e);
      toast.error("Failed to create user doc");
    }
  }

  async function googleAuth() {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createDoc(user);
      navigate("/");
      toast.success("user authenticated!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Google auth failed");
    }
  }

  async function facebookAuth() {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider1);
      const user = result.user;
      await createDoc(user);
      navigate("/");
      toast.success("User authenticated!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Facebook auth failed");
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
            <Input label={"Email"} type={"email"} state={email} setState={setEmail} placeholder={"xyz@abc.com"} />
            <Input label={"Password"} type={"password"} state={password} setState={setPassword} placeholder={"Password"} showPasswordToggle={true} />
            <Button disabled={loading} text={loading ? "Login In..." : "Sign In"} onClick={Login} />
            <p className='text-center mb-[1rem] cursor-pointer' onClick={() => setLoginForm(!loginForm)}>Don't have an account? <span className='cursor-pointer underline text-blue-700'>Create Account</span></p>
            <div className='flex justify-center w-full mt-2 text-sm gap-3'>
              <button type="button" onClick={googleAuth}>
                <SocialIcon url="https://www.google.com" style={{ width: '2.5rem', height: '2.5rem' }} />
              </button>
              <button type="button" onClick={facebookAuth}>
                <SocialIcon url="https://www.facebook.com" style={{ width: '2.5rem', height: '2.5rem' }} />
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
            <Input label={"Full Name"} type={"text"} state={name} setState={setName} placeholder={"Full Name"} />
            <Input label={"Email"} type={"email"} state={email} setState={setEmail} placeholder={"xyz@abc.com"} />
            <Input label={"Password"} type={"password"} state={password} setState={setPassword} placeholder={"Password"} showPasswordToggle={true} />
            <Input label={"Confirm Password"} type={"password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"Confirm Password"} showPasswordToggle={true} />
            <Button disabled={loading} text={loading ? "Creating Account..." : "Sign Up"} onClick={signUp} />
            <p className='text-center mb-[1rem] cursor-pointer' onClick={() => setLoginForm(true)}>Already have an account? <span className='cursor-pointer underline text-blue-700'>Login</span></p>
            <div className='flex justify-center w-full mt-2 text-sm gap-3'>
              <button type="button" onClick={googleAuth}>
                <SocialIcon url="https://www.google.com" style={{ width: '2.5rem', height: '2.5rem' }} />
              </button>
              <button type="button" onClick={facebookAuth}>
                <SocialIcon url="https://www.facebook.com" style={{ width: '2.5rem', height: '2.5rem' }} />
              </button>
            </div>
          </form>
        </div>}
    </>
  )
}

export default SignUpSignIn
