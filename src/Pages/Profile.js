import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
    const token = useSelector(state => state.auth.token)
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "" })
    const [isUpdated, setIsUpdated] = useState(false)
    const userName = formData?.firstName + " " + formData?.lastName


    const updateHandler = async (e) => {
        try {
            let res = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDXcVIOVTYP4MQZwzkEHgb-OgLvYj0Rl28", { displayName: userName, email: formData?.email, idToken: token?.idToken });
            const data = res?.data
            const fullName = data?.displayName?.split(" ")
            setFormData({ email: data?.email, firstName: fullName[0], lastName: fullName[1] })
            setIsUpdated(true)
        } catch (error) {
            console.log(error, "erroo")
        }
    };


    const fetchProfileData = useCallback(async () => {
        try {
            const res = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDXcVIOVTYP4MQZwzkEHgb-OgLvYj0Rl28", { idToken: token?.idToken })
            const data = res?.data?.users[0]
            const fullName = data?.displayName?.split(" ")
            setFormData({ email: data?.email, firstName: fullName[0], lastName: fullName[1] })
        } catch (err) {
            console.log(err)
        }
    }, [token?.idToken])

    useEffect(() => {
        fetchProfileData()
    }, [fetchProfileData])


    const changeHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <section className="profile">
            <div className="container">
                <div className="row gutters">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 avtar_section">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <div className="user-avatar">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Maxwell Admin" />
                                        </div>
                                        <h5 className="user-name">{userName}</h5>
                                        <h6 className="user-email">{formData?.email}</h6>
                                    </div>
                                    <div className="about">
                                        <h5 className="mb-2 text-primary">About</h5>
                                        <p>I'm {userName}. I strive to bring my best, leveraging my skills, knowledge, and dedication to achieve excellence.".</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-3 text-primary">Personal Details</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="fullName">First Name</label>
                                            <input type="text" name="firstName" className="form-control" id="fullName" placeholder="Enter full name" onChange={changeHandler} value={formData?.firstName} required />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="lastname">Last Name</label>
                                            <input type="text" name="lastName" className="form-control" id="lastname" placeholder="Enter last name" onChange={changeHandler} value={formData?.lastName} required />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="phone">Email</label>
                                            <input type="email" name="email" className="form-control" id="phone" placeholder="Enter phone number" onChange={changeHandler} value={formData?.email} required />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="website">Website URL</label>
                                            <input type="url" className="form-control" id="website" placeholder="Website url" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-6 col-12" >
                                        <div className="form-group address">
                                            <label htmlFor="zIp">Address</label>
                                            <input type="text" className="form-control" id="zIp" placeholder="Address is readOnly. you can not update it." readOnly />
                                        </div>
                                    </div>
                                </div>
                                {isUpdated && <p className="isUpdated">profile is updated successfully</p>}
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="text-right">
                                            <button type="button" id="submit" name="submit" className="btn btn-secondary" onClick={() => fetchProfileData()}>Cancel</button>
                                            <button type="button" id="submit" name="submit" className="btn btn-primary" onClick={updateHandler}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile