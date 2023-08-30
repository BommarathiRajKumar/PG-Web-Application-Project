import {useEffect, useState} from 'react';
import profilePageCss from '../css/profilePage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DisplayHostelsPage from './displayHostelsPage.js';
import { Oval } from 'react-loader-spinner';
import ServerError from './serverErrorPage';
import ConnectionRefuse from './connectionRefusePage'

const Profile = ()=>{
    const navigate= useNavigate();
    const[oneShareApplicable, setOneShareApplicable] = useState(false);
    const[twoShareApplicable, setTwoShareApplicable] = useState(false);
    const[threeShareApplicable, setThreeShareApplicable] = useState(false);
    const[fourShareApplicable, setFourShareApplicable] = useState(false);
    const[fiveShareApplicable, setFiveShareApplicable] = useState(false);
    const [loading, setLoading] = useState();
    const[hostelSubmitLoading, setHostelSubmitLoading]=useState();
    const [serverErr, setServerErr] = useState(false);
    const [connectionRefuseErr, setConnectionRefuseErr] = useState(false);
    const [addHostelControl, setAddHostelControl] = useState(true)
    const[mob,setMob] = useState(localStorage.getItem('mobile'))
    const[pass,setPass] = useState(localStorage.getItem('password'))
    const [userData,setUserData] = useState();
    const [totalHostelsCount, setTotalHostelsCount] = useState()
    const [formErr, setFormErr]=useState(false)
    const[err,setErr]=useState();
    

    const [hostelDetails, setHostelDetails] = useState({
        state:"uploadHostel",
        mobileNumber: "",
        ownerName: "",
        hostelName: "",
        hostelType:"",
        oneShareApplicable:"Yes",
        oneShareCost: "",
        oneShareRoomsAvailable: "",
        twoShareApplicable:"Yes",
        twoShareCost: "",
        twoShareRoomsAvailable: "",
        threeShareApplicable:"Yes",
        threeShareCost: "",
        threeShareRoomsAvailable: "",
        fourShareApplicable:"Yes",
        fourShareCost: "",
        fourShareRoomsAvailable: "",
        fiveShareApplicable: "Yes",
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
        }else{
            setHostelDetails({...hostelDetails,[e.target.name]:e.target.value})
        }   
    }
    
        
    

    const sendHostelDeatils = async (e) => {
        e.preventDefault();
        let updatedValues={};
        
        if(!oneShareApplicable){
            updatedValues.oneShareApplicable="No";
            updatedValues.oneShareCost="Not-Applicable";
            updatedValues.oneShareRoomsAvailable="Not-Applicable";
        }
        if(!twoShareApplicable){
            updatedValues.twoShareApplicable="No";
            updatedValues.twoShareCost="Not-Applicable";
            updatedValues.twoShareRoomsAvailable="Not-Applicable";
        }
        if(!threeShareApplicable){
            updatedValues.threeShareApplicable="No";
            updatedValues.threeShareCost="Not-Applicable";
            updatedValues.threeShareRoomsAvailable="Not-Applicable";
        }
        if(!fourShareApplicable){
            updatedValues.fourShareApplicable="No";
            updatedValues.fourShareCost="Not-Applicable";
            updatedValues.fourShareRoomsAvailable="Not-Applicable";
        }
        if(!fiveShareApplicable){
            updatedValues.fiveShareApplicable="No";
            updatedValues.fiveShareCost="Not-Applicable";
            updatedValues.fiveShareRoomsAvailable="Not-Applicable";
        }
        let updatedHostelDetails ={
            ...hostelDetails,
            ...updatedValues
        }

    
        if(updatedHostelDetails.hostelName.trim()===""){
            setFormErr(true);
            setErr("please enter 'Hostel Name'.")

        }else if (oneShareApplicable && updatedHostelDetails.oneShareCost.trim()==="") {
            setFormErr(true);
            setErr("1-Share room Rs/month cannot be empty.");
        } else if (oneShareApplicable && isNaN(updatedHostelDetails.oneShareCost)) {
            setFormErr(true);
            setErr("Invalid input at 1-Share room Rs/month.");
        }else if(oneShareApplicable && updatedHostelDetails.oneShareRoomsAvailable===""){
            setFormErr(true);
            setErr("please select 1-share room's availability 'Yes' or 'No'.")

        }else if(twoShareApplicable && updatedHostelDetails.twoShareCost.trim()===""){
            setFormErr(true);
            setErr("2-Share room Rs/month cannot be empty.");
        }else if (twoShareApplicable && isNaN(updatedHostelDetails.twoShareCost)) {
            setFormErr(true);
            setErr("Invalid input at 2-Share room Rs/month.");
        }else if(twoShareApplicable && updatedHostelDetails.twoShareRoomsAvailable===""){
            setFormErr(true);
            setErr("please select 2-share room's availability 'Yes' or 'No'.")

        }else if(threeShareApplicable && updatedHostelDetails.threeShareCost.trim()===""){
            setFormErr(true);
            setErr("3-share room Rs/month cannot be empty.")
        }else if (threeShareApplicable && isNaN(updatedHostelDetails.threeShareCost)) {
            setFormErr(true);
            setErr("Invalid input at '3-Share room Rs/month");
        }else if(threeShareApplicable && updatedHostelDetails.threeShareRoomsAvailable===""){
            setFormErr(true);
            setErr("please select 3-share room's availability 'Yes' or 'No'.")
        }else if(fourShareApplicable && updatedHostelDetails.fourShareCost.trim()===""){
            setFormErr(true);
            setErr("4-share room Rs/month cannot be empty.")
        }else if (fourShareApplicable && isNaN(updatedHostelDetails.fourShareCost)) {
            setFormErr(true);
            setErr("Invalid input at '4-Share room Rs/month");
        }else if(fourShareApplicable && updatedHostelDetails.fourShareRoomsAvailable===""){
            setFormErr(true);
            setErr("please select 4-share room's availability 'Yes' or 'No'.")
        }else if(fiveShareApplicable && updatedHostelDetails.fiveShareCost.trim()===""){
            setFormErr(true);
            setErr("5-share room Rs/month cannot be empty.")
        }else if (fiveShareApplicable && isNaN(updatedHostelDetails.fiveShareCost)) {
            setFormErr(true);
            setErr("Invalid input at '5-Share room Rs/month");
        }else if(fiveShareApplicable && updatedHostelDetails.fiveShareApplicable===""){
            setFormErr(true);
            setErr("please select 5-share room's availability 'Yes' or 'No'.")
        }else if(updatedHostelDetails.imageOne===""){
            setFormErr(true);
            setErr("please choose 'hostel room Image One'.")
        }else if(updatedHostelDetails.imageTwo===""){
            setFormErr(true);
            setErr("please choose 'hostel room Image Two'.")
        }else if(updatedHostelDetails.imageThree===""){
            setFormErr(true);
            setErr("please choose 'hostel room Image Three'.")
        }else if(updatedHostelDetails.stateName.trim()===""){
            setFormErr(true);
            setErr("please enter 'State Name'.")
        }else if(updatedHostelDetails.cityName.trim()===""){
            setFormErr(true);
            setErr("please enter 'City Name'.")
        }else if(updatedHostelDetails.areaName.trim()===""){
            setFormErr(true);
            setErr("please enter 'Area Name'.")
        }else if(updatedHostelDetails.landMark.trim()===""){
            setFormErr(true);
            setErr("please enter 'Land Mark'.")
        }else if(updatedHostelDetails.hostelType===""){
            setFormErr(true);
            setErr("please select Hoste type 'Girls or Boys'.")
        }else if(updatedHostelDetails.wifi===""){
            setFormErr(true);
            setErr("please select Wifi Available 'Yes or No'.")
        }else if(updatedHostelDetails.laundry==""){
            setFormErr(true);
            setErr("please select Laundry Available 'Yes or No'.")
        }else if(updatedHostelDetails.hotWater==""){
            setFormErr(true);
            setErr("please select Hotwater Available 'Yes or No'.")
        }else {
            setFormErr(false);
            setHostelSubmitLoading(true);

            try {
                const response = await axios.post("http://localhost:8080/BackEnd/profile?", updatedHostelDetails, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.status === 200) {
                    alert("Hostel Uploaded successfully.");
                    HandlerToMakeDefaultHostelsDetails();
                    setAddHostelControl(!addHostelControl);
                } else {
                    alert("Internal server error, please refresh the page and try again.");
                }
            } catch (err) {
                if (err.response) {
                    alert("Internal server error, please refresh the page and try again.");
                } else {
                    
                    alert("Service unavailable, please try again after some time.");
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
            oneShareApplicable:"Yes",
            oneShareCost: "",
            oneShareRoomsAvailable: "",
            twoShareApplicable:"Yes",
            twoShareCost: "",
            twoShareRoomsAvailable: "",
            threeShareApplicable:"Yes",
            threeShareCost: "",
            threeShareRoomsAvailable: "",
            fourShareApplicable:"Yes",
            fourShareCost: "",
            fourShareRoomsAvailable: "",
            fiveShareApplicable: "Yes",
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
        setOneShareApplicable(false);
        setTwoShareApplicable(false);
        setThreeShareApplicable(false);
        setFourShareApplicable(false);
        setFiveShareApplicable(false);
    }

    const logOut = () => {
        setUserData('')
        localStorage.removeItem('mobile')
        localStorage.removeItem('password')
        setMob(null)
        setPass(null)
        navigate('/login')
    }

    const HandlerToremoveConfidentialLocalData = () =>{
        localStorage.removeItem('mobile')
        localStorage.removeItem('password')
        setMob(null)
        setPass(null)
    }

    useEffect(()=>{
        setLoading(true);
        setServerErr(false);
        setConnectionRefuseErr(false);

        const formData = new FormData();
        formData.append("state", "profileLoad")
        formData.append("mobile", mob);
        formData.append("password", pass);

        axios.post("http://localhost:8080/BackEnd/profile?", formData).then(
            response => {
                if(response.status===200){
                    setUserData(response.data)
                    setHostelDetails((prevHostelDetails) => ({
                        ...prevHostelDetails,
                        mobileNumber: response.data.profileDetails.mobileNumber,
                        ownerName: response.data.profileDetails.ownerName,
                    }))
                    setTotalHostelsCount(Object.keys(response.data.hostelsDetails).length)
                }else{
                    HandlerToremoveConfidentialLocalData();
                    setServerErr(true)
                    setUserData('')
                }
            }
        ).catch((err)=>{
            if(err.response){
                if(err.response.status===401){
                    logOut();
                }else{
                    HandlerToremoveConfidentialLocalData();
                    setServerErr(true)
                    setUserData('')
                }
            }else{
                HandlerToremoveConfidentialLocalData();
                setConnectionRefuseErr(true);
                setUserData('')
            }
        }).finally(()=>{
            setLoading(false);
        })
    },[])


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
                        <header className={profilePageCss.header}>
                            {userData && 
                                <div style={{width:'100%',height:'100%',display: 'flex', flexDirection: 'column',alignItems: 'center'}}>
                                    <img
                                        className={profilePageCss.profilePhoto}
                                        src={`data:image/jpeg;base64,${userData.profileDetails.ownerImage}`}
                                        alt="profile"
                                    />
                                    <div style={{fontSize:'75%', marginBottom:'1%'}}>{userData.profileDetails.ownerName}</div>
                                    <div style={{fontSize:'75%'}}>{userData.profileDetails.mobileNumber}</div>
                                    <button style={{backgroundColor:'#25D366',fontSize:'75%',width:'40%',height:'13%', marginTop:'1%',marginBottom:'1%'}} onClick={()=>setAddHostelControl(!addHostelControl)}>Add New Hostle?</button>
                                    <button style={{backgroundColor:'#25D366',fontSize:'75%',width:'40%',height:'13%', marginBottom:'2%'}} onClick={logOut}>Log out</button>
                                </div>
                            }
                        </header>
                        <main className={profilePageCss.main}>
                            {addHostelControl ?
                                <div style={{width:'100%',height:'100%'}}>
                                    {loading?
                                        <div className={profilePageCss.loaderContainer}>
                                            <div className={profilePageCss.loader}>
                                                <Oval color="#00BFFF" height={60} width={60} />
                                                <div style={{marginTop:'8%'}}>
                                                    Please wait, Data is loading...
                                                </div>
                                            </div>
                                        </div>
                                    :
                                        <div style={{width:'100%',height:'100%'}}>
                                            {totalHostelsCount>0 ?
                                                <div style={{position:'relative',width:'95%',left:'5%',top:'30px'}}>
                                                    <div>&nbsp;&nbsp;Your Hostels:</div><br/>
                                                    {Object.keys(userData.hostelsDetails).map((key) => (
                                                        <DisplayHostelsPage key={key} data={userData.hostelsDetails[key]}/>
                                                    ))}
                                                </div>
                                            :
                                                <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                                        <div style={{color:'rgba(0, 0, 0, 0.5)',marginBottom:'3%'}}>You didn't added your hostels yet.</div>
                                                        <div style={{color:'rgba(0, 0, 0, 0.5)'}}>Click Above "Add New Hostel?" Button.</div>
                                                    </div>
                                                </div>
                                            }
                                        </div> 
                                    }
                                </div>
                            :
                                <div className={profilePageCss.addNewHostelFormDiv}>
                                    <form className={profilePageCss.addNewHostelForm}>
                                        <div style={{fontSize:'75%',height:'100%',width:'100%',marginLeft:'3%', marginTop:'4%'}}> 
                                            <div>Hostel Name.<label style={{color:'red'}}>*</label></div>
                                            <input type='text' name="hostelName" value={hostelDetails.hostelName} onChange={hostelDetailsUpdateHandler}/><br/><br/>

                                            <div style={{marginBottom:'4%'}}>
                                                <div className={profilePageCss.oneShareDiv}>
                                                    <label>1-Share rooms:</label>
                                                    <input type="checkbox" onClick={()=>{setOneShareApplicable(!oneShareApplicable)}} style={{ width: '5%', height: '5%' }} />
                                                    <label>Applicable</label>
                                                </div>

                                                {oneShareApplicable&&
                                                    <div className={profilePageCss.secShareDiv}>
                                                        <label> &#8377;/month :</label>
                                                        <input style={{width:'15%'}}  type='text' name="oneShareCost" value={hostelDetails.oneShareCost} onChange={hostelDetailsUpdateHandler}/>
                                                        <label style={{marginLeft:'2%'}}>Rooms Available:<label style={{color:'red'}}>*</label></label>
                                                        <label style={{marginLeft:'3%'}}>Yes</label>
                                                        <input type='checkbox' style={{ width: '5%', height: '5%' }} name="oneShareRoomsAvailable" value={"Yes"}  checked={hostelDetails.oneShareRoomsAvailable === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                                        <label style={{marginLeft:'3%'}}>No</label>
                                                        <input type='checkbox' style={{ width: '5%', height: '5%' }} name="oneShareRoomsAvailable" value={"No"} checked={hostelDetails.oneShareRoomsAvailable === "No"} onChange={hostelDetailsUpdateHandler}/>
                                                        
                                                    </div>
                                                }
                                            </div>



                                            <div style={{marginBottom:'4%'}}>
                                                <div className={profilePageCss.oneShareDiv}>
                                                    <label>2-Share rooms:</label>
                                                    <input type="checkbox" onClick={()=>{setTwoShareApplicable(!twoShareApplicable)}} style={{ width: '5%', height: '5%' }}/>
                                                    <label>Applicable</label>
                                                </div>

                                                {twoShareApplicable&&
                                                    <div className={profilePageCss.secShareDiv}>
                                                        <label> &#8377;/month :</label>
                                                        <input style={{width:'15%'}}  type='text' name="twoShareCost" value={hostelDetails.twoShareCost} onChange={hostelDetailsUpdateHandler}/>
                                                        <label style={{marginLeft:'2%'}}>Rooms Available:<label style={{color:'red'}}>*</label></label>
                                                        <label style={{marginLeft:'3%'}}>Yes</label>
                                                        <input type='checkbox' style={{ width: '5%', height: '5%' }} name="twoShareRoomsAvailable" value={"Yes"}  checked={hostelDetails.twoShareRoomsAvailable === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                                        <label style={{marginLeft:'3%'}}>No</label>
                                                        <input type='checkbox' style={{ width: '5%', height: '5%' }} name="twoShareRoomsAvailable" value={"No"} checked={hostelDetails.twoShareRoomsAvailable === "No"} onChange={hostelDetailsUpdateHandler}/>
                                                    </div>
                                                }
                                            </div>

                                            <div style={{marginBottom:'4%'}}>
                                                <div className={profilePageCss.oneShareDiv}>
                                                    <label>3-Share rooms:</label>
                                                    <input type="checkbox" style={{ width: '5%', height: '5%' }} onClick={()=>setThreeShareApplicable(!threeShareApplicable)}/>
                                                    <label>Applicable</label>
                                                </div>
                                            
                                                {threeShareApplicable&&
                                                    <div className={profilePageCss.secShareDiv}>
                                                        <label> &#8377;/month :</label>
                                                        <input style={{width:'15%'}}  type='text' name="threeShareCost" value={hostelDetails.threeShareCost} onChange={hostelDetailsUpdateHandler}/>
                                                        <label style={{marginLeft:'2%'}}>Rooms Available:<label style={{color:'red'}}>*</label></label>
                                                        <label style={{marginLeft:'3%'}}>Yes</label>
                                                        <input type='checkbox' style={{ width: '5%', height: '5%' }} name="threeShareRoomsAvailable" value={"Yes"}  checked={hostelDetails.threeShareRoomsAvailable === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                                        <label style={{marginLeft:'3%'}}>No</label>
                                                        <input type='checkbox' style={{ width: '5%', height: '5%' }} name="threeShareRoomsAvailable" value={"No"} checked={hostelDetails.threeShareRoomsAvailable === "No"} onChange={hostelDetailsUpdateHandler}/>
                                                        
                                                    </div>
                                                }
                                            </div>

                                            <div style={{marginBottom:'4%'}}>
                                                <div className={profilePageCss.oneShareDiv}>
                                                    <label>4-Share rooms:</label>
                                                    <input type="checkbox" style={{ width: '5%', height: '5%' }} onClick={()=>{setFourShareApplicable(!fourShareApplicable)}} />
                                                    <label>Applicable</label>
                                                </div>
                                            
                                                {fourShareApplicable&&
                                                    <div className={profilePageCss.secShareDiv}>
                                                        <label> &#8377;/month :</label>
                                                        <input style={{width:'15%'}}  type='text' name="fourShareCost" value={hostelDetails.fourShareCost} onChange={hostelDetailsUpdateHandler}/>
                                                        <label style={{marginLeft:'2%'}}>Rooms Available:<label style={{color:'red'}}>*</label></label>
                                                        <label style={{marginLeft:'3%'}}>Yes</label>
                                                        <input type='checkbox' style={{ width: '5%', height: '5%' }} name="fourShareRoomsAvailable" value={"Yes"}  checked={hostelDetails.fourShareRoomsAvailable === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                                        <label style={{marginLeft:'3%'}}>No</label>
                                                        <input type='checkbox' style={{ width: '5%', height: '5%' }} name="fourShareRoomsAvailable" value={"No"} checked={hostelDetails.fourShareRoomsAvailable === "No"} onChange={hostelDetailsUpdateHandler}/>
                                                        
                                                    </div>
                                                }
                                            </div>

                                            <div style={{marginBottom:'4%'}}>
                                                <div className={profilePageCss.oneShareDiv}>
                                                    <label>5-Share rooms:</label>
                                                    <input type="checkbox" style={{ width: '5%', height: '5%' }} onClick={()=>{setFiveShareApplicable(!fiveShareApplicable)}} />
                                                    <label>Applicable</label>
                                                </div>

                                                {fiveShareApplicable&&
                                                    <div className={profilePageCss.secShareDiv}>
                                                        <label> &#8377;/month :</label>
                                                        <input style={{width:'15%'}}  type='text' name="fiveShareCost" value={hostelDetails.fiveShareCost} onChange={hostelDetailsUpdateHandler}/>
                                                        <label style={{marginLeft:'2%'}}>Rooms Available:<label style={{color:'red'}}>*</label></label>
                                                        <label style={{marginLeft:'3%'}}>Yes</label>
                                                        <input type='checkbox' style={{ width: '5%', height: '5%' }} name="fiveShareRoomsAvailable" value={"Yes"}  checked={hostelDetails.fiveShareRoomsAvailable === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                                        <label style={{marginLeft:'3%'}}>No</label>
                                                        <input type='checkbox' style={{ width: '5%', height: '5%' }} name="fiveShareRoomsAvailable" value={"No"} checked={hostelDetails.fiveShareRoomsAvailable === "No"} onChange={hostelDetailsUpdateHandler}/>
                                                    </div>
                                                }
                                            </div>

                                            <div style={{marginTop:'5%',marginBottom:'3%'}}>Please upload the sample images of hostel rooms.<label style={{color:'red'}}>*</label></div>
                                            <input type='file' name='imageOne' onChange={hostelDetailsUpdateHandler}/><br/><br/>
                                            <input type='file' name='imageTwo' onChange={hostelDetailsUpdateHandler}/><br/><br/>
                                            <input type='file' name='imageThree' onChange={hostelDetailsUpdateHandler}/><br/><br/>

                                            <div style={{marginTop:'5%',marginBottom:'2%'}}>Hostel Address:</div>
                                            <div>State Name.<label style={{color:'red'}}>*</label></div>
                                            <input style={{marginBottom:'3%'}} type='text' name="stateName" value={hostelDetails.stateName} onChange={hostelDetailsUpdateHandler}/>
                                            <div>City Name.<label style={{color:'red'}}>*</label></div>
                                            <input style={{marginBottom:'3%'}} type='text' name="cityName" value={hostelDetails.cityName} onChange={hostelDetailsUpdateHandler}/>
                                            <div>Area Name.<label style={{color:'red'}}>*</label></div>
                                            <input style={{marginBottom:'3%'}} type='text' name="areaName" value={hostelDetails.areaName} onChange={hostelDetailsUpdateHandler}/>
                                            <div>Land Mark.<label style={{color:'red'}}>*</label></div>
                                            <textarea style={{width: '80%', height: '8%', overflow: 'auto'}} type='text' name="landMark" value={hostelDetails.landMark} onChange={hostelDetailsUpdateHandler}/><br/><br/>
                                                
                                            <div style={{marginTop:'5%'}}>Hostel type.<label style={{color:'red'}}>*</label></div>
                                            <div className={profilePageCss.facilitiesDivs}>
                                                <label>Girls</label>
                                                <input style={{ width: '5%', height: '5%' }} type="checkbox" name="hostelType" value={"Girls Hostel"} checked={hostelDetails.hostelType === 'Girls Hostel'} onChange={hostelDetailsUpdateHandler}/>
                                                <label style={{marginLeft:'3%'}}>Boys</label>
                                                <input style={{ width: '5%', height: '5%' }} type="checkbox" name="hostelType" value={"Boys Hostel"} checked={hostelDetails.hostelType === 'Boys Hostel'} onChange={hostelDetailsUpdateHandler}/>
                                            </div>


                                            <div>wifi Available.<label style={{color:'red'}}>*</label></div>
                                            <div className={profilePageCss.facilitiesDivs}>
                                                <label>Yes</label>
                                                <input style={{ width: '5%', height: '5%' }} type="checkbox" name="wifi" value={"Yes"} checked={hostelDetails.wifi === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                                <label style={{marginLeft:'3%'}}>No</label>
                                                <input style={{ width: '5%', height: '5%' }} type="checkbox" name="wifi" value={"No"} checked={hostelDetails.wifi === "No"} onChange={hostelDetailsUpdateHandler}/>
                                            </div>

                                            <div>laundry Available.<label style={{color:'red'}}>*</label></div>
                                            <div className={profilePageCss.facilitiesDivs}>
                                                <label>Yes</label>
                                                <input style={{ width: '5%', height: '5%' }} type="checkbox" name="laundry" value={"Yes"} checked={hostelDetails.laundry === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                                <label style={{marginLeft:'3%'}}>No</label>
                                                <input style={{ width: '5%', height: '5%' }} type="checkbox" name="laundry" value={"No"} checked={hostelDetails.laundry === "No"} onChange={hostelDetailsUpdateHandler}/>
                                            </div><br/>

                                            <div>HotWater Available.<label style={{color:'red'}}>*</label></div>
                                            <div className={profilePageCss.facilitiesDivs}>
                                                <label>Yes</label>
                                                <input style={{ width: '5%', height: '5%' }} type="checkbox" name="hotWater" value={"Yes"} checked={hostelDetails.hotWater === "Yes"} onChange={hostelDetailsUpdateHandler}/>
                                                <label style={{marginLeft:'3%'}}>No</label>
                                                <input style={{ width: '5%', height: '5%' }} type="checkbox" name="hotWater" value={"No"} checked={hostelDetails.hotWater === "No"} onChange={hostelDetailsUpdateHandler}/>
                                            </div>

                                            
                                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                {formErr&&<label style={{color: 'red',marginBottom:'3%',fontSize:'105%'}}>{err}</label>}
                                            </div> 

                                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                <div style={{width:'50%',marginLeft:'7%'}}>
                                                    <button style={{backgroundColor:'#25D366'}}  onClick={sendHostelDeatils}>Add Hostel</button>
                                                    <button style={{marginTop:'10%',marginBottom:'15%',backgroundColor:'#25D366'}} onClick={()=>setAddHostelControl(!addHostelControl)}>cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>   
                                </div>

                            }
                        </main>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile;
