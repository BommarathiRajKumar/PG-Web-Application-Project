import axios from "axios";
import forgotPasswordPageCss from "../css/forgotPasswordPage.module.css";
import { useState, useEffect } from "react";
import { apiUrl } from "./url";
import ServerError from "./serverErrorPage";
import ConnectionRefuse from "./connectionRefusePage";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const ForgotPassword=()=>{
    const navigate = useNavigate();

    const[lock,setLock]=useState(false);
    const[showErr,setShowErr]=useState(false);
    const[err,setErr]=useState('');

    const[serverErr,setServerErr]=useState(false);
    const[conErr,setConErr]=useState(false);

    const[otpReqLoading,setOtpReqLoading]=useState(false);
    const[validateLoading,setValidateLoading]=useState(false);



    const[details,setDetails]=useState({
        mobileNumber:'',
        otp:'',
        newPassword:'',
        confirmNewPassword:''
    });
    const{mobileNumber,otp,newPassword,confirmNewPassword}=details;

    const HandlerToUpdateDetails=(e)=>{
        setDetails({...details,[e.target.name]:e.target.value});
    }

    const sendOtpHandler=e=>{
        e.preventDefault();

        if(details.mobileNumber.length!=10 || isNaN(details.mobileNumber)){
            setErr("Invalid Mobile Number");
            setShowErr(true);
        }else{
            setErr('')
            setShowErr(false)
            setServerErr(false)
            setConErr(false)
            setOtpReqLoading(true);
            alert("If provided number have account we will send otp to it.")

            axios.post(apiUrl+"forgotPassword?state=reqOtp",details, {
                headers: {
                    "Content-Type": "application/json", // Set the Content-Type header to JSON
                },
            }).then(
                function (response) {
                    if(response){
                        if(response.status === 201){
                            alert(response.data)   
                        }
                    }
                }
            ).catch((err)=>{
                if(err.response){
                    setServerErr(true)
                }else{
                    setConErr(true)
                }
            }).finally(
                ()=>{
                    setOtpReqLoading(false);
                    setLock(true)
                }
            )
        }

    }

    const validateOtpAndUpdatePassword=(e)=>{
        e.preventDefault();

        if(details.otp.length!==6 || isNaN(details.otp)){
            setErr("Invalid OTP.")
            setShowErr(true);
        }else if(details.newPassword.length<8){
            setErr("new-password should be minimum 8 characters.")
            setShowErr(true)
        }else if(details.newPassword !== details.confirmNewPassword){
            setErr("new-password and confirm new-password not matched.")
            setShowErr(true)
        }else{
            setValidateLoading(true)
            setServerErr(false)
            setConErr(false)
            setErr('')
            setShowErr(false)
        
            axios.post(apiUrl+"forgotPassword?state=validateOtp",details,{
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(
                function (response) {
                    if(response){
                        if(response.status === 201){
                            alert("password changed successfully");
                            navigate('/login');
                        }
                    }
                }
            ).catch((err)=>{
                if(err.response){
                    if(err.response.status===401){
                        setErr("Invalid Otp.");
                        setShowErr(true)
                    }else{
                        setServerErr(true)
                    }
                }else{
                    setConErr(true);
                }
            }).finally(()=>{
                setValidateLoading(false)
                setLock(false)
            })
        }
    }



    return(

        <div className={forgotPasswordPageCss.mainDiv}>
            <div className={forgotPasswordPageCss.mainContainer}>
                {serverErr || conErr ?
                    <div style={{width:'100%',height:'100%'}}>
                        {serverErr ? <ServerError/> : <ConnectionRefuse/>}
                    </div>
                :
                    <form>
                        {showErr&&<div className={forgotPasswordPageCss.error}>{err}</div>}
                        <div>Enter your Mobile Number:</div>
                        
                        <input name="mobileNumber" value={details.mobileNumber} className={forgotPasswordPageCss.mobInput} onChange={HandlerToUpdateDetails}/>
                        <button className={forgotPasswordPageCss.validBut} onClick={sendOtpHandler} disabled={otpReqLoading || lock}>{otpReqLoading?<Oval color="black" height={20} width={20}/> :<span>Req OTP</span>}</button>
                    

                            
                        <div className={forgotPasswordPageCss.div}>Enter OTP:</div>
                        <input name="otp" value={details.otp} className={forgotPasswordPageCss.Input} placeholder="OTP" onChange={HandlerToUpdateDetails}/>

                        <div className={forgotPasswordPageCss.div}>New-Password</div>
                        <input name="newPassword" value={details.newPassword} type="password" className={forgotPasswordPageCss.Input} onChange={HandlerToUpdateDetails}/>

                        
                        <div className={forgotPasswordPageCss.div}>Confirm New-Password</div>
                        <input name="confirmNewPassword" value={details.confirmNewPassword} type="password" className={forgotPasswordPageCss.Input} onChange={HandlerToUpdateDetails}/><br/>

                        <button className={forgotPasswordPageCss.subBut} onClick={validateOtpAndUpdatePassword} disabled={validateLoading || !lock}>{validateLoading?<Oval color="black" height={30} width={30}/> :<span>Submit</span>}</button>
                    </form>
                }
            </div>
        </div>

    )
}

export default ForgotPassword;