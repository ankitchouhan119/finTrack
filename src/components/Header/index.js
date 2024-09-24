import React, { useEffect, useState } from 'react';
import './style.css';
import { auth, db, doc } from '../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { signOut, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import userImg from '../../components/assets/profile.png';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { getDoc } from 'firebase/firestore';

function Header() {
    const [user] = useAuthState(auth); // Firebase auth user
    const [userData, setUserData] = useState({}); // Firestore user data
    const [photoUrl, setPhotoUrl] = useState(user?.photoURL || userImg); // State for profile photo
    const navigate = useNavigate();

    // Fetch user data from Firestore
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userSnapshot = await getDoc(userRef);

                if (userSnapshot.exists()) {
                    const userInfo = userSnapshot.data();
                    setUserData(userInfo);

                    // If Firestore has a different photoURL, update it
                    if (userInfo.photoURL && userInfo.photoURL !== user.photoURL) {
                        // Update Firebase auth profile with the new photoURL
                        await updateProfile(user, { photoURL: userInfo.photoURL });
                        setPhotoUrl(userInfo.photoURL); // Update the displayed photo
                        toast.success("Profile photo updated!");
                    }
                } else {
                    toast.error('No user data found!');
                }
            }
        };

        fetchUserData();
    }, [user]); // Dependency on the user state

    function logoutFunc() {
        try {
            signOut(auth)
                .then(() => {
                    toast.success("Logged Out Successfully!");
                    navigate("/");
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        } catch (e) {
            toast.error(e.message);
        }
    }

    function loginFunc() {
        navigate("/signup");
    }

    function home() {
        navigate("/");
    }

    function profile() {
        navigate("/profile");
    }

    return (
        <div className='navbar py-[0.2rem] px-[1.5rem] sticky top-0 left-0 flex justify-between items-center'>
            <div className="logo font-medium text-xl m-0 text-white flex justify-start items-center">
                <img src="logo2.png" className='w-[10%] cursor-pointer' alt="Logo" onClick={home} />
                <p className='font-semibold text-xl px-2 cursor-pointer' onClick={home}>
                    FinTrack
                </p>
            </div>

            {user ? (
                <div className='logout link font-medium text-xl m-0 text-white flex justify-start items-center py-3 gap-2 mr-5'>
                    {/* Profile dropdown */}
                    <Menu as="div">
                        <div>
                            <MenuButton>
                                <img 
                                    src={photoUrl} 
                                    alt="" 
                                    className='rounded-full border-1 border-white h-[2rem] w-[4rem] lg:h-[2rem] lg:w-[2rem] md:h-[2.5rem] md:w-[2.5rem] sm:h-[2.5rem] sm:w-[2.5rem]' 
                                />
                            </MenuButton>
                        </div>
                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <MenuItem>
                                <a onClick={profile} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                    Your Profile
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a onClick={logoutFunc} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                    Sign out
                                </a>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
            ) : (
                <button onClick={loginFunc} className='loginButton text-white text-xl cursor-pointer mr-5'>
                    Login
                </button>
            )}
        </div>
    );
}

export default Header;
