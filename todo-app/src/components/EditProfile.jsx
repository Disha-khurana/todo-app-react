import React, { useState, useContext } from 'react';
import AuthContext from '../auth/AuthContext';

function EditProfile({ userDetails, handleDetails, updateUser }) {
    const { user } = useContext(AuthContext);
    const [updatedDetails, setUpdatedDetails] = useState({
        DOB: userDetails?.DOB,
        gender: userDetails?.gender,
        phone: userDetails?.phone,
        id: user?.id
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedDetails((prev) => ({
            ...prev,
            [name]: value,
            id: user.id
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(updatedDetails);
        handleDetails(updatedDetails);
    };

    return (
        <div className="modal fade" id="profile-modal" tabIndex="-1" aria-labelledby="profile-modal-label" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content bg-primary text-white">
                    <div className="modal-header">
                        <h5 className="modal-title" id="profile-modal-label">Edit Profile Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="DOB" className="form-label">Date of Birth</label>
                                <input
                                    type="date"
                                    name="DOB"
                                    value={updatedDetails.DOB}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Gender</label>
                                <div>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={updatedDetails.gender === "Male"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="male" className="form-check-label"> Male </label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={updatedDetails.gender === "Female"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="female" className="form-check-label"> Female </label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Other"
                                        checked={updatedDetails.gender === "Other"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="other" className="form-check-label"> Other </label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Contact No.</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={updatedDetails.phone}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter contact number"
                                />
                            </div>
                            <button type="submit" className="btn btn-light">Save Changes</button>
                            <button type="button" className="btn btn-warning ms-2" data-bs-dismiss="modal">Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
