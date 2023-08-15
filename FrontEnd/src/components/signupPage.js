import { useState } from "react";
import axios from "axios";
import signupPageCss from "../css/signupPage.module.css";

const Signup = () => {
    var [ownerImageErr, setOwnerImageErr] = useState();
    var [profileNameErr, setProfileNameErr] = useState();
    var [mobileErr, setMobileErr] = useState();
    var [passwordErr, setPasswordErr] = useState();
    var [passwordMatchErr, setPasswordMatchErr] = useState();
    var [mobileExistErr, setMobileExistErr] = useState();
    var [serverErr, setServerErr] = useState();
    var [otpReq, setOtpReq] = useState(false);
    var [invalidOtpErr, setInvalidOtpErr] = useState();
    var [attempt, setAttempt] = useState();
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
        var space = ownerName.match(/\s/g)
        if(ownerImage === ""){
            setOwnerImageErr(true);
            setProfileNameErr(false);
            setMobileErr(false);
            setPasswordErr(false);
            setPasswordMatchErr(false);
        }else if( ownerName === "" || space !== null){
            setOwnerImageErr(false);
            setProfileNameErr(true);
            setMobileErr(false);
            setPasswordErr(false);
            setPasswordMatchErr(false);
        }else if( mobileNumber.length > 10 || mobileNumber.length < 10 || isNaN(mobileNumber)){
            setOwnerImageErr(false);
            setProfileNameErr(false);
            setMobileErr(true);
            setPasswordErr(false);
            setPasswordMatchErr(false);
        }else if(password.length < 8 || password.length > 15){
            setOwnerImageErr(false);
            setProfileNameErr(false);
            setMobileErr(false);
            setPasswordErr(true);
            setPasswordMatchErr(false);
        }else if(password !== confirmPassword){
            setOwnerImageErr(false);
            setProfileNameErr(false);
            setMobileErr(false);
            setPasswordErr(false);
            setPasswordMatchErr(true);
        }else{
            setOwnerImageErr(false);
            setProfileNameErr(false);
            setMobileErr(false);
            setPasswordErr(false);
            setPasswordMatchErr(false);
            
            axios.post("http://localhost:8080/PG/otpGen?mobileNumber="+userDetails.mobileNumber).then((response) => {
                if(response){
                    if(response.status === 200){
                        setServerErr(false);
                        setMobileExistErr(false);
                        setOtpReq(true);
                        alert("your otp please note it for feature process:-  "+response.data);
                    }else{
                        setServerErr(true);
                    }
                }else{
                    setServerErr(true);
                }
            }).catch((err) => {
                if(err.response){
                    if(err.response.status === 409){
                        setMobileExistErr(true);
                    }else{
                        setServerErr(true);
                    }
                }else{
                    setServerErr(true);
                    console.log(err)
                }
            })
        }
    }

    const otpValidateAndSignupHandler = e => {
        e.preventDefault();
        setInvalidOtpErr(false);
        setServerErr(false);

        const formData = new FormData()

        formData.append('mobileNumber',userDetails.mobileNumber)
        formData.append('password',userDetails.password)
        formData.append('ownerName',userDetails.ownerName)
        formData.append('otp',userDetails.otp)
        formData.append('ownerImage',ownerImage)



        axios.post("http://localhost:8080/PG/OtpValidAndSignup", formData).then(
            function(response){
                if(response){
                    if(response.status === 200){
                        alert("user Created Successfully")
                        window.location.replace("http://localhost:3000/login")
                    }else{
                        setServerErr(true);
                    }
                }else{
                    setServerErr(true);
                }
            }
        ).catch((err) => {
            if(err.response){
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
            }else{
                setServerErr(true);
            }
        })
    }
    return(
        <div>
            {otpReq === false? 
                <form onSubmit={userDeatilsSubmitAndOtpGenHandler} autoComplete="of"> 
                    <h1>New User Signup.</h1>
                    {ownerImageErr ? <div className={signupPageCss.error}>Please Choose the owner Image.</div>:null}
                    {profileNameErr ? <div className={signupPageCss.error}>Owner Name should not Empty.</div>:null} 
                    {mobileErr ? <div className={signupPageCss.error}>Invalid mobile number please check it.</div>:null}
                    {passwordErr ? <div className={signupPageCss.error}>Password must be (8 to 15 charecters) with <br/> 'A-Z,a-z,@,#,$,%.</div>:null}
                    {passwordMatchErr ?<div className={signupPageCss.error}>password and confirm password not matched.</div>:null}
                    {mobileExistErr ?<div className={signupPageCss.error}>provided mobile number is already exists.<br/>Please provide another mobile Number.</div>:null}
                    {serverErr ?<div className={signupPageCss.error}>Internall Server Error please try again<br/> by refreshing the page.</div>:null}
                    <br/>
                    
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
                </form>:
            <form onSubmit={otpValidateAndSignupHandler} autoComplete="of">
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