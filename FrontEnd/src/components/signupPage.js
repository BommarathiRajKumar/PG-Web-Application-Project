import { useState } from "react";
import axios from "axios";
import signupPageCss from "../css/signupPage.module.css";

const Signup = () => {
    var [profileNameErr, setProfileNameErr] = useState();
    var [mobileErr, setMobileErr] = useState();
    var [passwordErr, setPasswordErr] = useState();
    var [passwordMatchErr, setPasswordMatchErr] = useState();
    var [mobileExistErr, setMobileExistErr] = useState();
    var [serverErr, setServerErr] = useState();
    var [otpReq, setOtpReq] = useState(false);
    var [invalidOtpErr, setInvalidOtpErr] = useState();
    var [attempt, setAttempt] = useState();

    var [userDetails,setUserDetails] = useState({
        mobileNumber: "",
        ownerName: "",
        password: "",
        confirmPassword: "",
        otp: ""
    });
    //objectDestructuring
    const {mobileNumber, email, ownerName, password, confirmPassword, otp}  = userDetails

    //by this Handler we are updating the userDeatils varables with particular user inputs.
    const userDetailsUpdateHandler = e => {
        setUserDetails({...userDetails,[e.target.name]:e.target.value})
        
    }

    //by this Handler we are submiting the updated details to backend and at same time we are doing form validation giving error mesg to particular error input giving by user.
    const userDeatilsSubmitAndOtpGenHandler = e => {
        var space = ownerName.match(/\s/g)
        if( ownerName === "" || space !== null){
            e.preventDefault();
            setProfileNameErr(true);
            setMobileErr(false);
            setPasswordErr(false);
            setPasswordMatchErr(false);
        }else if( mobileNumber.length > 10 || mobileNumber.length < 10 || isNaN(mobileNumber)){
            e.preventDefault();
            setProfileNameErr(false);
            setMobileErr(true);
            setPasswordErr(false);
            setPasswordMatchErr(false);
        }else if( email === ""){
            e.preventDefault();
            setProfileNameErr(false);
            setMobileErr(false);
            setPasswordErr(false);
            setPasswordMatchErr(false);
        }else if(password.length < 8 || password.length > 15){
            e.preventDefault();
            setProfileNameErr(false);
            setMobileErr(false);
            setPasswordErr(true);
            setPasswordMatchErr(false);
        }else if(password !== confirmPassword){
            e.preventDefault();
            setProfileNameErr(false);
            setMobileErr(false);
            setPasswordErr(false);
            setPasswordMatchErr(true);
        }else{
            e.preventDefault();
            setProfileNameErr(false);
            setMobileErr(false);
            setPasswordErr(false);
            setPasswordMatchErr(false);
            
            axios.post("http://localhost:8080/PG/otpGen?mobileNumber="+userDetails.mobileNumber).then((response) => {
                if(response.status === 200){
                    setServerErr(false);
                    setMobileExistErr(false);
                    setOtpReq(true);
                    alert("your otp please note it for feature process:-  "+response.data);
                }else{
                    setServerErr(true);
                }
            }).catch((err) => {
                if(err.response.status === 409){
                    setMobileExistErr(true);
                }else{
                    setServerErr(true);
                }
            })
        }
    }

    const otpValidateAndSignupHandler = e => {
        e.preventDefault();
        setInvalidOtpErr(false);
        setServerErr(false);

        axios.get("http://localhost:8080/PG/OtpValidAndSignup?mobileNumber="+userDetails.mobileNumber+"&password="+userDetails.password+"&ownerName="+userDetails.ownerName+"&otp="+userDetails.otp).then((response) =>{
            if(response.status === 200){
                alert("user Created Successfully")
                window.location.replace("http://localhost:3000/login")
            }else{
                setServerErr(true);
            }
        }).catch((err) => {
            if(err.response.status === 409){
                setAttempt("Invalid OTP 2 More attempts left");
                setInvalidOtpErr(true);
            }else if(err.response.status === 401){
                setAttempt("Invalid OTP last attempt");
                setInvalidOtpErr(true);
            }else if(err.response.status === 400){
                setOtpReq(false)
                setUserDetails({...userDetails,['otp']:''})
                alert("sorry we are redirecting to signup page, please check the mobile number and do submit the form again.")
            }else if(err.response.status === 500){
                setServerErr(true);
            }
        })
    }
    return(
        <div>
            {otpReq === false? 
                <form onSubmit={userDeatilsSubmitAndOtpGenHandler}>
                    <h1>New User Signup.</h1>
                    {profileNameErr ? <div className={signupPageCss.error}>Owner Name should not Empty.</div>:null} 
                    {mobileErr ? <div className={signupPageCss.error}>Invalid mobile number please check it.</div>:null}
                    {passwordErr ? <div className={signupPageCss.error}>Password must be (8 to 15 charecters) with <br/> 'A-Z,a-z,@,#,$,%.</div>:null}
                    {passwordMatchErr ?<div className={signupPageCss.error}>password and confirm password not matched.</div>:null}
                    {mobileExistErr ?<div className={signupPageCss.error}>provided mobile number is already exists.<br/>Please provide another mobile Number.</div>:null}
                    {serverErr ?<div className={signupPageCss.error}>Internall Server Error please try again by refreshing the page.</div>:null}
                    <br/>
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
                </form>:
            <form onSubmit={otpValidateAndSignupHandler}>
                <div>Please Enter the (6-Digit OTP) recevied by<br/>your mobile number.</div><br/>
                {invalidOtpErr ?<div className={signupPageCss.error}>{attempt}</div>:null}
                {serverErr ?<div className={signupPageCss.error}>Internall Server Error please try again by refreshing the page.</div>:null}
                <input type="text" placeholder="OTP" name="otp" value={otp} onChange={userDetailsUpdateHandler}/><br/><br/>
                <button className={signupPageCss.buttonValidate}>Validate</button>
            </form>}
        </div>
    )
}


export default Signup; 