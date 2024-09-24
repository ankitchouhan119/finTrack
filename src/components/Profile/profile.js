import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../firebase';
import Header from '../Header';
import Footer from '../Footer/footer';
import { toast } from 'react-toastify';
import { HomeIcon } from 'lucide-react';

function Profile() {
    const navigate = useNavigate();
    const [user] = useAuthState(auth); // Get the authenticated user
    const [userData, setUserData] = useState({});
    const [editMode, setEditMode] = useState(false); // For enabling/disabling edit mode
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        photoURL: ''
    });

    // Fetch user data from Firestore
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userSnapshot = await getDoc(userRef);

                if (userSnapshot.exists()) {
                    const userInfo = userSnapshot.data();
                    setUserData(userInfo);
                    setFormData({
                        name: userInfo.name,
                        email: userInfo.email,
                        mobileNumber: userInfo.mobileNumber,
                        photoURL: userInfo.photoURL
                    });
                } else {
                    toast.error('No user data found!');
                }
            }
        };

        fetchUserData();
    }, [user]);

    // Handle input change for editing profile
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Save updated details to Firestore
    const handleSave = async () => {
        if (!user) return toast.error("User not authenticated");

        const userRef = doc(db, 'users', user.uid);
        try {
            await updateDoc(userRef, {
                name: formData.name,
                email: formData.email,
                mobileNumber: formData.mobileNumber,
                photoURL: formData.photoURL
            });
            setUserData(formData); // Update the displayed user data
            setEditMode(false); // Exit edit mode
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile: ', error);
            toast.error('Failed to update profile');
        }
    };

    // Enable edit mode
    const enableEditMode = () => {
        setEditMode(true);
    };

    function landingPage(){
        navigate("/")
    }

    return (
        <div>
            <Header />
            <div className='w-[100%] flex justify-center items-center'>

                <div className=" h-[80vh] lg:w-[70%] md:w-[70%] w-[90%] flex justify-center flex-col  border-2 border-blue-500 items-center rounded-3xl shadow1 my-10">
                    <div className='w-full  flex justify-end  '>

                <button
                    onClick={landingPage}
                    className='border-2 mx-5 border-blue-500 text-gray-500 p-1 mt-3 ml-6 rounded-lg hover:text-white hover:bg-blue-500 transition-all duration-200'
                  >
                    <HomeIcon className="w-5 h-5 transition-all duration-100" />
                  </button>
                    </div>
                    <div className='w-[95%] flex justify-center items-center my-5  '>
                        <p className='lg:text-2xl md:text-2xl text-2xl font-semibold border-b-2 border-gray-500 text-gray-500 text-center'><span className='text-blue-500 '>{userData.name}'s</span> Profile</p>

                    </div>

                    {/* Show user details or input fields based on edit mode */}
                    {editMode ? (
                        <div className='flex flex-col justify-center items-center gap-7 w-[90%]'>
                            <div className='flex flex-row justify-between items-center w-[100%]'>
                                <label>
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className='border-2 border-blue-400 px-5 py-2 rounded-lg focus:outline-none focus:border-blue-600 focus:shadow-lg'
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex flex-row justify-between items-center w-[100%]'>
                                <label>
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    disabled
                                    className='border-2 border-blue-200 px-5 py-2 rounded-lg focus:outline-none focus:border-blue-600 focus:shadow-lg'
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex flex-row justify-between items-center w-[100%]'>
                                <label>
                                    Mobile Number:
                                </label>
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    className='border-2 border-blue-400 px-5 py-2 rounded-lg focus:outline-none focus:border-blue-600 focus:shadow-lg'
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                />

                            </div>
                            <div className='flex flex-row justify-between items-center w-[100%]'>
                                <label>
                                    Profile Photo URL:
                                </label>
                                <input
                                    type="text"
                                    name="photoURL"
                                    className='border-2 border-blue-400 px-5 py-2 rounded-lg focus:outline-none focus:border-blue-600 focus:shadow-lg'
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                />
                            </div>



                            <div className='flex gap-5'>
                                <button className='border-2 border-green-500 mt-9 px-5 py-2 rounded-lg text-green-500 shadow1 hover:text-white hover:bg-green-500 transition-all duration-300' onClick={handleSave}>Save Changes</button>
                                <button className='border-2 border-red-500 mt-9 px-5 py-2 rounded-lg text-red-500 shadow1 hover:text-white hover:bg-red-500 transition-all duration-300' onClick={() => setEditMode(false)}>Cancel</button>
                            </div>

                        </div>
                    ) : (
                        <div className='flex flex-col justify-center items-center gap-7 w-[80%]'>
                            <div className='flex flex-row justify-between items-center lg:w-[80%] md:w-[80%] w-[100%] '>
                                <p><strong>Profile Photo:</strong> </p>
                                <p><img src={userData.photoURL} alt="Profile" className='w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] md:w-[100px] md:h-[100px] rounded-full' /></p>

                            </div>
                            <div className='flex flex-row justify-between lg:w-[80%] md:w-[80%] w-[100%]'>
                                <p><strong>Name:</strong> </p>
                                <p>{userData.name}</p>

                            </div>
                            <div className='flex flex-row justify-between lg:w-[80%] md:w-[80%] w-[100%]'>
                                <p><strong>Email:</strong> </p>
                                <p>{userData.email}</p>

                            </div>
                            <div className='flex flex-row justify-between lg:w-[80%] md:w-[80%] w-[100%] gap-2'>
                                <p><strong>Mobile Number:</strong> </p>
                                <p>{userData.mobileNumber}</p>

                            </div>



                            <button className='border-2 border-blue-500 mt-9 px-5 py-2 rounded-lg text-blue-500 shadow1 hover:text-white hover:bg-blue-500 transition-all duration-300' onClick={enableEditMode}>Update Profile</button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
