import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import EditProfile from '../components/EditProfile';
import { formatProfileDate } from '../helper/index';

function Profile(props) {
    const init = {
        DOB: "",
        gender: "",
        phone: "",
        designation:"",
        image:""
    };

    const [imgVal, setImgVal] = useState("");
    const { user, updateUser , message ,setMessage } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState(init);

    useEffect(() => {
        if (user) {
            setUserDetails({
                DOB: user.DOB,
                gender: user.gender,
                phone: user.phone,
                designation: user.designation,
                image: user.image
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


    const handleDetails = (updatedDetails) => {
        setUserDetails(updatedDetails);
    };

    return (
        <div className='container bg-dark mt-5 p-5 h-70 w-60'>
            <div className='row'>
                <div className='col-md-4'>
                <img src={userDetails.image || imgVal} className="card-img-top" alt="..." style={{ width: '100%', border:"2px solid"}} />
                </div>
                <div className='col-md-7 text-white text-top-right'>
                    <p><b>{user?.name}</b></p>
                    <p>{user?.email}</p>
                    <p>{formatProfileDate(userDetails?.DOB)}</p>
                    <p>{userDetails?.gender}</p>
                    <p>{userDetails?.phone}</p>
                    <p>{userDetails?.designation}</p>
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
