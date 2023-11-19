import {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import   {CiImageOn} from "react-icons/ci";

import {apiUrl} from './url.js';

import profilePageCss from '../css/profilePage.module.css';

import DisplayHostelsProfilePage from './displayHostelsProfilePage.js';


import {AiOutlineUser} from "react-icons/ai";
import {AiOutlineMobile} from "react-icons/ai";
import {AiFillBackward} from "react-icons/ai";

import {AiOutlineLogout} from "react-icons/ai";
import {AiOutlineDelete} from "react-icons/ai";
import {AiOutlinePlusCircle} from "react-icons/ai";



import ServerError from './serverErrorPage';
import ConnectionRefuse from './connectionRefusePage';


const Profile = ()=>{

    const navigate= useNavigate();
    
    const[noDataFound, setNoDataFound]=useState(false);

    const[offSet,setOffSet]=useState(0);
    const[count,setCount]=useState();

    const [userData,setUserData] = useState();
    const [totalHostelsDetailsProfilePage, setTotalHostelsDetailsProfilePage] = useState();

    const [addHostelControl, setAddHostelControl] = useState(true)

    const [showFormErr, setShowFormErr]=useState(false)
    const[err,setErr]=useState();

    const [loading, setLoading] = useState();
    
    const[userLoading,setUserLoading]=useState(false);

    const[hostelSubmitLoading, setHostelSubmitLoading]=useState();

    const [serverErr, setServerErr] = useState(false);
    const [connectionRefuseErr, setConnectionRefuseErr] = useState(false);
    const[hostelsRefresh,setHostelsRefresh]=useState(false);
    

    const [hostelDetails, setHostelDetails] = useState({
        state:"uploadHostel",
        mobileNumber: "",
        ownerName: "",
        hostelName: "",
        hostelType:"",
        oneShareApplicable:false,
        oneShareCost: "",
        oneShareRoomsAvailable: "",
        twoShareApplicable:false,
        twoShareCost: "",
        twoShareRoomsAvailable: "",
        threeShareApplicable:false,
        threeShareCost: "",
        threeShareRoomsAvailable: "",
        fourShareApplicable:false,
        fourShareCost: "",
        fourShareRoomsAvailable: "",
        fiveShareApplicable: false,
        fiveShareCost: "",
        fiveShareRoomsAvailable: "",
        wifi:"",
        laundry:"",
        hotWater:"",
        imageOne:"",
        imageTwo:"",
        imageThree:"",
        stateName: "",
        cityName: "",
        areaName: "",
        landMark: ""
    });
    const hostelDetailsUpdateHandler = (e) => {
        if(e.target.name==="imageOne"){
            setHostelDetails({...hostelDetails,[e.target.name]:e.target.files[0]})
        }else if(e.target.name==="imageTwo"){
            setHostelDetails({...hostelDetails,[e.target.name]:e.target.files[0]})
        }else if(e.target.name==="imageThree"){
            setHostelDetails({...hostelDetails,[e.target.name]:e.target.files[0]})
        }else if(e.target.name==="oneShareApplicable"){
            setHostelDetails({...hostelDetails,[e.target.name]:(!hostelDetails.oneShareApplicable)})
        }else if(e.target.name==="twoShareApplicable"){
            setHostelDetails({...hostelDetails,[e.target.name]:(!hostelDetails.twoShareApplicable)})
        }else if(e.target.name==="threeShareApplicable"){
            setHostelDetails({...hostelDetails,[e.target.name]:(!hostelDetails.threeShareApplicable)})
        }else if(e.target.name==="fourShareApplicable"){
            setHostelDetails({...hostelDetails,[e.target.name]:(!hostelDetails.fourShareApplicable)})
        }else if(e.target.name==="fiveShareApplicable"){
            setHostelDetails({...hostelDetails,[e.target.name]:(!hostelDetails.fiveShareApplicable)})
        }else{
            setHostelDetails({...hostelDetails,[e.target.name]:e.target.value})
        }   
    }

    useEffect(()=>{
        if(localStorage.getItem("token") === null) {
            navigate('/')
        }
    },[]);
    
    const logOut = () => {
        setUserData('')
        setTotalHostelsDetailsProfilePage('')
        localStorage.removeItem('token');
        navigate('/login')
    }

    useEffect(()=>{
        setServerErr(false);
        setConnectionRefuseErr(false);

        axios.post(apiUrl+"profile?state=profileLoad", {}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          }).then(
            response => {
                if(response.status===200){
                    setUserData(response.data)
                    setHostelDetails((prevHostelDetails) => ({
                        ...prevHostelDetails,
                        mobileNumber: response.data.mobileNumber,
                        ownerName: response.data.ownerName,
                    }))
                }else{
                    alert("your session expired do login again and login .")
                    logOut();
                }
            }
        ).catch((err)=>{
            if(err.response){
                if(err.response.status===500){
                    setServerErr(true)
                }else if(err.response.status===400){
                    alert("Bad Request do login again.");
                    logOut();
                }else{
                    alert("your session expired do login again.")
                    logOut();
                }
            }else{
                setConnectionRefuseErr(true);
            }
        })
    },[])


    function added(){
        HandlerToLoadHostels('added');
        setOffSet(0)
    }
    function edited(a){
        setTotalHostelsDetailsProfilePage(prevHostelDetails => {
            const updatedHostelDetails = { ...prevHostelDetails };
            delete updatedHostelDetails[a];
            return updatedHostelDetails;
        })
        axios.post(apiUrl+"profile?state=updatedSucess&id="+a, {}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          }).then(
            res => {
                if (res.status === 200) {    
                    setTotalHostelsDetailsProfilePage(prevHostelDetails => {
                        const updatedHostelDetails = { ...prevHostelDetails };
                        Object.keys(res.data).forEach(key => {
                        if (!(key in updatedHostelDetails)) {
                            updatedHostelDetails[key] = res.data[key];
                        }
                        });
                        return updatedHostelDetails;
                    })
                    setCount(res.data.count)
                    HandlerToSetFirstHeight();
                }else if(res.status ===204){
                    setNoDataFound(true);
                }else{
                    alert("your session expired do login again and login .")
                    logOut();
                }
            }
        ).catch((err)=>{
            if(err.response){
                if(err.response.status===500){
                    setServerErr(true)
                }else if(err.response.status===400){
                    alert("Bad Request do login again.");
                    logOut();
                }else{
                    alert("your session expired do login again.")
                    logOut();
                }
            }else{
                setConnectionRefuseErr(true);
            }
        })

    }
    function deleted(a){
        setTotalHostelsDetailsProfilePage(prevHostelDetails => {
            const updatedHostelDetails = { ...prevHostelDetails };
            delete updatedHostelDetails[a];
            return updatedHostelDetails;
        });
    }
    
    useEffect(() => {
        HandlerToLoadHostels();
    }, []);


    const HandlerToLoadHostels=(event)=>{
        let updated=0;
        if(event==="user"){
            setUserLoading(true)
            updated=offSet+5;
            setOffSet(offSet+5)
           
        }else if(event==="added"){
            setLoading(true);
            setFirstHeight(0);
            updated=0;
        }else{
            setLoading(true);
            updated=0;
        }
        setServerErr(false);
        setConnectionRefuseErr(false);
        setNoDataFound(false)

        console.log("offset:- "+updated)

        axios.post(apiUrl+"profile?state=userHostelsLoad&offSet="+updated, {}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          }).then(
            res => {
                if (res.status === 200) {    
                    setTotalHostelsDetailsProfilePage(prevHostelDetails => {
                        const updatedHostelDetails = { ...prevHostelDetails };
                        Object.keys(res.data).forEach(key => {
                            if (!(key in updatedHostelDetails) && key!="count") {
                                updatedHostelDetails[key] = res.data[key];
                            }
                        });
                        return updatedHostelDetails;
                    })
                    setCount(res.data.count)
                    HandlerToSetFirstHeight();
                }else if(res.status === 204){
                    setNoDataFound(true)  
                }else{
                    alert("your session expired do login again and login .")
                    logOut();
                }
                console.log("count:- "+res.data.count)
            }
        ).catch((err)=>{
            if(err.response){
                if(err.response.status===500){
                    setServerErr(true)
                }else if(err.response.status===400){
                    alert("Bad Request do login again.");
                    logOut();
                }else{
                    alert("your session expired do login again.")
                    logOut();
                }
            }else{
                setConnectionRefuseErr(true);
            }
        }).finally(()=>{
            if(event==="user"){
                setUserLoading(false)
            }else if(event=="added"){
                setLoading(false);
            }else{
                setLoading(false);
            }
        })
    }



    const handlerToUploadNewHostel = async (e) => {
        e.preventDefault();

        let updatedValues={};
        
        if(!hostelDetails.oneShareApplicable){
            updatedValues.oneShareCost="Not-Applicable";
            updatedValues.oneShareRoomsAvailable="Not-Applicable";
        }
        if(!hostelDetails.twoShareApplicable){
            updatedValues.twoShareCost="Not-Applicable";
            updatedValues.twoShareRoomsAvailable="Not-Applicable";
        }
        if(!hostelDetails.threeShareApplicable){
            updatedValues.threeShareCost="Not-Applicable";
            updatedValues.threeShareRoomsAvailable="Not-Applicable";
        }
        if(!hostelDetails.fourShareApplicable){
            updatedValues.fourShareCost="Not-Applicable";
            updatedValues.fourShareRoomsAvailable="Not-Applicable";
        }
        if(!hostelDetails.fiveShareApplicable){
            updatedValues.fiveShareCost="Not-Applicable";
            updatedValues.fiveShareRoomsAvailable="Not-Applicable";
        }
        let updatedHostelDetails ={
            ...hostelDetails,
            ...updatedValues
        }

        if(updatedHostelDetails.hostelName.trim()===""){
            setShowFormErr(true);
            setErr("please enter 'Hostel Name'.");

        }else if (hostelDetails.oneShareApplicable && updatedHostelDetails.oneShareCost.trim()==="") {
            setShowFormErr(true);
            setErr("1-Share room Rs/month cannot be empty.");
        } else if (hostelDetails.oneShareApplicable && isNaN(updatedHostelDetails.oneShareCost)) {
            setShowFormErr(true);
            setErr("Invalid input at 1-Share room Rs/month.");
        }else if(hostelDetails.oneShareApplicable && updatedHostelDetails.oneShareRoomsAvailable===""){
            setShowFormErr(true);
            setErr("please select 1-share room's availability 'Yes' or 'No'.")

        }else if(hostelDetails.twoShareApplicable && updatedHostelDetails.twoShareCost.trim()===""){
            setShowFormErr(true);
            setErr("2-Share room Rs/month cannot be empty.");
        }else if (hostelDetails.twoShareApplicable && isNaN(updatedHostelDetails.twoShareCost)) {
            setShowFormErr(true);
            setErr("Invalid input at 2-Share room Rs/month.");
        }else if(hostelDetails.twoShareApplicable && updatedHostelDetails.twoShareRoomsAvailable===""){
            setShowFormErr(true);
            setErr("please select 2-share room's availability 'Yes' or 'No'.")

        }else if(hostelDetails.threeShareApplicable && updatedHostelDetails.threeShareCost.trim()===""){
            setShowFormErr(true);
            setErr("3-share room Rs/month cannot be empty.")
        }else if (hostelDetails.threeShareApplicable && isNaN(updatedHostelDetails.threeShareCost)) {
            setShowFormErr(true);
            setErr("Invalid input at '3-Share room Rs/month");
        }else if(hostelDetails.threeShareApplicable && updatedHostelDetails.threeShareRoomsAvailable===""){
            setShowFormErr(true);
            setErr("please select 3-share room's availability 'Yes' or 'No'.")
        }else if(hostelDetails.fourShareApplicable && updatedHostelDetails.fourShareCost.trim()===""){
            setShowFormErr(true);
            setErr("4-share room Rs/month cannot be empty.")
        }else if (hostelDetails.fourShareApplicable && isNaN(updatedHostelDetails.fourShareCost)) {
            setShowFormErr(true);
            setErr("Invalid input at '4-Share room Rs/month");
        }else if(hostelDetails.fourShareApplicable && updatedHostelDetails.fourShareRoomsAvailable===""){
            setShowFormErr(true);
            setErr("please select 4-share room's availability 'Yes' or 'No'.")
        }else if(hostelDetails.fiveShareApplicable && updatedHostelDetails.fiveShareCost.trim()===""){
            setShowFormErr(true);
            setErr("5-share room Rs/month cannot be empty.")
        }else if (hostelDetails.fiveShareApplicable && isNaN(updatedHostelDetails.fiveShareCost)) {
            setShowFormErr(true);
            setErr("Invalid input at '5-Share room Rs/month");
        }else if(hostelDetails.fiveShareApplicable && updatedHostelDetails.fiveShareApplicable===""){
            setShowFormErr(true);
            setErr("please select 5-share room's availability 'Yes' or 'No'.")
        }else if(updatedHostelDetails.imageOne===""){
            setShowFormErr(true);
            setErr("please choose 'hostel room Image One'.")
        }else if(updatedHostelDetails.imageTwo===""){
            setShowFormErr(true);
            setErr("please choose 'hostel room Image Two'.")
        }else if(updatedHostelDetails.imageThree===""){
            setShowFormErr(true);
            setErr("please choose 'hostel room Image Three'.")
        }else if(updatedHostelDetails.stateName.trim()===""){
            setShowFormErr(true);
            setErr("please enter 'State Name'.")
        }else if(updatedHostelDetails.cityName.trim()===""){
            setShowFormErr(true);
            setErr("please enter 'City Name'.")
        }else if(updatedHostelDetails.areaName.trim()===""){
            setShowFormErr(true);
            setErr("please enter 'Area Name'.")
        }else if(updatedHostelDetails.landMark.trim()===""){
            setShowFormErr(true);
            setErr("please enter 'Land Mark'.")
        }else if(updatedHostelDetails.hostelType===""){
            setShowFormErr(true);
            setErr("please select Hoste type 'Girls or Boys'.")
        }else if(updatedHostelDetails.wifi===""){
            setShowFormErr(true);
            setErr("please select Wifi Available 'Yes or No'.")
        }else if(updatedHostelDetails.laundry===""){
            setShowFormErr(true);
            setErr("please select Laundry Available 'Yes or No'.")
        }else if(updatedHostelDetails.hotWater===""){
            setShowFormErr(true);
            setErr("please select Hotwater Available 'Yes or No'.")
        }else {
            setShowFormErr(false);
            setHostelSubmitLoading(true);

            try {
                const response = await axios.post(apiUrl+"profile?", updatedHostelDetails, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    },
                });
                if(response){
                    if (response.status === 200) {
                        alert("Hostel Uploaded successfully.");
                        added();
                        setHostelsRefresh(!hostelsRefresh);
                        HandlerToMakeDefaultHostelsDetails();
                        setAddHostelControl(!addHostelControl);
                    } else {
                        alert("your session expired do login again.")
                        logOut();
                    }
                }else{
                    alert("Internal server error, please refresh the page and try login again.");
                    logOut();
                }
            } catch (err) {
                if(err.response){
                    if(err.response.status===500){
                        setServerErr(true)
                    }else if(err.response.status===400){
                        alert("Bad Request do login again and upload hostel.");
                        logOut();
                    }else{
                        alert("your session expired do login again and upload hostel.")
                        logOut();
                    }
                }else{
                    setConnectionRefuseErr(true);
                }
            } finally {
                setHostelSubmitLoading(false);
                updatedValues = null;
                updatedHostelDetails = null;
            }
        }
        
    };
    const HandlerToMakeDefaultHostelsDetails = ()=>{
        setHostelDetails((prevHostelDetails)=>({
            ...prevHostelDetails,
            hostelName: "",
            hostelType:"",
            oneShareApplicable:false,
            oneShareCost: "",
            oneShareRoomsAvailable: "",
            twoShareApplicable:false,
            twoShareCost: "",
            twoShareRoomsAvailable: "",
            threeShareApplicable:false,
            threeShareCost: "",
            threeShareRoomsAvailable: "",
            fourShareApplicable:false,
            fourShareCost: "",
            fourShareRoomsAvailable: "",
            fiveShareApplicable: false,
            fiveShareCost: "",
            fiveShareRoomsAvailable: "",
            wifi:"",
            laundry:"",
            hotWater:"",
            imageOne:"",
            imageTwo:"",
            imageThree:"",
            stateName: "",
            cityName: "",
            areaName: "",
            landMark: ""
        }));
    }


    const[showProfile,setShowProfile]=useState(false);
    const[deleteLoading,setDeleteLoading]=useState(false);
    const[otpGen,setOtpGen]=useState(false)

    let[otp,setOtp]=useState(null);
    const [showOtpError, setShowOtpError] = useState(false);
    const[submitLoading,setSubmitLoading]=useState(false);

    const HandlerToGenOtpToDeleteAccount=()=>{
        const confirmDelete = window.confirm('Are you sure you want to delete Account?');

        if (confirmDelete) {
            setDeleteLoading(true)
            setDeleteLoading(true)
            axios.post(apiUrl+"profile?state=genOtpToDeleteAccount", {}, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then(
                response => {
                    if(response){
                        if(response.status===201){
                            setOtpGen(true)
                            alert("your otp note this for next process:- "+response.data);
                        }else{
                            alert("your session expired do login again.")
                            logOut();
                        }
                    }else{
                        alert("Internal error please try again by refreshing the page.");
                    }
                }
            ).catch((err)=>{
                if(err.response){
                    if(err.response.status===500){
                        alert("internal server error please try again some time.")
                    }else if(err.response.status===400){
                        alert("Bad Request do login again.");
                        logOut();
                    }else{
                        alert("your session expired do login again.")
                        logOut()
                    }
                }else{
                    alert("Internal error please try again by refreshing the page.");
                }
            }).finally(()=>{
                setDeleteLoading(false);
            })
           
        }
    }

    const HandlerToOtpValidateToDeleteAccount=(action)=>{
            setShowOtpError(false)
            if(action==='cancel'){
                otp='cancel';
                setOtpGen(false);
            }

            if(otp.length!==6 || isNaN(otp) && action==='submit'){
                setShowOtpError(true)
            }else{
                setSubmitLoading(true)
                setShowOtpError(false)


                axios.post(apiUrl+"profile?state=otpValidateToDeleteAccount&otp="+otp, {},{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    }
                }).then(
                    function(response){
                        if(response){
                            if(response.status === 200){
                                if(response.data==="Deleted"){
                                    alert("Account deleted Sucessfully");
                                    localStorage.removeItem("token")
                                    navigate('/signup');
                                }else{
                                    setOtpGen(false);
                                }
                            }else if(response.status===204){
                                alert("server error try after some time.")
                            }else{
                                alert("server error try after some time.")
                            }
                        }else{
                            alert("server error try after some time.")
                        }
                    }
                ).catch((err) => {
                    if(err.response){
                        if(err.response.status === 401){
                            setShowOtpError(true);
                        }else{
                            alert("Server error try ater some time")
                        }
                    }else{
                        alert("connection error try after some time.");
                    }
                }).finally(
                    ()=>{
                        setSubmitLoading(false)
                    }
                )
            }
        
    }


    const containerRef = useRef(null);
    const[firstHeight, setFirstHeight]=useState(0);

    const HandlerToSetFirstHeight=()=>{
        if (containerRef.current) {
            const container = document.getElementById('your-container-id');
            setFirstHeight(container.scrollHeight);
        }
    }

    useEffect(() => {
        if (containerRef.current) {
          const container = document.getElementById('your-container-id');
          const scrollPosition = firstHeight;
          
          container.scrollTo({
            top: scrollPosition,
            behavior: 'smooth',
          });
        }
    }, [firstHeight]);

    const [reachedBottom, setReachedBottom] = useState(false);
    const handleScroll = () => {
        const container = containerRef.current;
        if (container.scrollTop + container.clientHeight+10 >= container.scrollHeight && count>0) {
            if (!reachedBottom  ) {
                HandlerToLoadHostels('user');
                setReachedBottom(true);
            }
        }else {
            setReachedBottom(false);
        }
    };

    function profile(){
        setShowProfile(false)
    }

    return(
 
        <div className={profilePageCss.mainDiv}>
            <div className={profilePageCss.mainContainer}>
                {serverErr || connectionRefuseErr ?
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
                        {serverErr && <ServerError/>}
                        {connectionRefuseErr && <ConnectionRefuse/>}
                    </div>
                
                :
                    <div style={{width:'100%',height:'100%'}}>
                    {addHostelControl ?
                        <div style={{width:'100%',height:'100%'}}>  
                            <main style={{height:'94%',width:'100%'}}>
                                {userData && showProfile&& 
                                    <header className={profilePageCss.headerDiv}>
                                        <AiFillBackward size={25} style={{cursor:'pointer',position:'absolute',top:'10px',right:'10px'}} onClick={()=>{setShowProfile(!showProfile)}}/>
                                        <img
                                            className={profilePageCss.profilePhoto}
                                            src={`data:image/jpeg;base64,${userData.ownerImage}`}
                                            alt="profile"
                                        />
                                        <div style={{fontSize:'120%',marginBottom:'5px'}}>{userData.ownerName}</div>
                                        <div style={{fontSize:'120%'}}><span><AiOutlineMobile/>{userData.mobileNumber}</span></div>
                                        <button style={{marginTop:'25px',marginBottom:'16px'}} className={profilePageCss.headerButtons} onClick={()=>{setAddHostelControl(!addHostelControl);setShowFormErr(false)}}><label style={{display:'flex',justifyContent:'center',alignItems:'center'}}><AiOutlinePlusCircle/>&nbsp;Add Hostle</label></button>
                                        <button className={profilePageCss.headerButtons} onClick={logOut}><AiOutlineLogout/>&nbsp;Log Out</button>

                                        {!otpGen?
                                            <button style={{backgroundColor:'#ef5350',marginTop:'30px'}}className={profilePageCss.headerButtons} onClick={HandlerToGenOtpToDeleteAccount} disabled={deleteLoading}>{deleteLoading?<Oval color={"black"} width={20} height={20}/>:<span style={{display:'flex',justifyContent:'center',alignItems:'center'}}><AiOutlineDelete /><label style={{cursor:'pointer',marginLeft:'6px'}}>Account</label></span>}</button>
                                            
                                        :
                                            <div style={{height:'100px',marginTop:'50px',textAlign:'center'}}>
                                                <label>Enter 6-Digit OTP:</label>
                                                {showOtpError && <div style={{color:'#9b122d'}}>Invalid Otp.</div>}
                                                <input onChange={(e)=>{setOtp(e.target.value)}} placeholder='OTP' style={{width:'68%',height:'25px', borderRadius:'8px',border:'1px solid black',backgroundColor:'rgb(177, 216, 216)',textAlign:'center',marginTop:'10px',marginBottom:'10px'}}/>
                                                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                    <button style={{ width: '60px' }} className={profilePageCss.headerButtons} onClick={()=>{HandlerToOtpValidateToDeleteAccount('cancel')}}>Cancel</button>
                                                    <button style={{width:'60px',backgroundColor:'#ef5350',marginLeft:'12px'}} onClick={()=>{HandlerToOtpValidateToDeleteAccount('submit')}} className={profilePageCss.headerButtons} disabled={submitLoading}>{submitLoading?<label style={{display:'flex',justifyContent:'center'}}><Oval width={16} height={16} color='black'/></label>:"Submit"}</button>
                                                </div>
                                            </div>
                                        }
                                    </header>
                                }
                                {loading && !userLoading ?
                                    <div style={{width:'100%',height:'125%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                        <Oval color="#00BFFF" height={60} width={60} />
                                        <div style={{marginTop:'8%'}}>
                                            Please wait, Data is loading...
                                        </div>
                                    </div>
                                :
                                <div style={{width:'100%',height:'100%'}}>

                                {noDataFound?
                                    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                        <div style={{color:'rgba(0, 0, 0, 0.5)',marginBottom:'3%'}}>You didn't added your hostels yet.</div>
                                        <div style={{color:'rgba(0, 0, 0, 0.5)'}}><label style={{color:'blue',cursor:'pointer',fontWeight:'bolder'}} onClick={()=>{setAddHostelControl(!addHostelControl)}}>'Click Here'</label> to Add hostel</div>
                                    </div>
                                :
                                    <div id="your-container-id" ref={containerRef} onScroll={()=>{count===1 && handleScroll()}} style={{scrollBehavior: 'smooth',backgroundColor: ' #E2D1F9',width:'100%',height:'100%',overflow:'auto',display:'flex', justifyContent:'center',alignItems:'center'}} className={profilePageCss.hostelsContainer}>
                                       {totalHostelsDetailsProfilePage&&
                                        <div style={{width:'88%', height:'100%'}}>
                                            <div style={{marginTop:'10%',marginBottom:'10%'}}>Hostels:</div>
                                            {Object.keys(totalHostelsDetailsProfilePage).map(key => (
                                                <DisplayHostelsProfilePage
                                                    edited={edited}
                                                    deleted={deleted}
                                                    profile={profile}
                                                    style={{ marginBottom: '40px' }}
                                                    key={key}
                                                    data={totalHostelsDetailsProfilePage[key]}
                                                />
                                                )).reverse()
                                            }
                                            <div  style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                {count===1?<Oval color="black" width={33} height={33}/>:<label>Results End</label>}
                                            </div>
                                            <br/> 
                                        </div>
                                        }
                                    </div>
                                }
                            </div>
                                }
                            </main>
                                <footer>
                                    <div className={profilePageCss.profilePicContainer} onClick={()=>{setShowProfile(!showProfile)}}>
                                        <AiOutlineUser size={15} onClick={()=>{setShowProfile(!showProfile)}}/>
                                    </div>
                                </footer>
                            
                        </div>
                    :
                        <div className={profilePageCss.addNewHostelFormDiv}>
                            <form className={profilePageCss.addNewHostelForm}>
                                <div style={{fontSize:'75%',height:'100%',width:'100%',marginLeft:'3%', marginTop:'4%'}}> 
                                    <div>Hostel Name.<label style={{color:'red'}}>*</label></div>
                                    <input className={profilePageCss.input} type='text' name="hostelName" value={hostelDetails.hostelName} onChange={hostelDetailsUpdateHandler}/>

                                    <div style={{marginBottom:'15px' ,marginTop:'30px'}}>
                                        <div className={profilePageCss.oneShareDiv}>
                                            <label>1-Share rooms:</label>
                                            <input type="checkbox" name="oneShareApplicable" onClick={hostelDetailsUpdateHandler} checked={hostelDetails.oneShareApplicable===true}  style={{ width: '5%', height: '5%',cursor:'pointer'}} />
                                            <label>Applicable</label>
                                        </div>

                                        {hostelDetails.oneShareApplicable&&
                                            <div className={profilePageCss.secShareDiv}>
                                                <label> &#8377;/month :
                                                    <input style={{height:'25px',width:'20%',textAlign:'center',borderRadius:'8px',border:'1px solid black', backgroundColor:'rgb(177, 216, 216)'}} placeholder='RS.'  type='text' name="oneShareCost" value={hostelDetails.oneShareCost} onChange={hostelDetailsUpdateHandler}/>
                                                </label>

                                                <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                                    <label >Rooms Available:<label style={{color:'red'}}>*</label></label>
                                                    
                                                    <input type='checkbox' style={{marginLeft:'6px', height:'14px', width: '14px' ,cursor:'pointer'}} name="oneShareRoomsAvailable" value={"Yes"}  checked={hostelDetails.oneShareRoomsAvailable === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                                    Yes
                                                    
                                                    <input type='checkbox' style={{marginLeft:'10px',  height:'14px', width: '14px',cursor:'pointer' }} name="oneShareRoomsAvailable" value={"No"} checked={hostelDetails.oneShareRoomsAvailable === "No"} onChange={hostelDetailsUpdateHandler}/>
                                                    No
                                                </div>
                                            </div>
                                        }
                                    </div>



                                    <div style={{marginBottom:'4%'}}>
                                        <div className={profilePageCss.oneShareDiv}>
                                            <label>2-Share rooms:</label>
                                            <input type="checkbox" name="twoShareApplicable" onClick={hostelDetailsUpdateHandler} checked={hostelDetails.twoShareApplicable===true} style={{ width: '5%', height: '5%' ,cursor:'pointer'}}/>
                                            <label>Applicable</label>
                                        </div>

                                        {hostelDetails.twoShareApplicable&&
                                            <div className={profilePageCss.secShareDiv}>
                                                <label> &#8377;/month :
                                                    <input style={{height:'25px',width:'20%',textAlign:'center',borderRadius:'8px',border:'1px solid black', backgroundColor:'rgb(177, 216, 216)'}} placeholder='RS.'  type='text' name="twoShareCost" value={hostelDetails.twoShareCost} onChange={hostelDetailsUpdateHandler}/>
                                                </label>
                                                
                                                <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                                    <label>Rooms Available:<label style={{color:'red'}}>*</label></label>
                                                    <input type='checkbox' style={{marginLeft:'6px', height:'14px', width: '14px' ,cursor:'pointer'}} name="twoShareRoomsAvailable" value={"Yes"}  checked={hostelDetails.twoShareRoomsAvailable === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                                    Yes
                                                    <input type='checkbox' style={{marginLeft:'10px', height:'14px', width: '14px' ,cursor:'pointer'}} name="twoShareRoomsAvailable" value={"No"} checked={hostelDetails.twoShareRoomsAvailable === "No"} onChange={hostelDetailsUpdateHandler}/>
                                                    No
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    <div style={{marginBottom:'4%'}}>
                                        <div className={profilePageCss.oneShareDiv}>
                                            <label>3-Share rooms:</label>
                                            <input type="checkbox" name="threeShareApplicable" onClick={hostelDetailsUpdateHandler} style={{ width: '5%', height: '5%',cursor:'pointer' }} checked={hostelDetails.threeShareApplicable===true} />
                                            <label>Applicable</label>
                                        </div>
                                    
                                        {hostelDetails.threeShareApplicable&&
                                            <div className={profilePageCss.secShareDiv}>
                                                <label> &#8377;/month :
                                                    <input style={{height:'25px',width:'20%',textAlign:'center',borderRadius:'8px',border:'1px solid black', backgroundColor:'rgb(177, 216, 216)'}} placeholder='RS.'  type='text' name="threeShareCost" value={hostelDetails.threeShareCost} onChange={hostelDetailsUpdateHandler}/>
                                                </label>
                                                <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                                    <label>Rooms Available:<label style={{color:'red'}}>*</label></label>
                                                    <input type='checkbox' style={{marginLeft:'6px', height:'14px', width: '14px' ,cursor:'pointer'}} name="threeShareRoomsAvailable" value={"Yes"}  checked={hostelDetails.threeShareRoomsAvailable === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                                    Yes
                                                    <input type='checkbox' style={{marginLeft:'10px', height:'14px', width: '14px' ,cursor:'pointer'}} name="threeShareRoomsAvailable" value={"No"} checked={hostelDetails.threeShareRoomsAvailable === "No"} onChange={hostelDetailsUpdateHandler}/>
                                                    No
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    <div style={{marginBottom:'4%'}}>
                                        <div className={profilePageCss.oneShareDiv}>
                                            <label>4-Share rooms:</label>
                                            <input type="checkbox" name="fourShareApplicable" onClick={hostelDetailsUpdateHandler} style={{ width: '5%', height: '5%',cursor:'pointer' }} checked={hostelDetails.fourShareApplicable===true}/>
                                            <label>Applicable</label>
                                        </div>
                                    
                                        {hostelDetails.fourShareApplicable&&
                                            <div className={profilePageCss.secShareDiv}>
                                                <label> &#8377;/month :
                                                    <input style={{height:'25px',width:'20%',textAlign:'center',borderRadius:'8px',border:'1px solid black', backgroundColor:'rgb(177, 216, 216)'}} placeholder='RS.'  type='text' name="fourShareCost" value={hostelDetails.fourShareCost} onChange={hostelDetailsUpdateHandler}/>
                                                </label>
                                                <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                                    <label>Rooms Available:<label style={{color:'red'}}>*</label></label>
                                                    <input type='checkbox' style={{marginLeft:'6px', height:'14px', width: '14px' ,cursor:'pointer'}} name="fourShareRoomsAvailable" value={"Yes"}  checked={hostelDetails.fourShareRoomsAvailable === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                                    Yes
                                                    <input type='checkbox' style={{marginLeft:'10px', height:'14px', width: '14px' ,cursor:'pointer'}} name="fourShareRoomsAvailable" value={"No"} checked={hostelDetails.fourShareRoomsAvailable === "No"} onChange={hostelDetailsUpdateHandler}/>
                                                    No
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    <div style={{marginBottom:'4%'}}>
                                        <div className={profilePageCss.oneShareDiv}>
                                            <label>5-Share rooms:</label>
                                            <input type="checkbox" name="fiveShareApplicable" onClick={hostelDetailsUpdateHandler} style={{ width: '5%', height: '5%',cursor:'pointer'}} checked={hostelDetails.fiveShareApplicable===true} />
                                            <label>Applicable</label>
                                        </div>

                                        {hostelDetails.fiveShareApplicable&&
                                            <div className={profilePageCss.secShareDiv}>
                                                <label> &#8377;/month :
                                                    <input style={{height:'25px',width:'20%',textAlign:'center',borderRadius:'8px',border:'1px solid black', backgroundColor:'rgb(177, 216, 216)'}} placeholder='RS.'  type='text' name="fiveShareCost" value={hostelDetails.fiveShareCost} onChange={hostelDetailsUpdateHandler}/>
                                                </label>
                                                <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                                    <label>Rooms Available:<label style={{color:'red'}}>*</label></label>
                                                    <input type='checkbox' style={{marginLeft:'6px', height:'14px', width: '14px' ,cursor:'pointer'}} name="fiveShareRoomsAvailable" value={"Yes"}  checked={hostelDetails.fiveShareRoomsAvailable === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                                    Yes
                                                    <input type='checkbox' style={{marginLeft:'10px', height:'14px', width: '14px' ,cursor:'pointer'}} name="fiveShareRoomsAvailable" value={"No"} checked={hostelDetails.fiveShareRoomsAvailable === "No"} onChange={hostelDetailsUpdateHandler}/>
                                                    No
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    <div style={{marginTop:'30px',marginBottom:'5px'}}>Upload any 3 Rooms Images.<label style={{color:'red'}}>*</label></div>

                                    <input  id="imageOne" name='imageOne' type='file' style={{display:'none'}}   accept="image/*" onChange={hostelDetailsUpdateHandler}/>
                                    <label for="imageOne"  className={profilePageCss.label}><CiImageOn/>&nbsp;&nbsp;&nbsp;{hostelDetails.imageOne.name || "Choose Image One"}</label><br/>

                                    
                                    <input  id="imageTwo" name='imageTwo' type='file' style={{display:'none'}}  accept="image/*" onChange={hostelDetailsUpdateHandler}/>
                                    <label for="imageTwo"  className={profilePageCss.label}><CiImageOn/>&nbsp;&nbsp;&nbsp;{hostelDetails.imageTwo.name || "Choose Image Two"}</label><br/>

                                    
                                    <input  id="imageThree" name='imageThree' type='file' style={{display:'none'}}  accept="image/*" onChange={hostelDetailsUpdateHandler}/>
                                    <label for="imageThree"  className={profilePageCss.label}><CiImageOn style={{marginLeft:'5px'}}/>&nbsp;&nbsp;&nbsp;{hostelDetails.imageThree.name || "Choose Image Three"}</label><br/>


                                    <div style={{marginTop:'30px',marginBottom:'5px'}}>Hostel Address:</div>
                                    <div>State Name.<label style={{color:'red'}}>*</label></div>
                                    <input className={profilePageCss.input} style={{marginBottom:'3%',width: '50%',}} type='text' name="stateName" value={hostelDetails.stateName} onChange={hostelDetailsUpdateHandler}/>
                                    <div>City Name.<label style={{color:'red'}}>*</label></div>
                                    <input className={profilePageCss.input} style={{marginBottom:'3%',width: '50%'}} type='text' name="cityName" value={hostelDetails.cityName} onChange={hostelDetailsUpdateHandler}/>
                                    <div>Area Name.<label style={{color:'red'}}>*</label></div>
                                    <input className={profilePageCss.input} style={{marginBottom:'3%',width: '50%'}} type='text' name="areaName" value={hostelDetails.areaName} onChange={hostelDetailsUpdateHandler}/>
                                    <div>Land Mark.<label style={{color:'red'}}>*</label></div>
                                    <textarea style={{width: '50%', height: '80px', overflow: 'auto',resize: 'none',borderRadius:'8px',backgroundColor:'rgb(177, 216, 216)',border:'1px solid black'}} type='text' name="landMark" value={hostelDetails.landMark} onChange={hostelDetailsUpdateHandler}/><br/><br/>
                                        
                                    <div style={{marginTop:'30px'}}>Hostel type.<label style={{color:'red'}}>*</label></div>
                                    <div className={profilePageCss.facilitiesDivs}>
                                        <input style={{ width: '14px', height: '14px' }} type="checkbox" name="hostelType" value={"Girls Hostel"} checked={hostelDetails.hostelType === 'Girls Hostel'} onChange={hostelDetailsUpdateHandler}/>
                                        Girls
                                        <input style={{marginLeft:'15px', width: '14px', height: '14px' }} type="checkbox" name="hostelType" value={"Boys Hostel"} checked={hostelDetails.hostelType === 'Boys Hostel'} onChange={hostelDetailsUpdateHandler}/>
                                        Boys
                                    </div>


                                    <div>wifi Available.<label style={{color:'red'}}>*</label></div>
                                    <div className={profilePageCss.facilitiesDivs}>
                                        <input style={{ width: '14px', height: '14px' }} type="checkbox" name="wifi" value={"Yes"} checked={hostelDetails.wifi === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                        Yes
                                        <input style={{ marginLeft:'15px',width: '14px', height: '14px' }} type="checkbox" name="wifi" value={"No"} checked={hostelDetails.wifi === "No"} onChange={hostelDetailsUpdateHandler}/>
                                        No
                                    </div>

                                    <div>laundry Available.<label style={{color:'red'}}>*</label></div>
                                    <div className={profilePageCss.facilitiesDivs}>
                                        <input style={{ width: '14px', height: '14px' }} type="checkbox" name="laundry" value={"Yes"} checked={hostelDetails.laundry === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                        Yes
                                        <input style={{ marginLeft:'15px',width: '14px', height: '14px' }} type="checkbox" name="laundry" value={"No"} checked={hostelDetails.laundry === "No"} onChange={hostelDetailsUpdateHandler}/>
                                        No
                                    </div>

                                    <div>HotWater Available.<label style={{color:'red'}}>*</label></div>
                                    <div className={profilePageCss.facilitiesDivs}>
                                        <input style={{ width: '14px', height: '14px' }} type="checkbox" name="hotWater" value={"Yes"} checked={hostelDetails.hotWater === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                        Yes
                                        <input style={{ marginLeft:'15px',width: '14px', height: '14px' }} type="checkbox" name="hotWater" value={"No"} checked={hostelDetails.hotWater === "No"} onChange={hostelDetailsUpdateHandler}/>
                                        No
                                    </div>

                                    
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        {showFormErr&&<label style={{color: 'red',marginBottom:'3%',fontSize:'105%'}}>{err}</label>}
                                    </div> 

                                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                        <button className={profilePageCss.formButtons} onClick={handlerToUploadNewHostel} disabled={hostelSubmitLoading}>{hostelSubmitLoading?<Oval color='black' width={20} height={20}/>:<span style={{height:'100%',display:'flex',justifyContent:'center',justifyItems:'center'}}>Add Hostel</span>}</button>
                                        <button className={profilePageCss.profileCancelButton} style={{marginTop:'15px', marginBottom:'30px'}} onClick={()=>setAddHostelControl(!addHostelControl)}><span style={{height:'100%',display:'flex',justifyContent:'center',justifyItems:'center'}}>Cancel</span></button>
                                    </div>
                                </div>
                            </form>   
                        </div>

                    }
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile;