import { useState } from "react";
import { useSelector } from "react-redux";




const Profile = () => {
    const token = useSelector(state=> state.auth.token)
    const userName = token?.displayName?.split(" ")
    const [formData, setFormData] = useState({firstName:userName[0]||"",lastName:userName[1]||"", email:token?.email})
    
    // const updateProfile = async() => {
    //     let url = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDXcVIOVTYP4MQZwzkEHgb-OgLvYj0Rl28";
    //     try {
    //         await axios.post(url, { requestType: "UPDATE", idToken });
    //     } catch (error) {

    //     }
    // };

    const changeHandler = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };

    return (
        <section className="profile">
            <div className="profile_inner_div">
                <h2>USER INFORMATION</h2>
                <form>
                    <div className="form_group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter Name" value={userName} onChange={changeHandler} />
                    </div>
                    <div className="form_group">
                        <label htmlFor="email">Email address</label>
                        <input type="text" id="email" name="email" placeholder="Enter Email" value={formData.email} onChange={changeHandler}/>
                    </div>
                    <div className="form_group">
                        <label htmlFor="FirstName">First name</label>
                        <input type="text" id="FirstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={changeHandler}/>
                    </div>
                    <div className="form_group">
                        <label htmlFor="LastName">Last name</label>
                        <input type="text" id="LastName" name="lsatName" placeholder="Last Name"  value={formData?.lastName} onChange={changeHandler}/>
                    </div>
                    <div className="form_group textarea">
                        <label htmlFor="About">About Me</label>
                        <textarea type="About" name="aboutMe" placeholder="Please metion about yourself" value={formData?.aboutMe} onChange={changeHandler}></textarea>
                    </div>

                    <button className="btn primary">Save & Update</button>
                </form>
            </div>
        </section>
    )
}

export default Profile