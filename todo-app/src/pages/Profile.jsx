import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import { convertBase64 } from '../helper';
import EditProfile from '../components/EditProfile';
import profile from '../assets/profile.jpg';

function Profile(props) {
    const init = {
        DOB: "",
        gender: "",
        phone: ""
    };

    const [imgVal, setImgVal] = useState("");
    const { user, updateUser , message ,setMessage } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState(init);

    useEffect(() => {
        if (user) {
            setUserDetails({
                DOB: user.DOB,
                gender: user.gender,
                phone: user.phone
            });
        }
    }, [user]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [message, setMessage]);

    const handleImage = async (e) => {
        let file = e.target.files[0];
        let imgString = await convertBase64(file);
        setImgVal(imgString);
    };

    const handleDetails = (updatedDetails) => {
        setUserDetails(updatedDetails);
    };

    return (
        <div className='container bg-dark mt-5 p-5 h-50 w-50'>
            <div className='row'>
                <div className='col-md-4'>
                {imgVal ? (
                        <img className='img-fluid img' src={imgVal} alt='profilepic' />
                    ) : (
                        <>
                            <input type='file' onChange={handleImage} />
                            <img className='img-fluid img' src={profile} alt='profilepic' />
                        </>
                    )}
                </div>
                <div className='col-md-7 text-white text-top-right'>
                    <p><b>{user?.name}</b></p>
                    <p>{user?.email}</p>
                    <p>{userDetails?.DOB}</p>
                    <p>{userDetails?.gender}</p>
                    <p>{userDetails?.phone}</p>
                    <button className='btn btn-primary p-2 w-50 mb-5 mt-4 button text-black' data-bs-toggle="modal" data-bs-target="#profile-modal">
                        <b>Edit Profile</b>
                    </button>
                    
                        {message && <div className="alert alert-info mt-3">{message}</div>}
        
                </div>
            </div>
            <EditProfile userDetails={userDetails} handleDetails={handleDetails} updateUser={updateUser} />
        </div>
    );
}

export default Profile;
