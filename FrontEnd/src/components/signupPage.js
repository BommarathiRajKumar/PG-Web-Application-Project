import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import signupPageCss from "../css/signupPage.module.css";
import ServerError from "../components/serverErrorPage";
import ConnectionRefuse from "../components/connectionRefusePage";

const Signup = () => {
    const navigate = useNavigate();
    const [showFormError, setShowFormError] = useState(false);
    const [formError, setFormError] = useState(false);
    const [serverErr, setServerErr] = useState(false);
    const [connectionErr, setConnectionErr] = useState(false);
    var [otpReq, setOtpReq] = useState(false);
    const [ownerImage, setOwnerImage]= useState('')

    const ownerImageSetHandler = (e) => {
        setOwnerImage(e.target.files[0])
    }

    var [userDetails,setUserDetails] = useState({
        mobileNumber: "",
        ownerName: "",
        password: "",
        confirmPassword: "",
        otp: ""
    });
    //objectDestructuring
    const {mobileNumber, ownerName, password, confirmPassword, otp}  = userDetails

    //by this Handler we are updating the userDeatils varables with particular user inputs.
    const userDetailsUpdateHandler = e => {
        setUserDetails({...userDetails,[e.target.name]:e.target.value})
        
    }

    //by this Handler we are submiting the updated details to backend and at same time we are doing form validation giving error mesg to particular error input giving by user.
    const userDeatilsSubmitAndOtpGenHandler = e => {
        e.preventDefault();
        if(ownerImage === ""){
            setShowFormError(true)
            setFormError("Please provide the owner image.")
        }else if( ownerName === ""){
            setShowFormError(true)
            setFormError("Please provide the owner Name.")
        }else if( mobileNumber.length > 10 || mobileNumber.length < 10 || isNaN(mobileNumber)){
            setShowFormError(true)
            setFormError("Invalid mobile number enter only 10-digits.")
        }else if(password.length < 8){
            setShowFormError(true)
            setFormError("Invalid password Note: password should be more than 8 characters.")
        }else if(password !== confirmPassword){
            setShowFormError(true)
            setFormError("password and confirm password didnt matched.")
        }else{
            setShowFormError(false)
            
            axios.post("http://localhost:9090/BackEnd/signup?state=validateMobile&mobileNumber="+userDetails.mobileNumber).then(
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
                            setShowFormError(true);
                            setFormError("Provided number already register with us please provide another number.")  
                        }else{
                            setServerErr(true)  
                        }
                    }else{
                        setConnectionErr(true);
                    }
                })
            
        }
    }

    const otpValidateAndSignupHandler = e => {
        e.preventDefault();

        if(userDetails.otp.length!=6){
            setFormError("Invalid Otp");
            setShowFormError(true)
        }else{
            setShowFormError(false)

            
            const formData = new FormData();
            formData.append('state',"validateOtp")
            formData.append('mobileNumber',userDetails.mobileNumber)
            formData.append('password',userDetails.password)
            formData.append('ownerName',userDetails.ownerName)
            formData.append('otp',userDetails.otp)
            formData.append('ownerImage',ownerImage)


            axios.post("http://localhost:9090/BackEnd/signup?", formData).then(
                function(response){
                    if(response){
                        if(response.status === 201){
                            setShowFormError(false);
                            alert("user Created Successfully")
                            navigate('/login');
                        }else if(response.status===204){
                            setServerErr(true);
                        }else{
                            setServerErr(true);
                        }
                    }else{
                        setServerErr(true);
                    }
                }
            ).catch((err) => {
                if(err.response){
                    if(err.response.status === 401){
                        setFormError("Invalid Error");
                        setShowFormError(true);
                    }else if(err.response.status === 500){
                        setServerErr(true);
                    }else{
                        setServerErr(true);
                    }
                }else{
                    setConnectionErr(true);
                }
            })
        }
    }
    return(
        <div className={signupPageCss.mainDiv}>
            <div className={signupPageCss.mainContainer}>

            {serverErr || connectionErr ?
                <div>
                    {serverErr && <ServerError/>}
                    {connectionErr && <ConnectionRefuse />}
                </div>
            :
                <div>
                    {otpReq ?
                        <form onSubmit={otpValidateAndSignupHandler} autoComplete="of">
                            <div>Please Enter the (6-Digit OTP) recevied by<br/>your mobile number.</div><br/>
                            {showFormError ? <div className={signupPageCss.error}>{formError}</div>:null}
                            <input type="text" placeholder="OTP" name="otp" value={otp} onChange={userDetailsUpdateHandler}/><br/><br/>
                            <button className={signupPageCss.buttonValidate}>Validate</button>
                        </form>
                    : 
                        <form onSubmit={userDeatilsSubmitAndOtpGenHandler} autoComplete="of"> 
                            <h1>New User Signup.</h1>
                            <div>{showFormError ? <div className={signupPageCss.error}>{formError}</div>:null}</div>
                    
                            <div>Owner Image</div>
                            <input type='file' name='ownerImage' onChange={ownerImageSetHandler}/><br/><br/>
                            <div>Owner Name</div>
                            <input type="text" className={signupPageCss.input} name="ownerName" value={ownerName} onChange={userDetailsUpdateHandler}/><br/><br/>
                            <div>MobileNumber</div>
                            <input type="text" className={signupPageCss.input} name="mobileNumber" value={mobileNumber} onChange={userDetailsUpdateHandler}/><br/><br/>
                            <div>Password</div>
                            <input type="password" className={signupPageCss.input} name="password" value={password} onChange={userDetailsUpdateHandler}/><br/><br/>
                            <div>ConfirmPassword</div>
                            <input type="password" className={signupPageCss.input} name="confirmPassword" value={confirmPassword} onChange={userDetailsUpdateHandler}/><br/><br/>
                            <br/>
                            <button>Submit</button>     
                        </form>
                    }
                </div>
            }

        </div>
        </div>
    )
}


export default Signup; 