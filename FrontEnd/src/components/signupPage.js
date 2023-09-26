import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Oval } from 'react-loader-spinner';
import   {CiImageOn} from "react-icons/ci";

import {apiUrl} from './url.js'

import signupPageCss from "../css/signupPage.module.css";

import ServerError from "../components/serverErrorPage";
import ConnectionRefuse from "../components/connectionRefusePage";


const Signup = () => {

    const navigate = useNavigate();

    const[loading,setLoading]=useState()
    const [showSignupError, setShowSignupError] = useState(false);
    const [signupError, setSignupError] = useState(false);

    const [showOtpError, setShowOtpError] = useState(false);

    var [otpReq, setOtpReq] = useState(false);
    
    const [serverErr, setServerErr] = useState(false);
    const [connectionErr, setConnectionErr] = useState(false);

    const [userDetails,setUserDetails] = useState({
        mobileNumber: "",
        ownerName: "",
        ownerImage:"",
        password: "",
        confirmPassword: "",
        otp: ""
    });
    //objectDestructuring
    const {mobileNumber, ownerName, ownerImage, password, confirmPassword, otp}  = userDetails
    //by this Handler we are updating the userDeatils varables with particular user inputs.
    const userDetailsUpdateHandler = (e) => {
        if(e.target.name==="ownerImage") setUserDetails({...userDetails,[e.target.name]:e.target.files[0]});
        else setUserDetails({...userDetails,[e.target.name]:e.target.value});
    }

    //by this Handler we are submiting the updated details to backend and at same time we are doing form validation giving error mesg to particular error input giving by user.
    const userDeatilsSubmitAndOtpGenHandler = e => {
        e.preventDefault();
        if( ownerName === ""){
            setShowSignupError(true)
            setSignupError("Please provide the owner Name.")
        }else if( mobileNumber.length > 10 || mobileNumber.length < 10 || isNaN(mobileNumber)){
            setShowSignupError(true)
            setSignupError("Invalid mobile number enter only 10-digits.")
        }else if(password.length < 8){
            setShowSignupError(true)
            setSignupError("Invalid password Note: password should be more than 8 characters.")
        }else if(password !== confirmPassword){
            setShowSignupError(true)
            setSignupError("password and confirm password didnt matched.")
        }else if(ownerImage === ""){
            setShowSignupError(true)
            setSignupError("Please provide the owner image.")
        }else{
            setShowSignupError(false)
            setLoading(true)
            
            axios.post(apiUrl+"signup?state=validateMobile&mobileNumber="+userDetails.mobileNumber).then(
                (res) => {
                    if(res.status === 201){
                        setOtpReq(true);
                        alert("please note  this otp for next step:-  "+res.data);
                    }else{
                        setServerErr(true);
                    }
                }).catch((err) => {
                    if(err.response){
                        if(err.response.status === 409){
                            setShowSignupError(true);
                            setSignupError("Provided number already register with us please provide another number.")  
                        }else{
                            setServerErr(true)  
                        }
                    }else{
                        setConnectionErr(true);
                    }
                }).finally(()=>{setLoading(false)})
            
        }
    }

    const otpValidateAndSignupHandler = e => {
        e.preventDefault();

        if(userDetails.otp.length!==6){
            setShowOtpError(true)
        }else{
            setLoading(true)
            setShowOtpError(false)

            axios.post(apiUrl+"signup?state=validateOtp", userDetails, {
                headers: {
                    "Content-Type": "multipart/form-data", // Set the Content-Type header to JSON
                },
            }).then(
                function(response){
                    if(response){
                        if(response.status === 201){
                            setShowOtpError(false);
                            alert("user Created Successfully")
                            navigate('/login');
                        }else if(response.status===204){
                            alert(1)
                            setServerErr(true);
                        }else{
                            alert(response.status+ "2")
                            setServerErr(true);
                        }
                    }else{
                        alert(3)
                        setServerErr(true);
                    }
                }
            ).catch((err) => {
                if(err.response){
                    if(err.response.status === 401){
                        setShowOtpError(true);
                    }else if(err.response.status === 500){
                        alert(4)
                        setServerErr(true);
                    }else{
                        alert(5)
                        setServerErr(true);
                    }
                }else{
                    setConnectionErr(true);
                }
            }).finally(()=>{setLoading(false)})
        }
    }

    return(

        <div className={signupPageCss.mainDiv}>
            <div className={signupPageCss.mainContainer}>

                {serverErr || connectionErr ?
                    <div style={{width:'100%',height:'100%'}}>
                        {serverErr ? <ServerError/>:<ConnectionRefuse />}
                    </div>
                :
                    <div>
                        {otpReq ?
                            <form onSubmit={otpValidateAndSignupHandler} autoComplete="of">
                                <div style={{height:'30px',width:'280px'}}>Please Enter the (6-Digit OTP) recevied by your mobile number.</div><br/>
                                {showOtpError && <div className={signupPageCss.error}>Invalid Otp.</div>}
                                <input style={{display:'flex',justifyContent:'center',textAlign:'center',fontSize:'15px'}} type="text" placeholder="OTP" name="otp" value={otp} onChange={userDetailsUpdateHandler}/>
                                <button className={signupPageCss.buttonValidate} disabled={loading}>{loading?<Oval color="black" height={30} width={30}/>:<span>Validate</span>}</button>
                            </form>
                        : 
                            <form onSubmit={userDeatilsSubmitAndOtpGenHandler} autoComplete="of"> 
                                <h1>New User Signup.</h1>
                                {showSignupError && <div className={signupPageCss.error}>{signupError}</div>}
                        
                                <div>Owner Name</div>
                                <input  type="text" name="ownerName" value={ownerName} onChange={userDetailsUpdateHandler}/>

                                <div>MobileNumber</div>
                                <input type="text" name="mobileNumber" value={mobileNumber} onChange={userDetailsUpdateHandler}/>

                                <div>Password</div>
                                <input type="password" name="password" value={password} onChange={userDetailsUpdateHandler}/>

                                <div>ConfirmPassword</div>
                                <input type="password" name="confirmPassword" value={confirmPassword} onChange={userDetailsUpdateHandler}/>

                                <input  id="imgInput" style={{display:'none'}} type='file' accept="image/*" name='ownerImage' onChange={userDetailsUpdateHandler}/>
                                <label for="imgInput"  className={signupPageCss.label}><CiImageOn/>&nbsp;&nbsp;&nbsp;{ownerImage.name || "Choose Owner Photo"}</label>

                                <button className={signupPageCss.submitBut} disabled={loading}>{loading?<Oval color="black" height={30} width={30}/>:<span>Submit</span>}</button>     
                                
                                <button className={signupPageCss.homeBut} onClick={()=>navigate('/')}>Home</button>
                            </form>
                            
                        }
                    </div>
                }
            </div>
        </div>

    )
}


export default Signup; 